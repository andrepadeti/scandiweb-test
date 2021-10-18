import * as React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { useLocation, useHistory } from 'react-router'

import Context from '../../context/context'
import { isSimilarProductInCart } from '../../utils/product'
import { PRODUCT_QUERY } from '../../utils/queries'
import currencySymbol from '../../utils/currencies'

import Image from './image'

const Card = styled.div`
  padding: 1rem;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 35px hsla(210, 5%, 67%, 0.6);
  }
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

const ProductCard = ({ product: { id }, inCart }) => {
  const { cart, setCart, toast, currency } = React.useContext(Context)
  const history = useHistory()
  const { pathname } = useLocation()

  const priceInSelectedCurrency = prices => {
    const { amount } = prices.find(price => price.currency === currency)
    return `${currencySymbol(currency)} ${amount}`
  }

  const handleClick = (product, { component }) => {
    if (
      product.attributes.length === 0 &&
      product.inStock &&
      component === 'icon'
    ) {
      // if product has no attributes, add to cart immediately
      if (isSimilarProductInCart(cart, product)) {
        toast({ message: 'Product is already in the cart', type: 'error' })
      } else {
        // product object comes with preventExtensions. This is one way to remove it:
        product = Object.assign({}, product)

        // chosenAttributes is empty since there are no attributes to choose from
        product.chosenAttributes = []

        // add to cart
        const newCart = [...cart]
        newCart.push({ ...product, quantity: 1 })
        setCart(newCart)
        toast({ message: 'Added to cart.' })
      }
    } else {
      // send to PDP to choose attributes before adding to cart
      history.push(`${pathname}/${product.id}`)
    }
  }

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id },
  })
  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>
  const { product } = data

  return (
    <Card
      inStock={product.inStock}
      inCart={inCart}
      onClick={() => handleClick(product, { component: 'card' })}
    >
      <Image
        inCart={inCart}
        images={product.gallery}
        inStock={product.inStock}
        handleClick={e => {
          // stopPropagation is important here because the parent component
          // is also listening for onClick events
          e.stopPropagation()
          handleClick(product, { component: 'icon' })
        }}
      />
      <ItemBrand>{product.brand}</ItemBrand>
      <ItemName>{product.name}</ItemName>
      <ItemPrice>{priceInSelectedCurrency(product.prices)}</ItemPrice>
    </Card>
  )
}

export default ProductCard
