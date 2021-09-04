import React from 'react'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import { withRouter } from 'react-router'

import ProductDetails from './product-details'

const PRODUCT_DETAILS_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      gallery
      description
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency
        amount
      }
    }
  }
`

class ProductWithoutRouter extends React.Component {
  state = { productDetails: {} }

  render() {
    const { match } = this.props
    const {
      params: { product: id },
    } = match

    return (
      <Query query={PRODUCT_DETAILS_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          return (
            <ProductDetails data={data} />
          )
        }}
      </Query>
    )
  }
}

const Product = withRouter(ProductWithoutRouter)
export default Product
