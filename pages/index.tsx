'use client'
import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AssetChart from '@/components/PieChart'
import Table from '@/components/Table'
import Asset from '@/types/asset'
import Filter from '@/components/Filter'
import Summary from '@/components/Summary'
import Header from '@/components/Header'
import ActionButtons from '@/components/ActionButtons'
import { Warning } from 'phosphor-react'

export default function Portfolio() {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [sortColumn, setSortColumn] = useState<keyof Asset>('name')
  const [assets, setAssets] = useState<Asset[]>([])
  const [input, setInput] = useState('')
  const [bySegment, setBySegment] = useState(false)
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

  const totalInvested = useMemo(
    () =>
      assets.reduce(
        (acc, asset) => acc + asset.averagePrice * asset.quantity,
        0,
      ),
    [assets],
  )

  const getStockSegment = useCallback(async (ticker: string) => {
    const hasFundNr = ticker.includes('11')
    if (hasFundNr) {
      const url = `https://investidor10.com.br/api/fii/searchquery/${ticker}/compare/`
      const call = await axios.get(`/api/proxy?url=${url}`)
      const tickerId = call?.data?.[0]?.ticker_id
      const detailUrl = `https://investidor10.com.br/api/fii/comparador/table/${tickerId}`
      const detailCall = await axios.get<string>(`/api/proxy?url=${detailUrl}`)
      const result = (detailCall?.data as any)?.data?.[0]
      if (result) {
        return {
          fiiType: result.type,
          segment: result.segment,
        }
      }
    }
  }, [])

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
        const segment = await getStockSegment(asset.name)
        updatedAssets.push({
          id: asset.name,
          name: data.code,
          fullname: data.nameFormated,
          value,
          type: data.type,
          quantity: asset.quantity,
          currentPrice,
          averagePrice: asset.averagePrice,
          ...segment,
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

  const parseAssets = (inputData?: string) => {
    const _input = inputData || input
    const assetsData: Asset[] = _input
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
      <Header />
      <div className={'flex justify-center'}>
        <button
          className={
            'bg-emerald-400 rounded px-2 text-white my-1.5 font-semibold'
          }
          onClick={() => {
            const exampleInput =
              'BBAS3/ 500/ 23.43;STBP3/ 1000/ 9.40;TRPL4/ 500/ 23.96;ITSA4/ 1115/ 9.43;CSMG3/ 500/ 19.27;'
            setInput(exampleInput)
            parseAssets(exampleInput)
          }}
        >
          Ver exemplo de uso
        </button>
      </div>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Informe os ativos no formato: 'VIVT3/300/25.10;BBSE3/400/32.15;' - Código/Quantidade/Preço médio"
        className="w-full p-2 border rounded h-32 text-gray-800"
        disabled={loading}
      />
      <div className={'flex items-center'}>
        <Warning
          size={24}
          className={'text-yellow-500 inline-block mr-2'}
          weight={'fill'}
        />
        <div className={'flex flex-col items-start'}>
          <span
            className={'text-center font-medium text-gray-500 text-sm italic'}
          >
            Nenhum dado é enviado para servidores externos
          </span>
          <span
            className={'text-center font-medium text-gray-500 text-sm italic'}
          >
            Isto não é uma página de recomendação de investimentos
          </span>
        </div>
      </div>
      <ActionButtons
        clearAllAssets={clearAllAssets}
        loading={loading}
        parseAssets={() => parseAssets()}
      />
      {loading && (
        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className={'border-b w-full'} />
      <Summary assets={assets} />
      <div className={'border-b w-full'} />
      <Filter
        filterType={filterType}
        setFilterType={setFilterType}
        bySegment={bySegment}
        onChangeBySegment={setBySegment}
      />
      {filteredAssets.length > 0 ? (
        <>
          <div className={'sm:hidden w-full pt-4 flex justify-center'}>
            <span className={'text-sm text-gray-600 italic'}>
              A visualização do gráfico é melhor em telas maiores
            </span>
          </div>
          <AssetChart
            data={filteredAssets}
            bySegment={bySegment}
            total={totalInvested}
          />
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
      ) : (
        <div
          className={
            'flex justify-center items-center h-32 text-gray-500 text-lg'
          }
        >
          Nenhum ativo encontrado
        </div>
      )}
    </div>
  )
}
