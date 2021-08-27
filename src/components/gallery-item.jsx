import React from 'react'
import styled from 'styled-components'

import pic from '../images/clothing.jpg'

const Card = styled.div`
  padding: 1rem;
`


class GalleryItem extends React.Component {

  render() {
    return (
      <Card>
        <img src={pic} alt='item of clothing' />
      </Card>
    )

  }
}

export default GalleryItem