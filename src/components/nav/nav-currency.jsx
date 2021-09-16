import * as React from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { gql } from '@apollo/client'
import { graphql } from '@apollo/client/react/hoc'

import Context from '../../context/context'
import currencySymbol from '../utils/currencies'

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

const CurrencyDropDownMenu = styled.div`
  position: absolute;
  top: 150%;
  right: -50%;
  width: 7rem;
  display: flex;
  flex-direction: column;
  padding-block: 0.5rem;
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

const CURRENCY_QUERY = gql`
  query {
    currencies
  }
`

class NavCurrencyWithoutQuery extends React.Component {
  static contextType = Context
  state = { showDropDown: false }

  handleShowDropDown = () => {
    const { showDropDown } = this.state
    this.setState({ showDropDown: !showDropDown })
  }

  handleOutsideClick = () => {
    const { showDropDown } = this.state
    if (showDropDown) {
      this.setState({ showDropDown: !showDropDown })
    }
  }

  handleChangeCurrency = currency => {
    const { setCurrency } = this.context
    setCurrency(currency)
    this.handleShowDropDown()
  }

  render() {
    const { currency } = this.context
    const { data } = this.props

    if (data.loading) return <div>Loading...</div>
    if (data.error) return <div>Error</div>
    return (
      <Currency>
        <Container onClick={this.handleShowDropDown}>
          <p style={{ fontSize: '18px' }}>{currencySymbol(currency)}</p>
          <img src={this.state.showDropDown ? chevronUp : chevronDown} alt="" />
        </Container>
        <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
          {this.state.showDropDown && (
            <CurrencyDropDownMenu>
              {data.currencies.map((currency, index) => (
                <MenuItem
                  key={index}
                  onClick={() => this.handleChangeCurrency(currency)}
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
}

const withQuery = graphql(CURRENCY_QUERY)
const NavCurrency = withQuery(NavCurrencyWithoutQuery)
export default NavCurrency
