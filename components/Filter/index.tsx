'use client'
import React, { useState } from 'react'
import clsx from 'clsx'

type Props = {
  filterType: string
  bySegment: boolean
  setFilterType: (filterType: string) => void
  onChangeBySegment: (bySegment: boolean) => void
}

export default function Filter({
  filterType,
  setFilterType,
  bySegment,
  onChangeBySegment,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center my-4 text-xs space-y-2">
      <div className="flex flex-col items-center justify-center my-4 text-xs space-y-2">
        <h4 className={'font-medium'}>Exibir somente:</h4>
        <div className="flex justify-center space-x-4 text-xs">
          <button
            onClick={() => {
              onChangeBySegment(false)
              setFilterType('both')
            }}
            className={`w-24 p-1 bg-blue-400 text-white rounded font-semibold ${filterType === 'both' ? 'bg-blue-600' : ''}`}
          >
            Todos
          </button>
          <button
            onClick={() => {
              onChangeBySegment(false)
              setFilterType('stocks')
            }}
            className={`w-24 p-1 bg-blue-400 text-white rounded font-semibold ${filterType === 'stocks' ? 'bg-blue-600' : ''}`}
          >
            Ações
          </button>
          <button
            onClick={() => setFilterType('reit')}
            className={`w-24 p-1 bg-blue-400 text-white rounded font-semibold ${filterType === 'reit' ? 'bg-blue-600' : ''}`}
          >
            FIIs
          </button>
          <button
            onClick={() => {
              onChangeBySegment(false)
              setFilterType('bdr')
            }}
            className={`w-24 p-1 bg-blue-400 text-white rounded font-semibold ${filterType === 'bdr' ? 'bg-blue-600' : ''}`}
          >
            BDRs
          </button>
        </div>
      </div>
      {filterType === 'reit' && (
        <div className="flex flex-col items-center justify-center my-4 text-xs space-y-2">
          <h4 className={'font-medium'}>Ver por setor:</h4>
          <Toggle value={bySegment} onChange={onChangeBySegment} />
        </div>
      )}
    </div>
  )
}

type ToggleProps = {
  value: boolean
  onChange?: (value: boolean) => void
}
const Toggle = ({ value, onChange }: ToggleProps) => {
  const [isActive, setIsActive] = useState<boolean>(value)
  return (
    <button
      className={
        'bg-white w-12 h-6 rounded-full relative transition-all duration-300 shadow'
      }
      onClick={() =>
        setIsActive((a) => {
          onChange?.(!a)
          return !a
        })
      }
    >
      <div
        className={clsx('absolute w-1/2 h-full rounded-full top-0', {
          'bg-blue-500 left-0': isActive,
          'bg-blue-300 left-2/4': !isActive,
        })}
        style={{ transition: 'all 0.3s' }}
      />
    </button>
  )
}
