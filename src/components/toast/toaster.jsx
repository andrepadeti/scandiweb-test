import * as React from 'react'
import styled, { css } from 'styled-components'

import Context from '../../context/context'

const ToastsContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`

const OutsideBorder = styled.div`
  margin-block-end: 1rem;
  padding: 0.5rem;
  background-color: var(--c-primary);
  border-radius: 0.2rem;
  --shadow-color: hsl(216 8% 12% / 0.2);
  box-shadow: 1px 2px 2px var(--shadow-color), 2px 4px 4px var(--shadow-color),
    3px 6px 6px var(--shadow-color);

  ${props =>
    props.type === 'error' &&
    css`
      background-color: var(--c-error);
    `}
`

const Inside = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid var(--c-text-light);
  border-radius: 0.2rem;
`

const Message = styled.p`
  color: var(--c-text-light);
  font-weight: 500;
`

class Toaster extends React.Component {
  static contextType = Context

  render() {
    const { toasts } = this.context
    return (
      <ToastsContainer>
        {toasts.map((toast, index) => (
          // type === 'success' is the default type
          <OutsideBorder key={index} type={toast.type || 'success'}>
            <Inside type={toast.type || 'success'}>
              <Message>{toast.message}</Message>
            </Inside>
          </OutsideBorder>
        ))}
      </ToastsContainer>
    )
  }
}

export default Toaster
