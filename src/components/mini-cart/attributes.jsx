import * as React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Attribute = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Box = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  --size: 24px;
  /* width: var(--size); */
  padding-inline: 0.3rem;
  height: var(--size);
  display: grid;
  place-content: center;

  border: 1px solid hsla(0, 0%, 65%, 1);
  color: hsla(0, 0%, 65%, 1);
  background-color: hsla(0, 0%, 65%, 0.2);

  ${props =>
    props.chosen &&
    css`
      border: 1px solid black;
      color: var(--c-text);
      background-color: var(--bg-light);
    `}
`

class Attributes extends React.Component {
  isChosen(attributeID, itemID, chosenAttributes) {
    
    // find this particular attribute in the list of chosen attributes
    const index = chosenAttributes.findIndex(
      item => item.attributeID === attributeID
    )

    // check whether this particular item is the item in the list of chosen attributes
    return (
      attributeID === chosenAttributes[index].attributeID &&
      itemID === chosenAttributes[index].itemID
    )
  }

  render() {
    const { attributes, chosenAttributes } = this.props

    return (
      <Container>
        {attributes.map((attribute, index) => (
          <Attribute key={index}>
            {attribute.items.map((item, index) => (
              <Box
                key={index}
                chosen={this.isChosen(attribute.id, item.id, chosenAttributes)}
              >
                {item.displayValue}
              </Box>
            ))}
          </Attribute>
        ))}
      </Container>
    )
  }
}

export default Attributes
