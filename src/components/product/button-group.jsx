import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`
const Button = styled.button`
  padding-inline: 1rem;
  padding-block: 0.5rem;
  background-color: ${props =>
    props.active ? 'hsla(216, 8%, 12%, 1)' : 'var(--c-bg-light)'};
  border: 1px solid #a6a6a6;
  color: ${props => (props.active ? 'white' : 'hsla(0, 0%, 16%, 1)')};
`

const ButtonValue = styled.span`
  font-family: 'Source Sans Pro', sans-serif;
`

class ButtonGroup extends React.Component {
  state = { clikedID: null }

  handleClick(id) {
    this.setState({ clikedID: id.itemID })
    this.props.setAttributes(id)
  }

  render() {
    const { attributeID } = this.props
    return (
      <Container>
        {this.props.items.map((item, index) => (
          <Button
            key={'b' + index}
            onClick={() => this.handleClick({ attributeID, itemID: item.id })}
            active={this.state.clikedID === item.id}
          >
            <ButtonValue key={'bv' + index}>{item.displayValue}</ButtonValue>
          </Button>
        ))}
      </Container>
    )
  }
}

export default ButtonGroup
