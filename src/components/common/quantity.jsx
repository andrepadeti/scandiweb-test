import * as React from 'react'
import styled from 'styled-components'
import Context from '../../context/context'

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
  display: grid;
  place-content: center;

  width: ${props => props.size};
  height: ${props => props.size};
  border: 1px solid black;
  cursor: pointer;
  user-select: none;

  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
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
    // console.log(product)
    return (
      <QuantityContainer>
        <Box
          big={this.props.big}
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
