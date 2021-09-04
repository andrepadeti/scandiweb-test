import React from 'react'
import styled from 'styled-components'
// import ImageGallery from 'react-image-gallery'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 22rem;
`
// const Image = styled(ImageGallery)`
//   position: relative;
// `

const Image = styled.img`
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
  /* font-weight: bold; */
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

class ImagesCarousel extends React.Component {
  render() {
    let images = []
    this.props.images.forEach((image, index) => {
      images[index] = {
        original: image,
        // originalHeight: '100%',
        // originalWidth: '100%',
        originalClass: 'thumbnails',
      }
    })
    return (
      <Container>

        <Image src={this.props.images[0]} alt='main' />

        {/* <Image
          items={images}
          infinite={false}
          lazyLoad={true}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          disableKeyDown={true}
          originalTitle="Test"
          // showIndex={true}
        /> */}
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

export default ImagesCarousel
