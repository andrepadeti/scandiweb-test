import * as React from 'react'
import styled from 'styled-components'
import Context from '../../context/context'

import Tooltip from '../common/tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
  /* flex: 0 0 10%; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

const TooltipStyled = styled(Tooltip)`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
`

class Quantity extends React.Component {
  static contextType = Context

  handleQuantityButtonClick = ({ action, product }) => {
    const { cart, setCart, toast } = this.context

    // find the right product in the cart array
    const index = cart.findIndex((cartItem, index) => {
      let isEveryAttMatches
      if (cartItem.id === product.id) {
        // product in the cart; check if every attribute matches the product in the cart
        isEveryAttMatches = cart[index].chosenAttributes.every(
          cartChosenAttribute => {
            // find index of equivalent cart attribute in the product object
            const productChosenAttributeIndex =
              product.chosenAttributes.findIndex(
                productChosenAttribute =>
                  productChosenAttribute.attributeID ===
                  cartChosenAttribute.attributeID
              )
            return (
              product.chosenAttributes[productChosenAttributeIndex].itemID ===
              cartChosenAttribute.itemID
            )
          }
        )
      }
      return isEveryAttMatches
    })

    // change quantity accordingly
    let auxCart = [...cart]
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
    const { product, big } = this.props

    return (
      <Container>
        <Box
          big={big}
          withBorder={true}
          onClick={() =>
            this.handleQuantityButtonClick({
              action: 'increase',
              product,
            })
          }
        >
          +
        </Box>
        <Figure>{product.quantity}</Figure>
        <Box
          big={big}
          withBorder={product.quantity > 0}
          onClick={() =>
            this.handleQuantityButtonClick({
              action: 'decrease',
              product,
            })
          }
        >
          {product.quantity === 0 ? (
            <TooltipStyled text="remove from cart" arrow>
              <FontAwesomeIcon icon={faTrashAlt} size="lg" />
            </TooltipStyled>
          ) : (
            '-'
          )}
        </Box>
      </Container>
    )
  }
}

export default Quantity
