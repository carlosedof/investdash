'use client'
import React, { ComponentType, useEffect, useMemo, useState } from 'react'

import {
  ComputedDatum,
  MayHaveLabel,
  PieTooltipProps,
  ResponsivePie,
} from '@nivo/pie'
import formatCurrency from '@/util/functions'

interface Asset {
  id: string
  name: string
  value?: number
  type?: number
  quantity: number
  averagePrice: number
  segment?: string
  fiiType?: string
}

type ResponsivePieProps = React.ComponentProps<typeof ResponsivePie>

function AssetChart({
  data,
  bySegment,
  total = 0,
}: {
  data: Asset[]
  bySegment: boolean
  total: number
}) {
  const [ResponsivePie, setResponsivePie] =
    useState<ComponentType<ResponsivePieProps> | null>(null)

  const chartData = data.map((asset: Asset) => ({
    id: asset.name,
    label: asset.name,
    value: asset.value,
    segment: asset.fiiType,
  }))

  const groupedBySegment = useMemo(() => {
    return Object.values(
      chartData.reduce((acc, asset) => {
        if (!acc[asset.segment as keyof typeof acc]) {
          acc[asset.segment as keyof typeof acc] = {
            id: asset.segment,
            label: asset.segment,
            value: 0,
          }
        }
        acc[asset.segment as keyof typeof acc].value += asset.value
        return acc
      }, {} as any) as any[],
    )
  }, [chartData])

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
        data={bySegment ? groupedBySegment : chartData}
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
              <strong>{datum.label}</strong>: {formatCurrency(datum.value)} (
              {((datum.value * 100) / total).toFixed(1)}%)
            </div>
          )
        }}
      />
    </div>
  )
}

export default AssetChart
