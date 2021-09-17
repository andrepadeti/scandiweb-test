import * as React from 'react'
import styled, { css } from 'styled-components'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import { withRouter } from 'react-router'

import Context from '../../context/context'
import currencySymbol from '../../utils/currencies'

import Image from './image'

const Card = styled.div`
  padding: 1rem;
  cursor: pointer;

  ${props =>
    props.inCart &&
    css`
      box-shadow: 0px 0px 35px hsla(210, 5%, 67%, 0.6);
    `}
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

const PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      gallery
      prices {
        currency
        amount
      }
    }
  }
`

class CategoryItemWithoutRouter extends React.Component {
  static contextType = Context

  priceInSelectedCurrency(prices) {
    const { currency } = this.context
    const { amount } = prices.find(price => price.currency === currency)
    return `${currencySymbol(currency)} ${amount}`
  }

  handleClick(id) {
    const { history, location } = this.props
    history.push(`${location.pathname}/${id}`)
  }

  render() {
    const {
      product: { id },
    } = this.props

    return (
      <Query query={PRODUCT_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          const { product } = data
          return (
            <Card
              inStock={product.inStock}
              inCart={this.props.inCart}
              onClick={() => this.handleClick(id)}
            >
              <Image
                inCart={this.props.inCart}
                images={product.gallery}
                inStock={product.inStock}
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

const CategoryItem = withRouter(CategoryItemWithoutRouter)
export default CategoryItem
