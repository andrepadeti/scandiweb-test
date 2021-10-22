import * as React from 'react'
import styled, { css } from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { useQuery } from '@apollo/client'

import Context from '../../context/context'
import currencySymbol from '../../utils/currencies'
import { CURRENCY_QUERY } from '../../utils/queries'

import chevronDown from '../../images/chevron-down.svg'
import chevronUp from '../../images/chevron-up.svg'

const Currency = styled.div`
  position: relative;
`

const Container = styled.div`
  display: flex;
  gap: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`
const P = styled.p`
  font-size: 18px;
`

const CurrencyDropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 0.5rem;

  ${props => {
    if (props.mobile) {
      return css`
        gap: 1em;
      `
    } else {
      return css`
        position: absolute;
        z-index: 1;
        top: 150%;
        right: -50%;
        width: 8rem;
        box-shadow: 0px 0px 15px hsla(210, 5%, 67%, 0.6);
        background-color: var(--c-bg-light);
        font-size: 18px;
      `
    }
  }}
`

const MenuItem = styled.div`
  padding-block: 0.5rem;
  padding-inline: ${props => (props.mobile ? '' : '1em')};
  font-weight: ${props => props.active && 'bold'};

  &:hover {
    cursor: pointer;
    color: var(--c-primary);
    background-color: hsl(255 0% 0% / 0.03);
  }
`
const CurrencyTitle = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  text-transform: uppercase;
  margin-block-end: 1rem; ;
`

const NavCurrency = ({
  isMobile,
  handleClick = () => {},
  // showCurrencyDropDown,
  // setShowCurrencyDropDown,
}) => {
  // console.log(showCurrencyDropDown)
  const { currency, setCurrency } = React.useContext(Context)
  const [showCurrencyDropDown, setShowCurrencyDropDown] = React.useState(false)

  const { loading, error, data } = useQuery(CURRENCY_QUERY)

  const handleShowDropDown = () => {
    setShowCurrencyDropDown(prevState => !prevState)
  }

  const handleOutsideClick = () => {
    setShowCurrencyDropDown(false)
  }

  const handleChangeCurrency = newCurrency => {
    setCurrency(newCurrency)
    handleShowDropDown()
    handleClick()
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  return (
    <Currency>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <Container onClick={handleShowDropDown}>
          {isMobile ? (
            <CurrencyTitle>Change Currency</CurrencyTitle>
          ) : (
            <>
              <P>{currencySymbol(currency)}</P>
              <img
                src={showCurrencyDropDown ? chevronUp : chevronDown}
                alt=""
              />
            </>
          )}
        </Container>
        {showCurrencyDropDown && (
          <CurrencyDropDownMenu mobile={isMobile}>
            {data.currencies.map((_currency, index) => (
              <MenuItem
                mobile={isMobile}
                key={index}
                onClick={() => handleChangeCurrency(_currency)}
                active={currency === _currency}
              >
                {currencySymbol(_currency) + ` ${_currency}`}
              </MenuItem>
            ))}
          </CurrencyDropDownMenu>
        )}
      </OutsideClickHandler>
    </Currency>
  )
}

export default NavCurrency
