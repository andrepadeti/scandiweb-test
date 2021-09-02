import React from 'react'
import styled from 'styled-components'

import ButtonGroup from './button-group'

const Attribute = styled.h3`
  margin-block-start: 2rem;
  margin-block-end: 0.2rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
`

class Attributes extends React.Component {
  render() {
    return (
      <>
        {this.props.attributes.map((attribute, index) => (
          <>
            <Attribute key={'attr'+(index)}>{attribute.name}:</Attribute>
            <ButtonGroup key={'bg'+index} items={attribute.items} />
          </>
        ))}
      </>
    )
  }
}

export default Attributes
