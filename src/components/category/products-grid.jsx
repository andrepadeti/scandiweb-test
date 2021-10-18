import * as React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

import Context from '../../context/context'

import { isSimilarProductInCart } from '../../utils/product'
import { PRODUCTS_QUERY, ALL_PRODUCTS_QUERY } from '../../utils/queries'

import ProductCard from './product-card'

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, 395px);
  justify-content: center;
  padding-block-end: 3rem;
`

const ProductsGrid = ({ category }) => {
  const { cart } = React.useContext(Context)

  let query
  if (category === 'all') {
    query = ALL_PRODUCTS_QUERY
  } else {
    query = PRODUCTS_QUERY
  }

  const { loading, error, data } = useQuery(query, { variables: { category } })
  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>

  let products = []
  if (category === 'all') {
    // format data to make an array of products
    data.categories.forEach(category =>
      category.products.forEach(product => products.push(product))
    )
  } else {
    // data is already an array of products
    products = data.category.products
  }

  return (
    <Grid>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          inCart={isSimilarProductInCart(cart, product)}
        />
      ))}
    </Grid>
  )
}

export default ProductsGrid
