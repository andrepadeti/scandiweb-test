import styled, { css } from 'styled-components'

export const Button = styled.button`
  display: block;
  width: 12rem;
  padding-block: ${props => (props.small ? '8px' : '1rem')};

  background-color: var(--c-bg-light);
  color: var(--c-text);
  border: 1px solid var(--c-text);
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s;

  // hover for mouse devices and focus for tap devices
  &:hover,
  &:focus {
    background-color: var(--c-bg-light-hover);
  }
`

export const CTA = styled(Button)`
  background-color: var(--c-primary-disabled);
  border: var(--c-primary-disabled);
  color: var(--c-text-light);
  cursor: default;

  ${props =>
    props.stretch &&
    css`
      width: 100%;
    `}

  ${props =>
    props.active &&
    css`
      background-color: var(--c-primary);
      border: var(--c-primary);
      color: var(--c-text-light);
      cursor: pointer;

      &:hover, &:focus {
        background-color: var(--c-primary-hover);
      }
    `}
`
