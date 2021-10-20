import * as React from 'react'
import styled from 'styled-components'
import { withMediaQuery } from '../../utils/media-query'

import Context from '../../context/context'
import Attributes from '../common/attributes'
import Quantity from '../common/quantity'
import ImagesCarousel from '../common/carousel/images-carousel'
import currencySymbol from '../../utils/currencies'
import Tooltip from '../common/tooltip'

import { device } from '../../styles/device'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-block: 3rem;

  @media ${device.mobile} {
    flex-direction: column;
    gap: 1em;
  }
`

const RemoveItem = styled.div`
  flex: 0 0 3%;
  padding-block-start: 0.5rem;
`

const RemoveItemIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`

const TooltipStyled = styled(Tooltip)`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
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

const SmallContainer = styled.div`
  flex: 0 0 40%;
  display: flex;
  gap: 1em;
`

class BareCartItem extends React.Component {
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
    const { product, isMobile } = this.props

    return (
      <Container>
        {!isMobile && (
          <RemoveItem>
            <TooltipStyled text="remove from cart">
              <RemoveItemIcon
                icon={faTrashAlt}
                onClick={this.handleRemoveButtonClick}
              />
            </TooltipStyled>
          </RemoveItem>
        )}
        <Details>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          <Price>{this.priceInSelectedCurrency(product.prices)}</Price>
          <Attributes
            theme="product-details"
            product={product}
            // setAttributes={this.setAttributes}
          />
        </Details>
        <SmallContainer>
          <Quantity big product={product} />
          <ImagesCarousel gallery={product.gallery} />
        </SmallContainer>
      </Container>
    )
  }
}

const CartItem = withMediaQuery(BareCartItem)
export default CartItem
