import * as React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { graphql } from '@apollo/client/react/hoc'

import Toaster from './components/toast/toaster'
import ErrorBoundary from './components/ErrorBoundary'
import MiniCart from './components/mini-cart/mini-cart'
import Category from './components/category/category'
import Nav from './components/nav/nav'
import Product from './components/product/product'
import Cart from './components/cart/cart'
import Checkout from './components/checkout/checkout'

import { GlobalContext } from './context/context'
import {CATEGORIES_QUERY} from './utils/queries'

class AppWithoutQuery extends React.Component {
  // manipulates data into the right format for <Route path>
  convertCategoriesIntoRouteFormat(categories, { component }) {
    let formattedData = []
    switch (component) {
      case 'category':
        categories.forEach((category, index) => {
          formattedData[index] = `/${category.name}`
        })
        break
      case 'product':
        categories.forEach((category, index) => {
          formattedData[index] = `/${category.name}/:product`
        })
        break
      case 'home page':
        categories.forEach((category, index) => {
          formattedData[index] = `/${category.name}`
        })
        return formattedData[0]
      default:
    }
    return formattedData
  }

  render() {
    const { data } = this.props
    if (data.loading) return <div>Loading...</div>
    if (data.error) return <div>{data.error.toString()}</div>

    // data comes with preventExtensions. This is one way to remove it:
    let { categories } = data
    categories = Object.assign([], categories)
    // now I can add elements to it
    categories.unshift({ name: 'all' })

    return (
      <ErrorBoundary>
        <GlobalContext>
          <Toaster />
          <Router>
            <Nav categories={categories} />
            <MiniCart />
            <Route exact path="/">
              {/* redirects to the first category in the list */}
              <Redirect
                to={this.convertCategoriesIntoRouteFormat(categories, {
                  component: 'home page',
                })}
              />
            </Route>
            <Route
              exact
              path={this.convertCategoriesIntoRouteFormat(categories, {
                component: 'category',
              })}
            >
              <Category />
            </Route>
            <Route
              path={this.convertCategoriesIntoRouteFormat(categories, {
                component: 'product',
              })}
            >
              <Product />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
          </Router>
        </GlobalContext>
      </ErrorBoundary>
    )
  }
}

const withQuery = graphql(CATEGORIES_QUERY)
const App = withQuery(AppWithoutQuery)
export default App
