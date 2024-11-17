interface Asset {
  id: string
  name: string
  fullname: string
  value?: number
  type?: number
  quantity: number
  averagePrice: number
  currentPrice: number
  gain?: number
  profitability?: number
}

export default Asset
