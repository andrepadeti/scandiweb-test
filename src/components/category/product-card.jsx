import * as React from 'react'
import styled from 'styled-components'
import { Query } from '@apollo/client/react/components'
import { withRouter } from 'react-router'

import Context from '../../context/context'
import { isSimilarProductInCart } from '../../utils/product'
import { PRODUCT_QUERY } from '../../utils/queries'
import currencySymbol from '../../utils/currencies'

import Image from './image'

const Card = styled.div`
  padding: 1rem;
  box-shadow: 0px 0px 35px hsla(210, 5%, 67%, 0.6);
`
const ItemName = styled.h2`
  font-size: 18px;
`

const ItemBrand = styled.h2`
  margin-block-start: 2rem;
  font-size: 18px;
  font-weight: 600;
`

const ItemPrice = styled.p`
  margin-block-start: 0.5rem;
  font-size: 18px;
  font-weight: 500;
`

class ProductCardWithoutRouter extends React.Component {
  static contextType = Context

  priceInSelectedCurrency(prices) {
    const { currency } = this.context
    const { amount } = prices.find(price => price.currency === currency)
    return `${currencySymbol(currency)} ${amount}`
  }

  handleClick(product) {
    if (product.attributes.length === 0 && product.inStock) {
      // if product has no attributes, add to cart immediately
      const { cart, setCart, toast } = this.context

      if (isSimilarProductInCart(cart, product)) {
        toast({ message: 'Product is already in the cart', type: 'error' })
      } else {
        // product object is not extensible
        let newProduct = JSON.parse(JSON.stringify(product))
        // chosenAttributes is empty since there are no attributes to choose from
        newProduct.chosenAttributes = []
        // add to cart
        const newCart = [...cart]
        newCart.push({ ...newProduct, quantity: 1 })
        setCart(newCart)

        toast({ message: 'Added too cart.' })
      }
    } else {
      // send to PDP to choose attributes before adding to cart
      const { history, location } = this.props
      history.push(`${location.pathname}/${product.id}`)
    }
  }

  render() {
    const {
      product: { id },
      inCart,
    } = this.props

    return (
      <Query query={PRODUCT_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          const { product } = data
          return (
            <Card inStock={product.inStock} inCart={inCart}>
              <Image
                inCart={inCart}
                images={product.gallery}
                inStock={product.inStock}
                handleClick={() => this.handleClick(product)}
              />
              <ItemBrand>{product.brand}</ItemBrand>
              <ItemName>{product.name}</ItemName>
              <ItemPrice>
                {this.priceInSelectedCurrency(product.prices)}
              </ItemPrice>
            </Card>
          )
        }}
      </Query>
    )
  }
}

const ProductCard = withRouter(ProductCardWithoutRouter)
export default ProductCard
