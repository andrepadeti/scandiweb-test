import React from 'react'
import styled, { css } from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import pic from '../images/clothing.jpg'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 24rem;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

class GalleryItemImage extends React.Component {
  render() {
    return (
      <Container>
        <Image src={pic} alt="item of clothing" />
        {this.props.selected && (
          <IconContainer>
            <Icon icon={faShoppingCart} />
          </IconContainer>
        )}
      </Container>
    )
  }
}

export default GalleryItemImage
