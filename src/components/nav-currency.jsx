import React from 'react'
import styled from 'styled-components'
import parse from 'html-react-parser'
import OutsideClickHandler from 'react-outside-click-handler'

import Context from '../context/context'

import chevronDown from '../images/chevron-down.svg'
import chevronUp from '../images/chevron-up.svg'

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
  width: 6rem;
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

class NavCurrency extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { showDropDown: false }
  //   this.handleShowDropDown = this.handleShowDropDown.bind(this)
  //   this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
  //   this.handleOutsideClick = this.handleOutsideClick.bind(this)
  // }

  state = { showDropDown: false }
  static contextType = Context

  handleShowDropDown() {
    this.setState({ showDropDown: !this.state.showDropDown })
  }

  handleOutsideClick() {
    if (this.state.showDropDown) {
      this.setState({ showDropDown: !this.state.showDropDown })
    }
  }

  handleChangeCurrency(item) {
    const { setCurrency } = this.context
    setCurrency(item.currency)
    this.handleShowDropDown()
  }

  render() {
    const currencies = [
      { currency: 'USD', symbol: '&dollar;' },
      { currency: 'EUR', symbol: '&euro;' },
      { currency: 'JPY', symbol: '&#165;' },
    ]
    const { currency } = this.context
    const currencySymbol =
      currencies[currencies.findIndex(e => e.currency === currency)].symbol

    return (
      <Currency>
        <Container onClick={this.handleShowDropDown}>
          <p style={{ fontSize: '18px' }}>{parse(currencySymbol)}</p>
          <img src={this.state.showDropDown ? chevronUp : chevronDown} alt="" />
        </Container>
        <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
          {this.state.showDropDown && (
            <CurrencyDropDownMenu>
              {currencies.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => this.handleChangeCurrency(item)}
                >
                  {parse(item.symbol)} {item.currency}
                </MenuItem>
              ))}
            </CurrencyDropDownMenu>
          )}
        </OutsideClickHandler>
      </Currency>
    )
  }
}

export default NavCurrency
