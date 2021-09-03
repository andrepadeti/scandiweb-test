import React from 'react'

const Context = React.createContext()

export class GlobalContext extends React.Component {
  state = { currency: 'USD', categories: [], currentProduct: {}, cart: [] }

  setCurrency = currency => {
    this.setState({ currency })
  }

  setCategories = categories => {
    this.setState({ categories })
  }

  setCurrentProduct = currentProduct => {
    this.setState({ currentProduct })
  }

  setCart = cart => {
    this.setState({ cart })
  }

  render() {
    const { currency, categories, currentProduct, cart } = this.state
    const { setCurrency, setCategories, setCurrentProduct, setCart } = this
    // console.log(setCurrency)

    return (
      <Context.Provider
        value={{
          currency,
          setCurrency,
          categories,
          setCategories,
          currentProduct,
          setCurrentProduct,
          cart,
          setCart,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
