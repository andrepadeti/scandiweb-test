import * as React from 'react'
import styled from 'styled-components'
import parse from 'html-react-parser'
import toast from 'react-hot-toast'
import { withRouter } from 'react-router'

import Context from '../../context/context'
import Attributes from '../common/attributes'
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
  state = { mainPicture: 0, product: null, inCart: false }

  componentDidMount() {
    const {
      data: { product },
    } = this.props
    const { cart } = this.context

    // check whether product is already in cart
    const index = cart.findIndex(cartItem => cartItem.id === product.id)

    // if not, create chosenAttributes property and set null to all choices
    if (index === -1) {
      let chosenAttributes = []
      product.attributes.forEach(attribute =>
        chosenAttributes.push({ attributeID: attribute.id, itemID: null })
      )
      // add chosenAttributes property to the product
      let newProduct = { ...product, chosenAttributes }
      this.setState({ product: newProduct })
    } else {
      this.setState({ product: cart[index], inCart: true })
    }
  }

  handleThumbnailClick(index) {
    this.setState({ mainPicture: index })
  }

  handleCTAClick = () => {
    const { history } = this.props
    const { cart, setCart } = this.context
    const newCart = [...cart]

    // check whether product is already in cart
    const index = newCart.findIndex(
      cartItem => cartItem.id === this.state.product.id
    )

    if (index === -1) {
      //if not, push new product
      newCart.push(this.state.product)
    } else {
      //if yes, replace product with new information
      newCart[index] = this.state.product
    }
    setCart(newCart)
    console.log(newCart)

    toast.success('Added to cart', { duration: 3000, position: 'top-center' })
    history.goBack()
  }

  isAllAtributesChosen() {
    const someAtrributesNotChosen = this.state.product.chosenAttributes.some(
      current => current.itemID === null
    )
    return !someAtrributesNotChosen
  }

  setAttributes = attributes => {
    let newProduct = this.state.product
    // find this attribute in the attributes array
    const index = newProduct.chosenAttributes.findIndex(
      current => current.attributeID === attributes.attributeID
    )
    // replace old choice with new choice
    newProduct.chosenAttributes[index] = attributes
    this.setState({ product: newProduct })
  }

  render() {
    const { product } = this.state

    // wait until {product} is ready in componentDidMount
    if (!product) return null
    return (
      <Container>
        <ThumbnailsContainer>
          {product.gallery.map((product, index) => (
            <ThumbanilsImg
              src={product}
              key={'tn' + index}
              alt="thumbnail"
              onClick={() => this.handleThumbnailClick(index)}
            />
          ))}
        </ThumbnailsContainer>
        <MainPicture>
          <img src={product.gallery[this.state.mainPicture]} alt="main" />
        </MainPicture>
        <Details>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          <Attributes
            attributes={product.attributes}
            chosenAttributes={product.chosenAttributes}
            setAttributes={this.setAttributes}
          />
          <Price prices={product.prices} />
          <CTA
            active={this.isAllAtributesChosen()}
            onClick={this.handleCTAClick}
          >
            {this.state.inCart ? 'update cart' : 'add to cart'}
          </CTA>
          <Description>{parse(product.description)}</Description>
        </Details>
      </Container>
    )
  }
}

const ProductDetails = withRouter(ProductDetailsWithoutRouter)
export default ProductDetails
