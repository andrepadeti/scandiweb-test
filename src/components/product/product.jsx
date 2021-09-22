import * as React from 'react'
import { Query } from '@apollo/client/react/components'
import { withRouter } from 'react-router'

import ProductDetails from './product-details'
import { PRODUCT_QUERY } from '../../utils/queries'

class ProductWithoutRouter extends React.Component {
  state = { productDetails: {} }

  render() {
    const { match } = this.props
    const {
      params: { product: id },
    } = match

    return (
      <Query query={PRODUCT_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          return <ProductDetails data={data} />
        }}
      </Query>
    )
  }
}

const Product = withRouter(ProductWithoutRouter)
export default Product
