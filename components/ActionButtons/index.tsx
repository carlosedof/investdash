'use client'
import React from 'react'

type Props = {
  parseAssets: () => void
  loading: boolean
  clearAllAssets: () => void
}

export default function ActionButtons({
  parseAssets,
  loading,
  clearAllAssets,
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
        {loading ? 'Carregando dados...' : 'Consolidar dados'}
      </button>
      <button
        onClick={() => parseAssets()}
        className="flex-1 p-1 bg-amber-400 text-white rounded font-semibold"
        disabled={loading}
      >
        Recarregar
      </button>
      <button
        onClick={clearAllAssets}
        className="flex-1 p-1 bg-red-400 text-white font-semibold rounded"
      >
        Limpar Tudo
      </button>
    </div>
  )
}
