import * as React from 'react'
import styled from 'styled-components'
import Context from '../../context/context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

const QuantityContainer = styled.div`
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Figure = styled.div``

const Box = styled.div.attrs(props => ({
  size: props.big ? '2rem' : '24px',
}))`
  position: relative;
  display: grid;
  place-content: center;

  width: ${props => props.size};
  height: ${props => props.size};
  border: ${props => props.withBorder && '1px solid black'};
  cursor: pointer;
  user-select: none;

  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
`

const Tooltip = styled.span`
  --bg: hsl(0 0% 0% / 0.1);
  visibility: hidden;
  position: absolute;
  top: 130%;
  left: 50%;
  transform: translateX(-50%);
  inline-size: max-content;
  text-align: center;
  padding: 5px 1rem;
  border-radius: 6px;
  z-index: 1;

  background-color: var(--bg);
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;

  // referring to other component
  ${Box}:hover & {
    visibility: visible;
  }

  &::after {
    content: ' ';
    position: absolute;
    bottom: 100%;
    left: 50%; /* To the right of the tooltip */
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent var(--bg) transparent;
  }
`

class Quantity extends React.Component {
  static contextType = Context

  handleQuantityButtonClick = ({ action, productID }) => {
    const { cart, setCart, toast } = this.context
    // spread operator is important here, otherwise i'd simply be
    // passing a reference to the state and changing the state itself
    let auxCart = [...cart]

    // find the right product in the cart array
    const index = auxCart.findIndex(product => product.id === productID)
    // change quantity accordingly
    if (action === 'increase') auxCart[index].quantity += 1
    if (action === 'decrease') {
      if (auxCart[index].quantity > 0) {
        auxCart[index].quantity -= 1
      } else {
        auxCart.splice(index, 1)
        toast({ message: 'Removed from Cart' })
      }
    }

    setCart(auxCart)
  }

  render() {
    const { product } = this.props

    return (
      <QuantityContainer>
        <Box
          big={this.props.big}
          withBorder={true}
          onClick={() =>
            this.handleQuantityButtonClick({
              action: 'increase',
              productID: product.id,
            })
          }
        >
          +
        </Box>
        <Figure>{product.quantity}</Figure>
        <Box
          big={this.props.big}
          withBorder={product.quantity > 0}
          onClick={() =>
            this.handleQuantityButtonClick({
              action: 'decrease',
              productID: product.id,
            })
          }
        >
          {product.quantity === 0 ? (
            <>
              <FontAwesomeIcon icon={faTrashAlt} size="lg" />
              <Tooltip>remove from cart</Tooltip>
            </>
          ) : (
            '-'
          )}
        </Box>
      </QuantityContainer>
    )
  }
}

export default Quantity
