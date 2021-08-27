import React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBoxOpen,
  faDollarSign,
  faChevronDown,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'

const Navbar = styled.nav`
  display: flex;
  align-content: center;

  padding-inline: 3rem;
  height: 5rem;
`

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2rem;

  /* padding-block-end: 1rem; */
`

const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--c-primary);
`

const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 2rem;
`

const Session = styled.a`
  &:hover {
    color: var(--c-primary);
    border-bottom: 1px solid var(--c-primary);
    /* padding-block-end: 1rem;
    background-image: linear-gradient(90deg, var(--c-primary), var(--c-primary));
    background-size: 100% 2px;
    background-repeat: no-repeat;
    background-position: 0px 30px; */
  }
`

const Currency = styled.div`
  display: flex;
  /* align-items: end; */
  gap: 0.5rem;
`

class Nav extends React.Component {
  render() {
    return (
      <Navbar>
        <LeftSide>
          <Session href="/">WOMEN</Session>
          <Session href="/">MEN</Session>
          <Session href="/">KIDS</Session>
        </LeftSide>
        <Logo>
          <FontAwesomeIcon icon={faBoxOpen} size='2x' />
        </Logo>
        <RightSide>
          <Currency>
            {/* <FontAwesomeIcon icon={faDollarSign} /> */}
            <span>$</span>
            <FontAwesomeIcon icon={faChevronDown} size='sm' />
          </Currency>
          <div>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        </RightSide>
      </Navbar>
    )
  }
}

export default Nav
