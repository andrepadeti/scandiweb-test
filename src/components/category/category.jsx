import { useLocation } from 'react-router'
import styled from 'styled-components'

import ProductsGrid from './products-grid'

const Container = styled.section`
  padding-inline: 3rem;
  padding-block-start: 3rem;
`

const Title = styled.h1`
  margin-block-end: 5rem;
  text-transform: capitalize;
`

const Category = () => {
  const { pathname } = useLocation()
  // clean the slash in the beginning of the string
  const category = pathname.substring(1)

  return (
    <Container>
      <Title>{category}</Title>
      <ProductsGrid category={category} />
    </Container>
  )
}

export default Category
