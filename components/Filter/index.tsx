'use client'
import React from 'react'

type Props = {
  filterType: string
  setFilterType: (filterType: string) => void
}

export default function Filter({ filterType, setFilterType }: Props) {
  return (
    <div className="flex flex-col items-center justify-center my-4 text-xs space-y-2">
      <h4 className={'font-medium'}>Exibir somente:</h4>
      <div className="flex justify-center space-x-4 text-xs">
        <button
          onClick={() => setFilterType('both')}
          className={`w-24 p-1 bg-blue-400 text-white rounded font-semibold ${filterType === 'both' ? 'bg-blue-600' : ''}`}
        >
          Ambos
        </button>
        <button
          onClick={() => setFilterType('stocks')}
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
      </div>
    </div>
  )
}
