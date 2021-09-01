import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

import logo from '../images/logo.svg'
import shoppingCart from '../images/shopping-cart.svg'

import NavCurrency from './nav-currency'
import NavCategories from './nav-categories'

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
  display: flex;
  align-items: center;

  &:hover {
    color: var(--c-primary);
    border-bottom: 1px solid var(--c-primary);
  }
`

class NavWithoutRouter extends React.Component {
  render() {
    //get current pathname
    const pathname = this.props.location.pathname.substring(1)

    return (
      <Navbar>
        <LeftSide>
          <NavCategories
            categories={this.props.categories}
            currentPath={pathname}
          />

          {/* <Session href="/">WOMEN</Session>
          <Session href="/">MEN</Session>
          <Session href="/">KIDS</Session> */}
        </LeftSide>
        <Logo>
          <img src={logo} alt="our logo" />
        </Logo>
        <RightSide>
          <NavCurrency />
          <div>
            <img src={shoppingCart} alt="" />
          </div>
        </RightSide>
      </Navbar>
    )
  }
}

const Nav = withRouter(NavWithoutRouter)
export default Nav
