import React from 'react'
import styled from 'styled-components'
import GalleryItem from './gallery-item'



const Container = styled.section`
  padding-inline: 3rem;
  padding-block-start: 3rem;
`

const Title = styled.h1`

`

class Gallery extends React.Component {

  render() {
    return (
      <Container>
        <Title>Category Name</Title>
        <GalleryItem />
      </Container>
    )
  }
}

export default Gallery