import * as React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import OutsideClickHandler from 'react-outside-click-handler'

import Context from '../../context/context'

import CartItem from './mini-cart-item'
import Total from '../common/total'

const Overlay = styled.section`
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: hsla(247, 13%, 25%, 0.22);
`

const Container = styled.div`
  position: absolute;
  right: 3rem;
  inline-size: 380px;
  padding: 1rem 1rem 1rem 1rem;
  /* margin-inline-end: 1rem; */
  background-color: var(--c-bg-light);
`

const ScrollArea = styled.div`
  max-block-size: 410px;

  // these two apparentely contradictory properties are here
  // to accomodate the scrollbar neatly
  margin-inline-end: -1rem;
  padding-inline-end: 1rem;

  margin-block-end: 1rem;
  overflow: auto;
`

const Title = styled.h2`
  margin-block-end: 2rem;
  font-size: 1rem;
  font-weight: 700;
`

const NumberOfItems = styled.span`
  font-weight: 500;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const Button = styled.button`
  flex: 1;
  padding-block: 1rem;

  background-color: var(--c-primary);
  border: none;
  color: var(--c-text-light);

  font-weight: 600;
  text-transform: uppercase;
`

const ButtonLight = styled(Button)`
  background-color: var(--c-bg-light);
  border: 1px solid var(--c-bg-dark);
  color: var(--c-text);
`

class MiniCartWithoutRouter extends React.Component {
  static contextType = Context

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  handleKeyDown = event => {
    const { setShowMiniCart } = this.context
    if (event.keyCode === 27) {
      setShowMiniCart(false)
    }
  }

  handleOutsideClick = () => {
    const { showMiniCart, setShowMiniCart } = this.context
    if (showMiniCart) {
      setShowMiniCart(false)
    }
  }

  handleViewBagButtonClick = () => {
    const { history } = this.props
    const { setShowMiniCart } = this.context
    setShowMiniCart(false)
    history.push('/cart')
  }

  handleCheckoutButtonClick = () => {
    const { history } = this.props
    const { setShowMiniCart } = this.context
    setShowMiniCart(false)
    history.push('/checkout')
  }

  setAttributes = attributes => {
    const { cart, setCart } = this.context
    const newCart = [...cart]

    // find the right place in the cart
    const cartIndex = newCart.findIndex(
      product => product.id === attributes.productID
    )
    const chosenAttributeIndex = newCart[cartIndex].chosenAttributes.findIndex(
      attr => attr.attributeID === attributes.attributeID
    )

    // change value
    newCart[cartIndex].chosenAttributes[chosenAttributeIndex].itemID =
      attributes.itemID
    setCart(newCart)
  }

  numberOfItemsToString = cart => {
    const isPlural = cart.length > 1 || cart.length === 0
    return `${cart.length} item${isPlural ? 's' : ''}`
  }

  render() {
    const { showMiniCart, cart } = this.context

    if (!showMiniCart) return null
    return (
      <>
        <Overlay>
          <OutsideClickHandler
            onOutsideClick={() =>
              // had to setTimeout because this click event clashes with click event in CartIcon component
              setTimeout(this.handleOutsideClick, 100)
            }
          >
            <Container>
              <ScrollArea>
                <Title>
                  My bag,{' '}
                  <NumberOfItems>
                    {this.numberOfItemsToString(cart)}
                  </NumberOfItems>{' '}
                </Title>
                {cart.map((product, index) => (
                  <CartItem
                    key={index}
                    product={product}
                    setAttributes={this.setAttributes}
                  />
                ))}
                <Total />
              </ScrollArea>
              {cart.length > 0 && (
                <ButtonsContainer>
                  <ButtonLight onClick={this.handleViewBagButtonClick}>
                    View Bag
                  </ButtonLight>
                  <Button onClick={this.handleCheckoutButtonClick}>
                    Check Out
                  </Button>
                </ButtonsContainer>
              )}
            </Container>
          </OutsideClickHandler>
        </Overlay>
      </>
    )
  }
}

const MiniCart = withRouter(MiniCartWithoutRouter)
export default MiniCart
