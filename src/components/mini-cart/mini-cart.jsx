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
  width: 320px;
  padding: 1rem;
  background-color: var(--c-bg-light);
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

class MiniCart extends React.Component {
  static contextType = Context

  handleOutsideClick = (showMiniCart, setShowMiniCart) => {
    if (showMiniCart) {
      setShowMiniCart(false)
    }
  }

  render() {
    const { showMiniCart, setShowMiniCart, cart } = this.context

    return (
      <>
        {showMiniCart && (
          <Overlay>
            <OutsideClickHandler
              onOutsideClick={() =>
                // had to setTimeout because this click event clashes with click event in CartIcon component
                setTimeout(
                  () => this.handleOutsideClick(showMiniCart, setShowMiniCart),
                  100
                )
              }
            >
              <Container>
                <Title>
                  My bag, <NumberOfItems>2 items</NumberOfItems>{' '}
                </Title>
                {cart.map((product, index)=>(
                  <CartItem key={index} product={product} />
                ))}
                <ButtonsContainer>
                  <ButtonLight>View Bag</ButtonLight>
                  <Button>Check Out</Button>
                </ButtonsContainer>
              </Container>
            </OutsideClickHandler>
          </Overlay>
        )}
      </>
    )
  }
}

export default MiniCart
