import * as React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { withMediaQuery } from '../../utils/media-query'

import Context from '../../context/context'
import CartItem from './cart-item'
import Total from '../common/total'
import { CTA } from '../common/buttons'

const Container = styled.section`
  padding-inline: 3rem;
  padding-block: 3rem;
`

const Title = styled.h1`
  margin-block-end: 5rem;

  font-weight: 700;
  font-size: 2rem;
  text-transform: uppercase;
`

const Hr = styled.hr`
  border-top: 1px solid hsla(0, 0%, 90%, 1);
`

class BareCart extends React.Component {
  static contextType = Context

  handleCheckoutButtonClick = () => {
    const { history } = this.props
    history.push('/checkout')
  }

  render() {
    const { cart } = this.context
    const { isMobile } = this.props

    return (
      <Container>
        {/* <h1>Dummy Cart</h1> */}
        <Title>Cart</Title>
        <Hr />
        {cart.map((product, index) => (
          <React.Fragment key={index}>
            <CartItem product={product} />
            <Hr />
          </React.Fragment>
        ))}
        <Total big />
        {isMobile && (
          <CTA active stretch onClick={this.handleCheckoutButtonClick}>
            Check Out
          </CTA>
        )}
      </Container>
    )
  }
}

const Cart = withRouter(withMediaQuery(BareCart))
export default Cart
