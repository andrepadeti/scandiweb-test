import * as React from 'react'
import styled from 'styled-components'
import { Query } from '@apollo/client/react/components'
import { withRouter } from 'react-router'

import Context from '../../context/context'
import ProductCard from './product-card'
import {PRODUCTS_QUERY, ALL_PRODUCTS_QUERY} from '../../utils/queries'

const Container = styled.section`
  padding-inline: 3rem;
  padding-block-start: 3rem;
`

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, 395px);
  padding-block-end: 3rem;
`

const Title = styled.h1`
  margin-block-end: 5rem;
  text-transform: capitalize;
`

class CategoryWithoutRouter extends React.Component {
  static contextType = Context

  // checks whether product is in the cart, without bothering with details about the attributes chosen
  isSimilarProductInCart = id => {
    const { cart } = this.context
    return cart.some(product => product.id === id)
  }

  render() {
    const category = this.props.location.pathname.substring(1)

    let query
    if (category === 'all') {
      query = ALL_PRODUCTS_QUERY
    } else {
      query = PRODUCTS_QUERY
    }

    return (
      <Container>
        <Title>{category}</Title>
        <Query query={query} variables={{ category }}>
          {({ data, loading, error }) => {
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
                    inCart={this.isSimilarProductInCart(product.id)}
                  />
                ))}
              </Grid>
            )
          }}
        </Query>
      </Container>
    )
  }
}

const Category = withRouter(CategoryWithoutRouter)
export default Category
