import * as React from 'react'
import styled from 'styled-components'

import Context from '../../context/context'
import Attributes from '../common/attributes'
import Quantity from '../common/quantity'
import ImagesCarousel from './carousel/images-carousel'
import currencySymbol from '../../utils/currencies'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
  display: flex;
  margin-block: 3rem;
`

const RemoveItem = styled.div`
  flex: 0 0 3%;
  padding-block-start: 0.5rem;
`

const IconContainer = styled.div`
  position: relative;
`

const RemoveItemIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`

const Tooltip = styled.span`
  --bg: hsl(0 0% 0% / 0.1);

  position: absolute;
  visibility: hidden;
  z-index: 1;
  top: 130%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 1rem;
  inline-size: max-content;
  text-align: center;
  border-radius: 6px;

  background-color: var(--bg);
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;

  // referring to other component
  ${IconContainer}:hover & {
    visibility: visible;
  }
`

const Details = styled.div`
  flex: 0 0 57%;
  display: flex;
  flex-direction: column;
`

const Brand = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-block-end: 0.5rem;
`

const ProductName = styled.h2`
  font-size: 30px;
  font-weight: 400;
  margin-block-end: 1rem;
`

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
`

class CartItem extends React.Component {
  static contextType = Context

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

  priceInSelectedCurrency(prices) {
    const { currency } = this.context
    const { amount } = prices.find(price => price.currency === currency)
    return `${currencySymbol(currency)} ${amount}`
  }

  handleRemoveButtonClick = () => {
    const { cart, setCart, toast } = this.context
    const { product } = this.props
    const newCart = [...cart]

    // find the right place in the cart
    const cartIndex = newCart.findIndex(item => item.id === product.id)

    newCart.splice(cartIndex, 1)
    setCart(newCart)
    toast({ message: 'Removed from Cart' })
  }

  render() {
    const { product } = this.props

    return (
      <Container>
        <RemoveItem>
          <IconContainer>
            <RemoveItemIcon
              icon={faTrashAlt}
              onClick={this.handleRemoveButtonClick}
            />
            <Tooltip>remove from cart</Tooltip>
          </IconContainer>
        </RemoveItem>
        <Details>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          <Price>{this.priceInSelectedCurrency(product.prices)}</Price>
          <Attributes
            theme="product-details"
            product={product}
            setAttributes={this.setAttributes}
          />
        </Details>
        <Quantity big product={product} />
        <ImagesCarousel gallery={product.gallery} />
      </Container>
    )
  }
}

export default CartItem
