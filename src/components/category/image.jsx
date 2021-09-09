import * as React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 22rem;
`
const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`

const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: hsl(0 0% 100% / 0.75);

  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 24px;
  user-select: none;
  color: hsl(231 6% 58%);
`

const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  right: 1rem;
  padding: 1rem;
  border-radius: 50%;
  background-color: var(--c-primary);
`

const Icon = styled(FontAwesomeIcon)`
  color: var(--c-text-light);
`

class Image extends React.Component {
  render() {
    return (
      <Container>
        <Img src={this.props.images[0]} alt="main" />
        {!this.props.inStock && (
          <OutOfStockOverlay>out of stock</OutOfStockOverlay>
        )}
        {this.props.inCart && (
          <IconContainer>
            <Icon icon={faShoppingCart} />
          </IconContainer>
        )}
      </Container>
    )
  }
}

export default Image
