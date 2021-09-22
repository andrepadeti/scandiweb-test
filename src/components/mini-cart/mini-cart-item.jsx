import * as React from 'react'
import styled from 'styled-components'
import Context from '../../context/context'

import Attributes from '../common/attributes'
import Quantity from '../common/quantity'
import currencySymbol from '../../utils/currencies'

const Container = styled.div`
  display: flex;
  margin-block: 2rem;
`

const Details = styled.div`
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-block-end: 1.5rem;
`

const Name = styled.h3`
  font-weight: 300;
`

const Brand = styled(Name)``

const Price = styled.p`
  font-weight: 500;
  margin-block-end: 1.5rem;
`

const PictureContainer = styled.div`
  flex: 0 0 40%;
  display: grid;
  place-content: center;
`

const Picture = styled.img`
  object-fit: contain;
`

class CartItem extends React.Component {
  static contextType = Context

  priceInSelectedCurrency(prices) {
    const { currency } = this.context
    const { amount } = prices.find(price => price.currency === currency)
    return `${currencySymbol(currency)} ${amount}`
  }

  render() {
    const { product, setAttributes } = this.props
    return (
      <Container>
        <Details>
          <Title>
            <Brand>{product.brand}</Brand>
            <Name>{product.name}</Name>
          </Title>
          <Price>{this.priceInSelectedCurrency(product.prices)}</Price>
          <Attributes
            theme="mini-cart"
            product={product}
            // setAttributes={setAttributes}
          />
        </Details>
        <Quantity product={product} />
        <PictureContainer>
          <Picture src={product.gallery[0]} alt="gallery" />
        </PictureContainer>
      </Container>
    )
  }
}

export default CartItem
