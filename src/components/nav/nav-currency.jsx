import React from 'react'
import styled from 'styled-components'
// import parse from 'html-react-parser'
import OutsideClickHandler from 'react-outside-click-handler'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import Context from '../../context/context'

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

const CURRENCY_QUERY = gql`
  query {
    currencies
  }
`

class NavCurrency extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showDropDown: false }
    this.handleShowDropDown = this.handleShowDropDown.bind(this)
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  static contextType = Context

  handleShowDropDown() {
    this.setState({ showDropDown: !this.state.showDropDown })
  }

  handleOutsideClick() {
    if (this.state.showDropDown) {
      this.setState({ showDropDown: !this.state.showDropDown })
    }
  }

  handleChangeCurrency(currency) {
    const { setCurrency } = this.context
    setCurrency(currency)
    this.handleShowDropDown()
  }

  render() {
    const { currency } = this.context

    return (
      <Query query={CURRENCY_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error</div>
          return (
            <Currency>
              <Container onClick={this.handleShowDropDown}>
                <p style={{ fontSize: '18px' }}>{currency}</p>
                <img
                  src={this.state.showDropDown ? chevronUp : chevronDown}
                  alt=""
                />
              </Container>
              <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
                {this.state.showDropDown && (
                  <CurrencyDropDownMenu>
                    {data.currencies.map((currency, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => this.handleChangeCurrency(currency)}
                      >
                        {/* {parse(item.symbol)} {item.currency} */}
                        {currency}
                      </MenuItem>
                    ))}
                  </CurrencyDropDownMenu>
                )}
              </OutsideClickHandler>
            </Currency>
          )
        }}
      </Query>
    )
  }
}

export default NavCurrency
