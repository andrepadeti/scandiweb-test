import * as React from 'react'
import styled from 'styled-components'

import ClickContainer from './click-container'

const Container = styled.div`
  flex: 0 0 30%;
  position: relative;
  user-select: none;
`

const Picture = styled.img`
  width: 100%;
  max-height: 350px;
  object-fit: scale-down;
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
    const multiplePictures = gallery.length > 1

    return (
      <Container>
        <Picture src={gallery[index]} />
        {multiplePictures && <ClickContainer handleClick={this.handleClick} />}
      </Container>
    )
  }
}

export default ImagesCarousel
