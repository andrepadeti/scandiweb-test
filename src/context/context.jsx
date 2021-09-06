import * as React from 'react'

const Context = React.createContext()

export class GlobalContext extends React.Component {
  state = {
    currency: 'USD',
    categories: [],
    currentProduct: {},
    cart: [],
    showMiniCart: false,
  }

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

  setShowMiniCart = value => {
    this.setState({ showMiniCart: value })
  }

  render() {
    const { currency, categories, currentProduct, cart, showMiniCart } = this.state
    const { setCurrency, setCategories, setCurrentProduct, setCart, setShowMiniCart } = this
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
          showMiniCart,
          setShowMiniCart
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
