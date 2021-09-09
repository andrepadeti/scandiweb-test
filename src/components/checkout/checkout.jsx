import * as React from 'react'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  place-content: center;
  height: 50vh;
`

class Checkout extends React.Component {
  render() {
    return (
      <Container>Checkout</Container>
    )
  }
}

export default Checkout