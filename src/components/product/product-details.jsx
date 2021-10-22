import * as React from 'react'
import styled from 'styled-components'
import parse from 'html-react-parser'
import { withRouter } from 'react-router'
import { withMediaQuery } from '../../utils/media-query'

import Context from '../../context/context'
import { isSimilarProductInCart, isInCart } from '../../utils/product'
import Attributes from '../common/attributes'
import Price from './price'
import { CTA } from '../common/buttons'
import ImagesCarousel from '../common/carousel/images-carousel'

import { device } from '../../styles/device'

const Container = styled.section`
  padding-inline: 3em;
  padding-block: var(--padding-block-start) 3em;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media ${device.mobile} {
    flex-direction: column;
    padding-inline: 1em;
    gap: 4rem;
  }
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
const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const Description = styled.div`
  margin-block-start: 2rem;
  font-family: 'Roboto', sans;
  font-weight: 400;
`

const Message = styled.p`
  margin-block-end: 2rem;
  font-size: 14px;
`

class BareProductDetails extends React.Component {
  static contextType = Context
  state = {
    mainPicture: 0,
    product: null,
  }

  // adds chosenAttributes properties to the product object and sets them to null
  initializeProduct() {
    const {
      data: { product },
    } = this.props

    // chosenAttributes will store user's choices
    let chosenAttributes = []
    product.attributes.forEach(attribute =>
      chosenAttributes.push({ attributeID: attribute.id, itemID: null })
    )
    // add chosenAttributes to state.product
    let newProduct = { ...product, chosenAttributes }
    this.setState({ product: newProduct })
  }

  componentDidMount() {
    document.body.scrollTop = 0
    this.initializeProduct()
  }

  handleThumbnailClick(index) {
    this.setState({ mainPicture: index })
  }

  handleCTAClick = () => {
    const { product } = this.state
    const { cart, setCart, toast } = this.context
    if (!product.inStock) {
      toast({ message: 'This product is out of stock.', type: 'error' })
      return
    }

    if (!this.isAllAtributesChosen()) {
      toast({ message: 'Please, choose attributes first.', type: 'error' })
      return
    }

    if (isInCart(cart, product)) {
      toast({ message: 'This product is already in the cart.', type: 'error' })
      return
    }

    const newCart = [...cart]
    newCart.push({ ...product, quantity: 1 })
    setCart(newCart)

    toast({ message: 'Added to cart.' })
    this.initializeProduct()
  }

  handleRemoveButtonClick = () => {
    const { cart, setCart, toast } = this.context
    const newCart = [...cart]

    // find product in the cart
    const index = newCart.findIndex(
      cartItem => cartItem.id === this.state.product.id
    )

    newCart.splice(index, 1)
    setCart(newCart)

    toast({ message: 'Product removed from cart' })
  }

  isAllAtributesChosen = () => {
    const { product } = this.state

    const someAtrributesNotChosen = product.chosenAttributes.some(
      current => current.itemID === null
    )
    return !someAtrributesNotChosen
  }

  isCTAActive() {
    const { product } = this.state
    const { cart } = this.context

    if (!product.inStock) return false
    if (!this.isAllAtributesChosen()) return false
    if (isInCart(cart, product)) return false
    return true
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
    const { product, mainPicture } = this.state
    const { isMobile } = this.props
    const { cart } = this.context

    // wait until {product} is ready in componentDidMount
    if (!product) return null
    return (
      <Container>
        {isMobile ? (
          <ImagesCarousel gallery={product.gallery} />
        ) : (
          <>
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
              <img src={product.gallery[mainPicture]} alt="main" />
            </MainPicture>
          </>
        )}

        <Details>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          <Attributes
            theme="product-details"
            product={product}
            setAttributes={this.setAttributes}
          />
          <Price prices={product.prices} />
          {isSimilarProductInCart(cart, product) &&
            !isInCart(cart, product) && (
              <Message>
                A similar product is already in the cart. If you want to
                purchase more of this product with different attributes, go
                ahead. If you just want to change the quantity, use the quantity
                buttons in the cart.
              </Message>
            )}
          {isInCart(cart, product) && (
            <Message>
              This exact same product is in the cart. If you just want to change
              the quantity, use the quantity buttons in the cart.
            </Message>
          )}
          <ButtonsContainer>
            <CTA active={this.isCTAActive()} onClick={this.handleCTAClick}>
              {product.inStock ? 'add to cart' : 'out of stock'}
            </CTA>
            {/* {isInCart(cart, product) && (
              <Button onClick={this.handleRemoveButtonClick}>
                Remove from Cart
              </Button>
            )} */}
          </ButtonsContainer>
          <Description>{parse(product.description)}</Description>
        </Details>
      </Container>
    )
  }
}

const ProductDetails = withRouter(withMediaQuery(BareProductDetails))
export default ProductDetails
