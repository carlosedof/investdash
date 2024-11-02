'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AssetChart from '@/pages/components/PieChart'
import Table from '@/pages/components/Table'
import Asset from '@/pages/types/asset'
import Filter from '@/pages/components/Filter'
import { Summary } from '@/pages/components/Summary'
import Link from 'next/link'

export default function Portfolio() {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [sortColumn, setSortColumn] = useState<keyof Asset>('name')
  const [assets, setAssets] = useState<Asset[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [filterType, setFilterType] = useState('both')

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = e.target.value
    setInput(value)
    localStorage.setItem('portfolioInput', value)
  }

  const clearAllAssets = () => {
    setAssets([])
    localStorage.removeItem('portfolioInput')
    localStorage.removeItem('portfolioAssets')
  }

  const fetchAssetPrices = async (assetsData: Asset[]) => {
    setProgress(0)
    const updatedAssets = []
    const totalAssets = assetsData.length

    for (let i = 0; i < totalAssets; i++) {
      const asset = assetsData[i]
      try {
        const response = await axios.get(
          `/api/proxy?url=https://statusinvest.com.br/home/mainsearchquery?q=${asset.name}`,
        )
        const [data] = response.data
        const currentPrice = parseFloat(data.price.replace(',', '.'))
        const value = currentPrice * asset.quantity
        updatedAssets.push({
          id: asset.name,
          name: data.code,
          fullname: data.nameFormated,
          value,
          type: data.type,
          quantity: asset.quantity,
          currentPrice,
          averagePrice: asset.averagePrice,
        })
      } catch (error) {
        console.error(`Erro ao buscar preço para ${asset.name}:`, error)
        updatedAssets.push({
          ...asset,
          id: asset.name,
          value: 0,
          averagePrice: 0,
        })
      }
      setProgress(((i + 1) / totalAssets) * 100)
      setAssets(updatedAssets)
      localStorage.setItem('portfolioAssets', JSON.stringify(updatedAssets))
      await new Promise((resolve) => setTimeout(resolve, 700))
    }

    setLoading(false)
  }

  const parseAssets = () => {
    const assetsData: Asset[] = input
      .split(';')
      .filter(Boolean)
      .map((asset) => {
        const [name, quantity, averagePrice] = asset
          .split('/')
          .map((item) => item.trim())
        return {
          name,
          quantity: parseFloat(quantity),
          averagePrice: parseFloat(averagePrice),
        } as Asset
      })
    setLoading(true)
    fetchAssetPrices(assetsData)
  }

  const filteredAssets = assets.filter(
    (asset) =>
      filterType === 'both' ||
      (filterType === 'stocks' && asset.type === 1) ||
      (filterType === 'reit' && asset.type === 2),
  )

  return (
    <div
      className={`bg-gray-100 mx-auto space-y-6 font-[family-name:var(--font-geist-sans)] p-6 text-gray-800`}
      style={{ width: '90%' }}
    >
      <h1 className={'text-center font-semibold text-lg'}>
        Dashboard de investimentos
      </h1>
      <div className={'flex flex-col'}>
        <span className={'text-center font-medium text-base'}>
          Importe a carteira no formato informado no placeholder e veja
          informações organizadas
        </span>
        <div className={'text-center space-x-2'}>
          <span>Desenvolvido por:</span>
          <Link
            target={'_blank'}
            href={'https://github.com/carlosedof'}
            className={'text-center font-medium text-base underline'}
          >
            Cadu Olivera
          </Link>
        </div>
      </div>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Informe os ativos no formato: 'VIVT3/300/25.10;BBSE3/400/32.15;' - Código/Quantidade/Preço médio"
        className="w-full p-2 border rounded h-32 text-gray-800"
        disabled={loading}
      />
      <span className={'text-center font-medium text-gray-400 text-sm italic'}>
        Nenhum dado é enviado para servidores externos
      </span>
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
      {loading && (
        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {filteredAssets.length > 0 && (
        <>
          <div className={'border-b w-full'} />
          <Summary assets={assets} />
          <div className={'border-b w-full'} />
          <Filter filterType={filterType} setFilterType={setFilterType} />
          <div className={'sm:hidden w-full pt-4 flex justify-center'}>
            <span className={'text-sm text-gray-600 italic'}>
              A visualização do gráfico é melhor em telas maiores
            </span>
          </div>
          <AssetChart data={filteredAssets} />
          <Table
            assets={assets}
            setAssets={setAssets}
            input={input}
            setInput={setInput}
            setFilterType={setFilterType}
            filterType={filterType}
            sortColumn={sortColumn}
            setSortColumn={setSortColumn}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </>
      )}
    </div>
  )
}
