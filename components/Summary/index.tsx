'use client'
import React from 'react'
import formatCurrency from '@/util/functions'
import Asset from '@/types/asset'
import clsx from 'clsx'

interface CardProps {
  label: string
  value: string | number
  color: string
}

const Card = ({ label, value, color }: CardProps) => {
  return (
    <div
      className={
        'shadow border-gray-50 border bg-gray-50 p-3 rounded-lg flex-1 flex flex-col justify-between space-y-2.5'
      }
    >
      <div
        className={clsx(
          'text-white font-semibold text-xs self-start rounded-xl px-3 py-0.5',
          color,
        )}
      >
        {label}
      </div>
      <span className={'font-mono text-xl font-black'}>{value}</span>
    </div>
  )
}

type SummaryProps = {
  assets: Asset[]
}

const Summary: React.FC<SummaryProps> = ({ assets }) => {
  const totalInvested = assets.reduce(
    (acc, asset) => acc + asset.averagePrice * asset.quantity,
    0,
  )

  const totalGain = assets.reduce((acc, asset) => {
    const gain = (asset.value || 0) - asset.averagePrice * asset.quantity
    return acc + gain
  }, 0)

  const gainPercentage = totalInvested ? (totalGain / totalInvested) * 100 : 0

  const totalStocks = assets
    .filter((asset) => asset.type === 1)
    .reduce((acc, asset) => acc + (asset.value || 0), 0)
  const totalFIIs = assets
    .filter((asset) => asset.type === 2)
    .reduce((acc, asset) => acc + (asset.value || 0), 0)

  return (
    <div
      className={
        'flex justify-between space-x-0 space-y-3 sm:space-y-0 sm:space-x-3 sm:flex-row flex-col'
      }
    >
      <Card
        label={'Total Investido'}
        value={formatCurrency(totalInvested)}
        color={'bg-gray-600'}
      />
      <Card
        label={'Total em Ações'}
        value={formatCurrency(totalStocks)}
        color={'bg-orange-600'}
      />
      <Card
        label={'Total em FIIs'}
        value={formatCurrency(totalFIIs)}
        color={'bg-pink-600'}
      />
      <Card
        label={'Rentab. Abs'}
        value={formatCurrency(totalGain)}
        color={'bg-green-600'}
      />
      <Card
        label={'Rentab. %'}
        value={`${gainPercentage.toFixed(2)}%`}
        color={'bg-sky-600'}
      />
    </div>
  )
}

export default Summary
