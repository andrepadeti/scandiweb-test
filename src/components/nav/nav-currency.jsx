import * as React from 'react'
import styled from 'styled-components'
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
  position: absolute;
  z-index: 1;
  top: 150%;
  right: -50%;
  width: 7rem;
  display: flex;
  flex-direction: column;
  padding-block: 0.5rem;
  background-color: var(--c-bg-light);
  box-shadow: 0px 0px 15px hsla(210, 5%, 67%, 0.6);

  font-size: 18px;
`

const MenuItem = styled.div`
  padding-block: 0.5rem;
  padding-inline: 1rem;

  &:hover {
    cursor: pointer;
    color: var(--c-primary);
    background-color: hsl(255 0% 0% / 0.03);
  }
`

const NavCurrency = () => {
  const { currency, setCurrency } = React.useContext(Context)
  const [show, setShow] = React.useState(false)

  const { loading, error, data } = useQuery(CURRENCY_QUERY)

  const handleShowDropDown = () => {
    setShow(prevState => !prevState)
  }

  const handleOutsideClick = () => {
    setShow(false)
  }

  const handleChangeCurrency = newCurrency => {
    setCurrency(newCurrency)
    handleShowDropDown()
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  return (
    <Currency>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <Container onClick={handleShowDropDown}>
          <P>{currencySymbol(currency)}</P>
          <img src={show ? chevronUp : chevronDown} alt="" />
        </Container>
        {show && (
          <CurrencyDropDownMenu>
            {data.currencies.map((currency, index) => (
              <MenuItem
                key={index}
                onClick={() => handleChangeCurrency(currency)}
              >
                {currencySymbol(currency) + ` ${currency}`}
              </MenuItem>
            ))}
          </CurrencyDropDownMenu>
        )}
      </OutsideClickHandler>
    </Currency>
  )
}

export default NavCurrency
