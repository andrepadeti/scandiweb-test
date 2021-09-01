import React from 'react'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

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
  text-transform: capitalize;
`

const PRODUCTS_QUERY = gql`
  query Products($title: String!) {
    category(input: { title: $title }) {
      products {
        id
      }
    }
  }
`

class GalleryWithoutRouter extends React.Component {
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired,
  // }

  render() {
    const { match } = this.props
    const category = match.params.category

    return (
      <Container>
        <Title>{category}</Title>
        <Query query={PRODUCTS_QUERY} variables={{ title: category }}>
          {({ data, loading, error }) => {
            // console.log(data)
            if (loading) return <div>Loading</div>
            if (error) return <div>Error</div>
            return (
              <Grid>
                {data.category.products.map((product, index) => (
                  <GalleryItem key={index} product={product} />
                ))}
              </Grid>
            )
          }}
        </Query>
      </Container>
    )
  }
}

const Gallery = withRouter(GalleryWithoutRouter)
export default Gallery
