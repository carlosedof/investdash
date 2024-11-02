const formatCurrency = (value: number) => {
  return value
    ? `R$ ${value
        .toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    : `R$ 0,00`
}

export default formatCurrency
