'use client'
import React from 'react'
import { ArrowsClockwise, ChartLine, Export, TrashSimple } from 'phosphor-react'

type Props = {
  parseAssets: () => void
  loading: boolean
  clearAllAssets: () => void
  exportAssets: () => void
}

export default function ActionButtons({
  parseAssets,
  loading,
  clearAllAssets,
  exportAssets,
}: Props) {
  return (
    <div
      className={
        'flex space-x-0 sm:space-y-0 space-y-2 sm:space-x-2 sm:flex-row flex-col'
      }
    >
      <button
        onClick={parseAssets}
        className="flex-1 p-1 bg-blue-400 text-white rounded font-semibold"
        disabled={loading}
      >
        <ChartLine size={16} className={'inline-block mr-1'} />
        {loading ? 'Carregando dados...' : 'Consolidar dados'}
      </button>
      <button
        onClick={() => parseAssets()}
        className="flex-1 p-1 bg-amber-400 text-white rounded font-semibold"
        disabled={loading}
      >
        <ArrowsClockwise size={16} className={'inline-block mr-1'} />
        Recarregar
      </button>
      <button
        onClick={() => exportAssets()}
        className="flex-1 p-1 bg-emerald-400 text-white rounded font-semibold"
        disabled={loading}
      >
        <Export size={16} className={'inline-block mr-1'} />
        Exportar
      </button>
      <button
        onClick={clearAllAssets}
        className="flex-1 p-1 bg-red-400 text-white font-semibold rounded"
      >
        <TrashSimple size={16} className={'inline-block mr-1'} />
        Limpar Tudo
      </button>
    </div>
  )
}
