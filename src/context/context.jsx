import React from 'react'

const Context = React.createContext()

export class GlobalContext extends React.Component {
  state = { currency: 'USD' }

  setCurrency = currency => {
    this.setState({ currency })
  }

  render() {
    const { currency } = this.state
    const { setCurrency } = this
    // console.log(setCurrency)

    return (
      <Context.Provider value={{ currency, setCurrency }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
