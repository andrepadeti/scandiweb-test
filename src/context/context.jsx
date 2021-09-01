import React from 'react'

const Context = React.createContext()

export class GlobalContext extends React.Component {
  state = { currency: 'USD', categories: [] }

  setCurrency = currency => {
    this.setState({ currency })
  }

  setCategories = categories => {
    this.setState({ categories })
  }

  render() {
    const { currency, categories } = this.state
    const { setCurrency, setCategories } = this
    // console.log(setCurrency)

    return (
      <Context.Provider
        value={{ currency, setCurrency, categories, setCategories }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
