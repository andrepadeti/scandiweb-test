import * as React from 'react'
import styled, { css } from 'styled-components'

import ButtonGroup from './button-group'

const Attribute = styled.h3`
  font-family: 'Roboto Condensed', sans-serif;
  text-transform: uppercase;

  ${props =>
    props.theme === 'product-details' &&
    css`
      margin-block-start: 2rem;
      margin-block-end: 0.2rem;
      font-size: 18px;
    `}

  ${props =>
    props.theme === 'mini-cart' &&
    css`
      margin-block-start: 0.4rem;
      margin-block-end: 0.2rem;
      font-size: 12px;
    `}
`

class Attributes extends React.Component {
  render() {
    const { product, setAttributes, theme } = this.props
    return (
      <>
        {product.attributes.map((attribute, index) => {
          // find the right chosenAttribute to pass
          const chosenAttributeIndex = product.chosenAttributes.findIndex(
            item => item.attributeID === attribute.id
          )
          let clickedID
          if (chosenAttributeIndex === -1) {
            clickedID = null
          } else {
            clickedID = product.chosenAttributes[chosenAttributeIndex].itemID
          }

          return (
            <React.Fragment key={'attr' + index}>
              <Attribute theme={theme}>{attribute.name}:</Attribute>
              <ButtonGroup
                theme={theme}
                product={product}
                attributeID={attribute.id}
                attributeType={attribute.type}
                items={attribute.items}
                clickedID={clickedID}
                setAttributes={setAttributes}
              />
            </React.Fragment>
          )
        })}
      </>
    )
  }
}

export default Attributes
