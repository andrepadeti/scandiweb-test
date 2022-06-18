import * as React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
`

const SideArrows = styled.div`
  flex-basis: 30%;
  display: grid;
  place-content: center;
  color: hsl(216 8% 12% / 0.5);
  transition: all 0.2s;

  &:hover {
    color: var(--c-primary-hover);
    cursor: pointer;
    transform: scale(1.1);
  }
`

const LeftSide = styled(SideArrows)``

const RightSide = styled(SideArrows)``

class ClickContainer extends React.Component {
  render() {
    const { handleClick } = this.props
    return (
      <Container>
        <LeftSide onClick={() => handleClick({ action: 'decrease' })}>
          <FontAwesomeIcon icon={faChevronLeft} size="4x" />
        </LeftSide>
        <RightSide onClick={() => handleClick({ action: 'increase' })}>
          <FontAwesomeIcon icon={faChevronRight} size="4x" />
        </RightSide>
      </Container>
    )
  }
}

export default ClickContainer
