import * as React from 'react'

const Context = React.createContext()

export class GlobalContext extends React.Component {
  state = {
    currency: 'USD',
    categories: [],
    currentProduct: {},
    cart: [],
    showMiniCart: false,
    toasts: [],
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

  toast = toast => {
    const { toasts } = this.state
    let newToasts = toasts
    newToasts.push(toast)
    this.setState({ toasts: newToasts })
    setTimeout(() => {
      const { toasts } = this.state
      let newToasts = toasts
      newToasts.shift()
      this.setState({ toasts: newToasts })
    }, 2500)
  }

  render() {
    const { currency, categories, currentProduct, cart, showMiniCart, toasts } =
      this.state
    const {
      setCurrency,
      setCategories,
      setCurrentProduct,
      setCart,
      setShowMiniCart,
      toast,
    } = this

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
          setShowMiniCart,
          toasts,
          toast,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
