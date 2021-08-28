import React from 'react'
import styled from 'styled-components'
import GalleryItem from './gallery-item'

const Container = styled.section`
  padding-inline: 3rem;
  padding-block-start: 3rem;
`

const Grid = styled.div`
  --min-width: 22rem;

  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, 395px);
  padding-block-end: 3rem;
`

const Title = styled.h1`
  margin-block-end: 5rem;
`

class Gallery extends React.Component {
  render() {
    return (
      <Container>
        <Title>Category Name</Title>
        <Grid>
          <GalleryItem />
          <GalleryItem />
          <GalleryItem />
          <GalleryItem />
          <GalleryItem selected />
        </Grid>
      </Container>
    )
  }
}

export default Gallery
