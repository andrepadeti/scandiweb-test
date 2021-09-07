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
    const { attributes, chosenAttributes } = this.props
    return (
      <>
        {attributes.map((attribute, index) => {
          // find the right chosenAttribute to pass
          const chosenAttributeIndex = chosenAttributes.findIndex(
            item => item.attributeID === attribute.id
          )
          let clickedID
          if (chosenAttributeIndex === -1) {
            clickedID = null
          } else {
            clickedID = chosenAttributes[chosenAttributeIndex].itemID
          }
          console.log(clickedID)

          return (
            <React.Fragment key={'attr' + index}>
              <Attribute>{attribute.name}:</Attribute>
              <ButtonGroup
                attributeID={attribute.id}
                attributeType={attribute.type}
                items={attribute.items}
                clickedID={clickedID}
                setAttributes={this.props.setAttributes}
              />
            </React.Fragment>
          )
        })}
      </>
    )
  }
}

export default Attributes
