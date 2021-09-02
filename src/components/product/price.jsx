import React from 'react'
import styled from 'styled-components'

import Context from '../../context/context'

const H3 = styled.h3`
  margin-block-start: 2rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
`

const Figure = styled.p`
  margin-block: 2rem;
  font-size: 24px;
  font-weight: 700;
`

class Price extends React.Component {
  static contextType = Context

  priceInSelectedCurrency(prices) {
    const { currency } = this.context
    const { amount } = prices.find(price => price.currency === currency)
    return `${currency} ${amount}`
  }

  render() {
    return (
      <>
        <H3>Price</H3>
        <Figure>{this.priceInSelectedCurrency(this.props.prices)}</Figure>
      </>
    )
  }
}

export default Price