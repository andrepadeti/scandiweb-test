import React from 'react'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import parse from 'html-react-parser'

import { withRouter } from 'react-router'
import Attributes from './attributes'
import Price from './price'

const PRODUT_DETAILS_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      name
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency
        amount
      }
      brand
    }
  }
`

const Container = styled.div`
  padding-inline: 3rem;
  padding-block: 3rem;
  display: flex;
  gap: 1rem;
`

const ThumbnailsContainer = styled.div`
  flex: 1 1 20%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ThumbanilsImg = styled.img`
  max-height: 150px;
  object-fit: contain;
`

const MainPicture = styled.div`
  flex: 1 1 40%;
  /* background-color: yellow; */
`

const Details = styled.div`
  flex: 1 1 40%;
  /* background-color: yellow; */
`

const Brand = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-block-end: 0.5rem;
`

const ProductName = styled.h2`
  font-size: 30px;
  font-weight: 400;
  margin-block-end: 1rem;
`

const CTA = styled.button`
  display: block;
  width: 12rem;
  padding-block: 1rem;
  background-color: var(--c-primary);
  border: none;

  font-weight: 600;
  text-transform: uppercase;
  color: var(--c-text-light);
`

const Description = styled.div`
  margin-block-start: 2rem;
  font-family: 'Roboto', sans;
  font-weight: 400;
  width: 40ch;
`

class ProductDetailsWithoutRouter extends React.Component {
  state = { mainPicture: 0 }

  render() {
    const { match } = this.props
    const {
      params: { product: id },
    } = match

    return (
      <Query query={PRODUT_DETAILS_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          return (
            <Container>
              <ThumbnailsContainer>
                {data.product.gallery.map((product, index) => (
                  <ThumbanilsImg src={product} key={index} alt="thumbnail" />
                ))}
              </ThumbnailsContainer>
              <MainPicture>
                <img
                  src={data.product.gallery[this.state.mainPicture]}
                  alt="main"
                />
              </MainPicture>
              <Details>
                <Brand>{data.product.brand}</Brand>
                <ProductName>{data.product.name}</ProductName>
                <Attributes attributes={data.product.attributes} />
                <Price prices={data.product.prices} />
                <CTA>add to cart</CTA>
                <Description>
                  {parse(data.product.description)}
                </Description>
              </Details>
            </Container>
          )
        }}
      </Query>
    )
  }
}

const ProductDetails = withRouter(ProductDetailsWithoutRouter)
export default ProductDetails
