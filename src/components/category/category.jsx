import * as React from 'react'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import { withRouter } from 'react-router'

import Context from '../../context/context'
import CategoryItem from './category-item'

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

const PRODUCTS_QUERY = gql`
  query Products($title: String!) {
    category(input: { title: $title }) {
      products {
        id
      }
    }
  }
`

class CategoryWithoutRouter extends React.Component {
  static contextType = Context

  isInCart = id => {
    const { cart } = this.context
    return cart.some(product => product.id === id)
  }

  render() {
    // const { match, location } = this.props
    const category = this.props.location.pathname.substring(1)
    // const category = match.params.category

    return (
      <Container>
        <Title>{category}</Title>
        <Query query={PRODUCTS_QUERY} variables={{ title: category }}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>
            if (error) return <div>Error</div>
            return (
              <Grid>
                {data.category.products.map((product, index) => (
                  <CategoryItem
                    key={index}
                    product={product}
                    inCart={this.isInCart(product.id)}
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
