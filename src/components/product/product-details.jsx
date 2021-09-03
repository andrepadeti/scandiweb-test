import React from 'react'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import { withRouter } from 'react-router'
import parse from 'html-react-parser'

import Context from '../../context/context'

import Attributes from './attributes'
import Price from './price'

const PRODUT_DETAILS_QUERY = gql`
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

const Container = styled.section`
  padding-inline: 3rem;
  padding-block: 3rem;
  display: flex;
  gap: 2rem;
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
`

const Details = styled.div`
  flex: 1 1 40%;
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
  background-color: ${props =>
    props.active ? 'var(--c-primary)' : 'var(--c-primary-disabled)'};
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
  static contextType = Context
  state = { mainPicture: 0, attributes: [], productDetails: {} }

  handleThumbnailClick(index) {
    this.setState({ mainPicture: index })
  }

  createAttributesList = attributes => {
    let auxAttributesList = []
    attributes.forEach(attribute =>
      auxAttributesList.push({ attributeID: attribute.id, itemID: null })
    )
    this.setState({ attributes: auxAttributesList })
  }

  isAllAtributesChosen() {
    const someAtrributeNotChosen = this.state.attributes.some(current => {
      console.log('some: ' + current.itemID)
      return current.itemID === null
    })
    console.log(this.state.attributes)
    console.log(someAtrributeNotChosen)
    return !someAtrributeNotChosen
  }

  setAttributes = attributes => {
    let auxAttributes = this.state.attributes
    // check whether this attribute has been set before
    const index = auxAttributes.findIndex(
      current => current.attributeID === attributes.attributeID
    )
    // if yes, replace old choice with new choice
    if (index >= 0) {
      auxAttributes[index] = attributes
      // if not, append new choice to the array of choices
    } else {
      auxAttributes.push(attributes)
    }
    // console.log(auxAttributes)
    this.setState({ attributes: auxAttributes })
  }

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
          // this.createAttributesList(data.product.attributes)
          this.setState({attributes: true})
          return (
            <Container>
              <ThumbnailsContainer>
                {data.product.gallery.map((product, index) => (
                  <ThumbanilsImg
                    src={product}
                    key={'tn' + index}
                    alt="thumbnail"
                    onClick={() => this.handleThumbnailClick(index)}
                  />
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
                <Attributes
                  attributes={data.product.attributes}
                  setAttributes={this.setAttributes}
                />
                <Price prices={data.product.prices} />
                <CTA
                  active={setTimeout(() => this.isAllAtributesChosen(), 2000)}
                >
                  add to cart
                </CTA>
                <Description>{parse(data.product.description)}</Description>
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
