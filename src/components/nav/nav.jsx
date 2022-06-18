import * as React from 'react'
import styled, { css } from 'styled-components'
import { useLocation } from 'react-router'
import { useMediaQuery } from '../../utils/media-query'
import { device } from '../../styles/device'
import Context from '../../context/context'

import logo from '../../images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

import NavCurrency from './nav-currency'
import NavCategories from './nav-categories'
import CartIcon from './cart-icon'

const Navbar = styled.nav`
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;

  display: flex;
  /* align-items: center; */

  --padding: 3em;
  padding-inline: var(--padding);
  height: 5em;

  backdrop-filter: blur(5px);
  background-color: hsla(0, 0%, 100%, 0.9);

  ${props =>
    props.isMobile &&
    css`
      padding-inline: 1em;
      height: 4em;
    `}

  ${props => {
    if (props.showMiniCart) {
      return css`
        // since the nav is position: fixed, i have to
        // prevent horizontal reflow when scrollbar is hidden
        // here, as well as in the body
        padding-inline-end: calc(var(--padding) + 15px);
      `
    }
  }}
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
// center one and right/left align other flexbox element
// https://stackoverflow.com/questions/38948102/center-one-and-right-left-align-other-flexbox-element
const IconContainer = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;

  ${props => {
    if (props.right) {
      return css`
        right: 2em;
        top: 55%;
      `
    }
  }}
`

const Drawer = styled.div`
  --drawer-size: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  width: var(--drawer-size);
  height: 100vh;
  transform: translateX(calc(var(--drawer-size) * -1));
  /* background-color: var(--c-primary-background); */
  background: linear-gradient(
    to right,
    var(--c-primary-background),
    var(--c-primary-background) 70%,
    hsl(0 0% 0% / 0) 70%,
    hsl(0 0% 0% / 0)
  );
  padding-inline: 1em;
  transition: all 0.3s ease;

  ${props =>
    props.showDrawer &&
    css`
      transform: translate(0);
    `}
`

const CloseButtonContainer = styled.div`
  position: relative;
  height: 4em;
`

const CloseButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const MenuContainer = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const CategoriesTitle = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  text-transform: uppercase;
`

const Nav = ({ categories }) => {
  const { pathname } = useLocation()
  const isMobile = useMediaQuery(device.mobile)
  const [showDrawer, setShowDrawer] = React.useState(false)
  const { showMiniCart } = React.useContext(Context)

  const handleClick = () => {
    // it's said this won't work on iOS:
    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    if (showDrawer) {
      document.body.classList.remove('overflow-hidden')
    } else {
      document.body.classList.add('overflow-hidden')
    }
    setShowDrawer(prevState => !prevState)
  }

  const renderMobile = () => {
    return (
      <>
        <Drawer showDrawer={showDrawer}>
          <CloseButtonContainer>
            <CloseButton icon={faTimes} size="2x" onClick={handleClick} />
          </CloseButtonContainer>
          <MenuContainer>
            <CategoriesTitle>Categories</CategoriesTitle>
            <NavCategories
              categories={categories}
              pathname={pathname.substring(1)}
              mobile={true}
              handleClick={handleClick}
            />
            <div style={{ marginBlock: '0.5em' }}></div>
            <NavCurrency isMobile={true} handleClick={handleClick} />
          </MenuContainer>
        </Drawer>
        <Navbar
          isMobile={isMobile}
          showDrawer={showDrawer}
          showMiniCart={showMiniCart}
        >
          <IconContainer left>
            <FontAwesomeIcon icon={faBars} size="2x" onClick={handleClick} />
          </IconContainer>
          <Logo>
            <img src={logo} alt="our logo" />
          </Logo>
          <IconContainer right>
            <CartIcon isMobile={isMobile} />
          </IconContainer>
        </Navbar>
      </>
    )
  }

  const renderDesktop = () => {
    return (
      <Navbar
        isMobile={isMobile}
        showDrawer={showDrawer}
        showMiniCart={showMiniCart}
      >
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

  return <>{isMobile ? renderMobile() : renderDesktop()}</>
}

export default Nav
