import * as React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

import Context from '../../context/context'
import CartItem from './cart-item'
import Total from '../common/total'

import { dummyCart } from '../utils/dummy-cart'

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

class CartWithoutRouter extends React.Component {
  static contextType = Context

  render() {
    // const { cart } = this.context
    const cart = dummyCart

    return (
      <Container>
        <h1>Dummy Cart</h1>
        <Title>Cart</Title>
        <Hr />
        {cart.map((product, index) => (
          <React.Fragment key={index}>
            <CartItem product={product} />
            <Hr />
          </React.Fragment>
        ))}
        <Total big />
      </Container>
    )
  }
}

const Cart = withRouter(CartWithoutRouter)
export default Cart
