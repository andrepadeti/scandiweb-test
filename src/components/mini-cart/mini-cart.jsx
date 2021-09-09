import * as React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import OutsideClickHandler from 'react-outside-click-handler'

import Context from '../../context/context'

import CartItem from './mini-cart-item'
import Total from '../common/total'
import { Button, CTA } from '../common/buttons'

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
  margin-block-end: 3rem;
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

const Hr = styled.hr`
  border-top: 1px solid hsla(0, 0%, 90%, 1);
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
                  <React.Fragment key={index}>
                  <CartItem
                    product={product}
                    setAttributes={this.setAttributes}
                  />
                  <Hr />
                  </React.Fragment>
                ))}
                <Total />
              </ScrollArea>
              {cart.length > 0 && (
                <ButtonsContainer>
                  <Button onClick={this.handleViewBagButtonClick}>
                    View Bag
                  </Button>
                  <CTA active onClick={this.handleCheckoutButtonClick}>
                    Check Out
                  </CTA>
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
