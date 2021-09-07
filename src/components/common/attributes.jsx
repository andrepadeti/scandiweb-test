import * as React from 'react'
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
          <React.Fragment key={'attr' + index}>
            <Attribute>{attribute.name}:</Attribute>
            <ButtonGroup
              attributeID={attribute.id}
              attributeType={attribute.type}
              items={attribute.items}
              setAttributes={this.props.setAttributes}
            />
          </React.Fragment>
        ))}
      </>
    )
  }
}

export default Attributes
