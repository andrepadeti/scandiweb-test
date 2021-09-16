import * as React from 'react'
import styled from 'styled-components'

import Context from '../../context/context'
import currencySymbol from '../utils/currencies'

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block: ${props => (props.big ? '3rem' : 'default')};
`

const H3 = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: ${props => (props.big ? '24px' : '16px')};
`

const Figure = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: ${props => (props.big ? '24px' : '16px')};
`

class Total extends React.Component {
  static contextType = Context

  totalToString = () => {
    const { cart, currency } = this.context
    let total = 0

    cart.forEach(product => {
      // find price in the right currency
      const unitaryPrice = product.prices.find(
        price => price.currency === currency
      )
      const price = unitaryPrice.amount * product.quantity
      total += price
    })

    return `${currencySymbol(currency)} ${total.toFixed(2)}`
  }

  render() {
    const { big } = this.props
    return (
      <TotalContainer big={big}>
        <H3 big={big}>Total</H3>
        <Figure big={big}>{this.totalToString()}</Figure>
      </TotalContainer>
    )
  }
}

export default Total
