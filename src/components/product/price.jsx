import * as React from 'react'
import styled from 'styled-components'

import Context from '../../context/context'
import currencySymbol from '../utils/currencies'

const H3 = styled.h3`
  margin-block-start: 2rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
`

const Figure = styled.p`
  margin-block-start: 1rem;
  margin-block-end: 2rem;
  font-size: 24px;
  font-weight: 700;
`

class Price extends React.Component {
  static contextType = Context

  priceInSelectedCurrency(prices) {
    const { currency } = this.context
    const { amount } = prices.find(price => price.currency === currency)
    return `${currencySymbol(currency)} ${amount}`
  }

  render() {
    const { prices } = this.props

    return (
      <>
        <H3>Price</H3>
        <Figure>{this.priceInSelectedCurrency(prices)}</Figure>
      </>
    )
  }
}

export default Price
