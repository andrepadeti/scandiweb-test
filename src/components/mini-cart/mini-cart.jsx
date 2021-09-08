import * as React from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'

import Context from '../../context/context'

import CartItem from './cart-item'

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

  // these two apparentely contradictory properties are here to accomodate the scrollbar neatly
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

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const H3 = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
`

const Total = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 16px;
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

class MiniCart extends React.Component {
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
    return `${cart.length} item${cart.length > 1 ? 's' : ''}`
  }

  totalToString = () => {
    const { cart, currency } = this.context
    let total = 0

    cart.forEach(product => {
      // find price in the right currency
      const unitaryPrice = product.prices.find(price => price.currency === currency)
      const price = unitaryPrice.amount * product.quantity
      total += price
    })

    return `${currency} ${total.toFixed(2)}`
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
                <TotalContainer>
                  <H3>Total</H3>
                  <Total>{this.totalToString()}</Total>
                </TotalContainer>
              </ScrollArea>
              <ButtonsContainer>
                <ButtonLight>View Bag</ButtonLight>
                <Button>Check Out</Button>
              </ButtonsContainer>
            </Container>
          </OutsideClickHandler>
        </Overlay>
      </>
    )
  }
}

export default MiniCart
