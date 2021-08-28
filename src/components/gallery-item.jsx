import React from 'react'
import styled, { css } from 'styled-components'

import GalleryItemImage from './gallery-item-image'


const Card = styled.div`
  padding: 1rem;

  ${props =>
    props.selected &&
    css`
      box-shadow: 0px 0px 35px hsla(210, 5%, 67%, 0.6);
    `}
`
const ItemName = styled.h2`
  margin-block-start: 2rem;
  font-size: 18px;
`

const ItemPrice = styled.p`
  margin-block-start: 0.5rem;
  font-size: 18px;
  font-weight: 500;
`

class GalleryItem extends React.Component {
  render() {
    return (
      <Card selected={this.props.selected}>
        <GalleryItemImage selected={this.props.selected}/>
        <ItemName>Apollo Running Short</ItemName>
        <ItemPrice>$50.00</ItemPrice>
      </Card>
    )
  }
}

export default GalleryItem
