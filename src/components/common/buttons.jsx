import styled from 'styled-components'

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
`

export const CTA = styled(Button)`
  background-color: ${props =>
    props.active ? 'var(--c-primary)' : 'var(--c-primary-disabled)'};
  border: ${props =>
    props.active ? 'var(--c-primary)' : 'var(--c-primary-disabled)'};
  color: var(--c-text-light);
  cursor: ${props => (props.active ? 'pointer' : 'default')};
`
