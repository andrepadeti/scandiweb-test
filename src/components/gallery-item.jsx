import React from 'react'
import styled, { css } from 'styled-components'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'

import Context from '../context/context'
import ImagesCarousel from './gallery-item-carousel'

const Card = styled.div`
  padding: 1rem;

  ${props =>
    props.selected &&
    css`
      box-shadow: 0px 0px 35px hsla(210, 5%, 67%, 0.6);
    `}
`
const ItemName = styled.h2`
  margin-block-start: 2rem;
  font-size: 18px;
`

const ItemPrice = styled.p`
  margin-block-start: 0.5rem;
  font-size: 18px;
  font-weight: 500;
`

const PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      name
      inStock
      gallery
      prices {
        currency
        amount
      }
    }
  }
`

class GalleryItem extends React.Component {
  static contextType = Context

  priceInSelectedCurrency(prices) {
    const { currency } = this.context
    const { amount } = prices.find(price => price.currency === currency)
    return `${currency} ${amount}`
  }

  render() {
    // proud of this deconstruction :-)
    const {
      product: { id },
    } = this.props

    return (
      <Query query={PRODUCT_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          // console.log(data)
          return (
            <Card selected={this.props.selected}>
              <ImagesCarousel
                selected={this.props.selected}
                images={data.product.gallery}
                inStock={data.product.inStock}
              />
              <ItemName>{data.product.name}</ItemName>
              <ItemPrice>
                {this.priceInSelectedCurrency(data.product.prices)}
              </ItemPrice>
            </Card>
          )
        }}
      </Query>
    )
  }
}

export default GalleryItem
