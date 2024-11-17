import { ArrowDown, ArrowsDownUp, ArrowUp, Trash } from 'phosphor-react'
import React, { useEffect } from 'react'
import formatCurrency from '@/util/functions'
import Asset from '@/types/asset'

interface Props {
  assets: Asset[]
  setAssets: (assets: Asset[]) => void
  input: string
  setInput: (input: string) => void
  setFilterType: (filterType: string) => void
  filterType: string
  sortColumn: keyof Asset
  setSortColumn: (sortColumn: keyof Asset) => void
  sortDirection: 'asc' | 'desc'
  setSortDirection: (sortDirection: 'asc' | 'desc') => void
}

export default function Table({
  assets,
  setAssets,
  setInput,
  filterType,
  sortColumn,
  setSortColumn,
  sortDirection,
  setSortDirection,
}: Props) {
  useEffect(() => {
    const savedInput = localStorage.getItem('portfolioInput')
    const savedAssets = localStorage.getItem('portfolioAssets')
    if (savedInput) {
      setInput(savedInput)
    }
    if (savedAssets) {
      setAssets(JSON.parse(savedAssets))
    }
  }, [])

  const removeAsset = (assetToRemove: Asset) => {
    const updatedAssets = assets.filter(
      (asset) => asset.name !== assetToRemove.name,
    )
    setAssets(updatedAssets)
    setInput(
      updatedAssets
        .map((asset) => `${asset.name}/ ${asset.quantity}`)
        .join('; ') + ';',
    )
    localStorage.setItem(
      'portfolioInput',
      updatedAssets
        .map((asset) => `${asset.name}/ ${asset.quantity}`)
        .join('; ') + ';',
    )
  }

  const handleSort = (column: keyof Asset) => {
    const direction =
      sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(direction)
    setSortColumn(column)
  }

  const filteredAssets = assets.filter(
    (asset) =>
      filterType === 'both' ||
      (filterType === 'stocks' && asset.type === 1) ||
      (filterType === 'reit' && asset.type === 2),
  )

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    const aValue = a[sortColumn] || 0
    const bValue = b[sortColumn] || 0
    if (sortColumn === 'profitability') {
      const aProfitability =
        a.currentPrice * a.quantity - a.averagePrice * a.quantity
      const bProfitability =
        b.currentPrice * b.quantity - b.averagePrice * b.quantity
      if (aProfitability < bProfitability)
        return sortDirection === 'asc' ? -1 : 1
      if (aProfitability > bProfitability)
        return sortDirection === 'asc' ? 1 : -1
      return 0
    }
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <table className="min-w-full border border-gray-300 text-sm">
      <thead>
        <tr>
          <th
            className="border-b text-left cursor-pointer"
            onClick={() => handleSort('name')}
          >
            <div className="flex">
              Ticket{' '}
              {sortColumn === 'name' &&
                (sortDirection === 'asc' ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                ))}
              <span className="text-gray-400 ml-1">
                <ArrowsDownUp size={16} />
              </span>
            </div>
          </th>
          <th
            className="hidden sm:table-cell border-b cursor-pointer"
            onClick={() => handleSort('averagePrice')}
          >
            <div className="flex w-full justify-center">
              Preço Médio{' '}
              {sortColumn === 'averagePrice' &&
                (sortDirection === 'asc' ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                ))}
              <span className="text-gray-400 ml-1">
                <ArrowsDownUp size={16} />
              </span>
            </div>
          </th>
          <th
            className="hidden sm:table-cell border-b cursor-pointer"
            onClick={() => handleSort('currentPrice')}
          >
            <div className="flex w-full justify-center">
              Preço Atual{' '}
              {sortColumn === 'currentPrice' &&
                (sortDirection === 'asc' ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                ))}
              <span className="text-gray-400 ml-1">
                <ArrowsDownUp size={16} />
              </span>
            </div>
          </th>
          <th
            className="hidden sm:table-cell border-b cursor-pointer"
            onClick={() => handleSort('quantity')}
          >
            <div className="flex w-full justify-center">
              Quantidade{' '}
              {sortColumn === 'quantity' &&
                (sortDirection === 'asc' ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                ))}
              <span className="text-gray-400 ml-1">
                <ArrowsDownUp size={16} />
              </span>
            </div>
          </th>
          <th
            className="border-b cursor-pointer"
            onClick={() => handleSort('value')}
          >
            <div className="flex w-full justify-center">
              Total Investido{' '}
              {sortColumn === 'value' &&
                (sortDirection === 'asc' ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                ))}
              <span className="text-gray-400 ml-1">
                <ArrowsDownUp size={16} />
              </span>
            </div>
          </th>
          <th
            className="border-b cursor-pointer"
            onClick={() => handleSort('profitability')}
          >
            <div className="flex w-full justify-center">
              Rentabilidade{' '}
              {sortColumn === 'profitability' &&
                (sortDirection === 'asc' ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                ))}
              <span className="text-gray-400 ml-1">
                <ArrowsDownUp size={16} />
              </span>
            </div>
          </th>
          <th
            className="hidden sm:table-cell border-b cursor-pointer"
            onClick={() => handleSort('type')}
          >
            <div className="flex w-full justify-center">
              Tipo{' '}
              {sortColumn === 'type' &&
                (sortDirection === 'asc' ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                ))}
              <span className="text-gray-400 ml-1">
                <ArrowsDownUp size={16} />
              </span>
            </div>
          </th>
          <th className="border-b">Ações</th>
        </tr>
      </thead>
      <tbody>
        {sortedAssets.map((asset) => (
          <tr key={asset.id}>
            <td className="border-b p-1">{asset.name}</td>
            <td className="hidden sm:table-cell border-b text-center p-1">
              {formatCurrency(asset.averagePrice)}
            </td>
            <td className="hidden sm:table-cell border-b text-center p-1">
              {formatCurrency(asset.currentPrice)}
            </td>
            <td className="hidden sm:table-cell border-b text-center p-1">
              {asset.quantity}
            </td>
            <td className="border-b text-center p-1">
              {formatCurrency(asset.value || 0)}
            </td>
            <td className="border-b text-center p-1">
              {formatCurrency(
                asset.currentPrice * asset.quantity -
                  asset.averagePrice * asset.quantity,
              )}
            </td>
            <td className="hidden sm:table-cell border-b text-center p-1">
              {asset.type === 1 ? 'Ação' : 'FII'}
            </td>
            <td className="border-b text-center p-1">
              <button
                onClick={() => removeAsset(asset)}
                className="text-red-500"
              >
                <Trash size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
