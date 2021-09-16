import * as React from 'react'
import styled from 'styled-components'

import ClickContainer from './click-container'

const Container = styled.div`
  flex: 0 0 30%;
  position: relative;
`

const Picture = styled.img`
  /* width: 100%; */
  /* height: 350px; */
  object-fit: cover;
`

class ImagesCarousel extends React.Component {
  state = { index: 0 }

  handleClick = ({ action }) => {
    const { gallery } = this.props
    const { index } = this.state

    let newIndex
    switch (action) {
      case 'increase':
        newIndex = (index + 1) % gallery.length
        break
      case 'decrease':
        if (index === 0) {
          newIndex = gallery.length - 1
        } else {
          newIndex = index - 1
        }
        break
      default:
        return
    }

    this.setState({ index: newIndex })
  }

  render() {
    const { index } = this.state
    const { gallery } = this.props
    console.log(gallery)

    // if (!picture) return null
    return (
      <Container>
        <Picture src={gallery[index]} />
        <ClickContainer handleClick={this.handleClick} />
      </Container>
    )
  }
}

export default ImagesCarousel

/* 
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
        */
