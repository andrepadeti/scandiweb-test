import * as React from 'react'
import styled from 'styled-components'
import ImageGallery from 'react-image-gallery'

const Container = styled.div`
  flex: 0 0 30%;
`

class ImagesCarousel extends React.Component {
  render() {
    let galley = []
    this.props.gallery.forEach((image, index) => {
      galley[index] = {
        original: image,
        originalClass: 'thumbnails',
      }
    })
    return (
      <Container>
        <ImageGallery
          items={galley}
          infinite={false}
          lazyLoad={true}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          disableKeyDown={true}
          originalTitle="Test"
        />
      </Container>
    )
  }
}

export default ImagesCarousel
