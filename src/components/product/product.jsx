import * as React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'

import ProductDetails from './product-details'
import { PRODUCT_QUERY } from '../../utils/queries'

const Product = () => {
  const { product: id } = useParams()

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id },
  })
  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>
  
  return <ProductDetails data={data} />
}

export default Product
