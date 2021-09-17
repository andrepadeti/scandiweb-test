import currencies from './currencies.json'

const currencySymbol = currency => {
  const { symbol } = currencies.find(item => item.cc === currency)
  return symbol
}

export default currencySymbol
