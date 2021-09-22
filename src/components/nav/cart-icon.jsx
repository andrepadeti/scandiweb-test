import * as React from 'react'
import styled from 'styled-components'

import Context from '../../context/context'
import shoppingCart from '../../images/shopping-cart.svg'

const Container = styled.div`
  position: relative;
  cursor: pointer;
`

const Icon = styled.img``

const NumberIcon = styled.span`
  position: absolute;
  top: -1rem;
  right: -1rem;

  --size: 1.5rem;
  width: var(--size);
  height: var(--size);

  display: grid;
  place-content: center;

  border-radius: 50%;
  background-color: var(--c-bg-dark);
  color: var(--c-text-light);
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 700;
`

class CartIcon extends React.Component {
  static contextType = Context

  numberOfItems = () => {
    const { cart } = this.context
    let numberOfItems = 0
    cart.forEach(item => (numberOfItems += item.quantity))
    return numberOfItems
  }

  render() {
    const { cart, showMiniCart, setShowMiniCart } = this.context
    return (
      <Container
        onClick={() => showMiniCart === false && setShowMiniCart(true)}
      >
        <Icon src={shoppingCart} alt="" />
        {this.numberOfItems() > 0 && <NumberIcon>{this.numberOfItems()}</NumberIcon>}
      </Container>
    )
  }
}

export default CartIcon
