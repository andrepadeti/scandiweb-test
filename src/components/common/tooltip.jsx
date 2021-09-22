import * as React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  position: relative;
`

const Span = styled.span`
  --bg: hsl(0 0% 0% / 0.1);
  position: absolute;
  top: 130%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  visibility: ${props => (props.show ? 'visible' : 'hidden')};

  padding: 5px 1rem;
  inline-size: max-content;
  text-align: center;
  border-radius: 6px;
  background-color: var(--bg);

  ${props =>
    props.arrow &&
    css`
      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: 50%; /* To the right of the tooltip */
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent var(--bg) transparent;
      }
    `}
`

class Tooltip extends React.Component {
  state = { show: false }

  render() {
    const { className, children, text, arrow, disabled, ...rest } = this.props
    const { show } = this.state

    if (disabled) return <>{children}</>
    return (
      <Container>
        <Span className={className} show={show} arrow={arrow}>
          {text}
        </Span>
        <div
          onMouseEnter={() => this.setState({ show: true })}
          onMouseLeave={() => this.setState({ show: false })}
          {...rest}
        >
          {children}
        </div>
      </Container>
    )
  }
}

export default Tooltip
