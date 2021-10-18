import * as React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router'

import logo from '../../images/logo.svg'

import NavCurrency from './nav-currency'
import NavCategories from './nav-categories'
import CartIcon from './cart-icon'

const Navbar = styled.nav`
  display: flex;
  align-content: center;

  padding-inline: 3rem;
  height: 5rem;
`

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  gap: 2rem;
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

const Nav = ({ categories }) => {
  const { pathname } = useLocation()

  return (
    <Navbar>
      <LeftSide>
        <NavCategories
          categories={categories}
          pathname={pathname.substring(1)}
        />
      </LeftSide>
      <Logo>
        <img src={logo} alt="our logo" />
      </Logo>
      <RightSide>
        <NavCurrency />
        <CartIcon />
      </RightSide>
    </Navbar>
  )
}

export default Nav
