import * as React from 'react'
import styled, { css } from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import Tooltip from '../common/tooltip'

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
  inset: 0;
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
  background-color: var(--c-primary-disabled);
  cursor: pointer;
  transition: all 0.2s ease;

  ${props =>
    props.inStock &&
    css`
      background-color: var(--c-primary);
      &:hover {
        background-color: var(--c-primary-hover);
      }
    `}
`

const Icon = styled(FontAwesomeIcon)`
  color: var(--c-text-light);
`

const TooltipStyled = styled(Tooltip)`
  top: 2rem;
  left: calc(100% - 2.5rem);

  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
`

class Image extends React.Component {
  render() {
    const { images, handleClick, inStock } = this.props
    
    return (
      <Container>
        <Img src={images[0]} alt="main" />
        {!inStock && <OutOfStockOverlay>out of stock</OutOfStockOverlay>}
        <TooltipStyled text="add to cart" disabled={!inStock}>
          <IconContainer onClick={handleClick} inStock={inStock}>
            <Icon icon={faShoppingCart} />
          </IconContainer>
        </TooltipStyled>
      </Container>
    )
  }
}

export default Image
