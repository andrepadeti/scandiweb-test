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
const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`
const Button = styled.button`
  display: block;
  width: 12rem;
  padding-block: 1rem;

  background-color: var(--c-bg-light);
  color: var(--c-text);
  border: 1px solid var(--c-text);
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
`

const CTA = styled(Button)`
  background-color: ${props =>
    props.active ? 'var(--c-primary)' : 'var(--c-primary-disabled)'};
  color: var(--c-text-light);
  border: ${props =>
    props.active ? 'var(--c-primary)' : 'var(--c-primary-disabled)'};
  cursor: ${props => (props.active ? 'pointer' : 'default')};
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
      // add chosenAttributes and quantity properties to the product
      let newProduct = { ...product, chosenAttributes, quantity: 1 }
      this.setState({ product: newProduct })
    } else {
      this.setState({ product: cart[index], inCart: true })
    }
  }

  handleThumbnailClick(index) {
    this.setState({ mainPicture: index })
  }

  handleCTAClick = () => {
    if (!this.isAllAtributesChosen()) {
      toast.error('Please, choose attributes first.')
      return
    }

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

    toast.success('Added to cart', { duration: 3000, position: 'top-center' })
    history.goBack()
  }

  handleRemoveButtonClick = () => {
    console.log('here')
    const { cart, setCart } = this.context
    const newCart = [...cart]

    // find product in the cart
    const index = newCart.findIndex(
      cartItem => cartItem.id === this.state.product.id
    )

    newCart.splice(index, 1)
    setCart(newCart)
    this.setState({ inCart: false })

    toast.success('Product removed from cart', {
      duration: 3000,
      position: 'top-center',
    })
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
            theme="product-details"
            product={product}
            setAttributes={this.setAttributes}
          />
          <Price prices={product.prices} />
          <ButtonsContainer>
            <CTA
              active={this.isAllAtributesChosen()}
              onClick={this.handleCTAClick}
            >
              {this.state.inCart ? 'update cart' : 'add to cart'}
            </CTA>
            {this.state.inCart && (
              <Button onClick={this.handleRemoveButtonClick}>
                Remove from Cart
              </Button>
            )}
          </ButtonsContainer>
          <Description>{parse(product.description)}</Description>
        </Details>
      </Container>
    )
  }
}

const ProductDetails = withRouter(ProductDetailsWithoutRouter)
export default ProductDetails
