'use client'
import React, { ComponentType, useEffect, useState } from 'react'

import {
  ComputedDatum,
  MayHaveLabel,
  PieTooltipProps,
  ResponsivePie,
} from '@nivo/pie'
import formatCurrency from '@/pages/util/functions'

interface Asset {
  id: string
  name: string
  value?: number
  type?: number
  quantity: number
  averagePrice: number
}

type ResponsivePieProps = React.ComponentProps<typeof ResponsivePie>

function AssetChart({ data }: { data: Asset[] }) {
  const [ResponsivePie, setResponsivePie] =
    useState<ComponentType<ResponsivePieProps> | null>(null)

  const chartData = data.map((asset: Asset) => ({
    id: asset.name,
    label: asset.name,
    value: asset.value,
  }))

  useEffect(() => {
    const loadChart = async () => {
      const { ResponsivePie: Bar } = await import('@nivo/pie')
      setResponsivePie(() => Bar)
    }

    loadChart()
  }, [])
  if (!ResponsivePie) return <div>Loading...</div>

  return (
    <div className={'w-full h-[400px] sm:h-[800px] bg-gray-100 rounded-lg p-4'}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#333333"
        arcLabel={(datum: ComputedDatum<MayHaveLabel>) =>
          formatCurrency(datum.value)
        }
        tooltip={({ datum }: PieTooltipProps<MayHaveLabel>) => {
          return (
            <div
              style={{
                color: 'black',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              <strong>{datum.label}</strong>: {formatCurrency(datum.value)}
            </div>
          )
        }}
      />
    </div>
  )
}

export default AssetChart
