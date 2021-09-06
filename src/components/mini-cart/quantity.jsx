import * as React from 'react'
import styled from 'styled-components'
import Context from '../../context/context'

const QuantityContainer = styled.div`
  flex: 1 1 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Figure = styled.div``

const Box = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  --size: 24px;
  width: var(--size);
  height: var(--size);
  border: 1px solid black;
  display: grid;
  place-content: center;
`

class Quantity extends React.Component {
  static contextType = Context

  handleQuantityButtonClick = ({ action, productID }) => {
    const { cart, setCart } = this.context
    // spread operator is important here, otherwise i'd simply be
    // passing a reference to the state and changing the state itself
    let auxCart = [...cart]

    // find the right product in the cart array
    const index = auxCart.findIndex(product => product.id === productID)
    // change quantity accordingly
    if (action === 'increase') auxCart[index].quantity += 1
    if (action === 'decrease' && auxCart[index].quantity > 1) {
      auxCart[index].quantity -= 1
    }

    setCart(auxCart)
  }

  render() {
    const { product } = this.props
    return (
      <QuantityContainer>
        <Box
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
          onClick={() =>
            this.handleQuantityButtonClick({
              action: 'decrease',
              productID: product.id,
            })
          }
        >
          -
        </Box>
      </QuantityContainer>
    )
  }
}

export default Quantity