import * as React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const Button = styled.button`
  // guarantee min size if button doesn't render any text
  ${props =>
    props.theme === 'product-details' &&
    css`
      min-height: 2rem;
      min-width: 2rem;
      padding-inline: 1rem;
      padding-block: 0.5rem;
    `}

  ${props =>
    props.theme === 'mini-cart' &&
    css`
      --size: 24px;
      min-height: var(--size);
      min-width: var(--size);
    `}
      
      
  cursor: pointer;
  background-color: ${props =>
    props.swatch ? props.value : 'var(--c-bg-light)'};
  color: hsla(0, 0%, 16%, 1);
  border: 1px solid #a6a6a6;
  /* transition: 0.2s; */

  &:hover {
    outline: ${props => props.swatch && '2px solid #c4c1c1'};
    /* background-color: ${props =>
      props.swatch || 'var(--c-bg-light-hover'};  */
  }

  ${props =>
    props.active &&
    css`
      background-color: ${!props.swatch && 'hsla(216, 8%, 12%, 1)'};
      color: white;
      outline: ${props.swatch && '2px solid #a6a6a6'};
    `}
`

const ButtonValue = styled.span`
  font-family: 'Source Sans Pro', sans-serif;
`

class ButtonGroup extends React.Component {
  handleClick(id) {
    this.props.setAttributes(id)
  }

  render() {
    const { product, attributeID, items, attributeType, clickedID, theme } =
      this.props
    // check whether this attribute is a swatch attribute
    const swatch = attributeType === 'swatch'
    return (
      <Container>
        {items.map((item, index) => (
          <Button
            theme={theme}
            key={'b' + index}
            swatch={swatch}
            value={item.value}
            onClick={() =>
              this.handleClick({
                attributeID,
                itemID: item.id,
                productID: product.id,
              })
            }
            active={clickedID === item.id}
          >
            <ButtonValue key={'bv' + index}>
              {!swatch && item.displayValue}
            </ButtonValue>
          </Button>
        ))}
      </Container>
    )
  }
}

export default ButtonGroup
