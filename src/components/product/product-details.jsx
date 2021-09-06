import * as React from 'react'
import styled from 'styled-components'
import parse from 'html-react-parser'
import toast from 'react-hot-toast'
import { withRouter } from 'react-router'

import Context from '../../context/context'
import Attributes from './attributes'
import Price from './price'

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
  /* width: 40ch; */
`

class ProductDetailsWithoutRouter extends React.Component {
  static contextType = Context
  state = { mainPicture: 0, attributes: [] }

  handleThumbnailClick(index) {
    this.setState({ mainPicture: index })
  }

  handleCTAClick = history => {
    const { cart, setCart } = this.context

    const {
      data: {
        product: { id, name, brand, gallery, prices, attributes },
      },
    } = this.props
    const newProduct = {
      id,
      name,
      brand,
      gallery,
      prices,
      attributes,
      chosenAttributes: this.state.attributes,
    }

    const newCart = cart
    newCart.push(newProduct)

    setCart(newCart)
    toast.success('Added to cart', { duration: 3000, position: 'top-center' })
    history.push('/')
  }

  isAllAtributesChosen() {
    const someAtrributesNotChosen = this.state.attributes.some(
      current => current.itemID === null
    )
    return !someAtrributesNotChosen
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

  componentDidMount() {
    const {
      data: {
        product: { attributes },
      },
    } = this.props

    const createAttributesList = attributes => {
      let auxAttributesList = []
      attributes.forEach(attribute =>
        auxAttributesList.push({ attributeID: attribute.id, itemID: null })
      )
      this.setState({ attributes: auxAttributesList })
    }

    createAttributesList(attributes)
  }

  render() {
    const { data, history } = this.props
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
          <img src={data.product.gallery[this.state.mainPicture]} alt="main" />
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
            active={this.isAllAtributesChosen()}
            onClick={() => this.handleCTAClick(history)}
          >
            add to cart
          </CTA>
          <Description>{parse(data.product.description)}</Description>
        </Details>
      </Container>
    )
  }
}

const ProductDetails = withRouter(ProductDetailsWithoutRouter)
export default ProductDetails
