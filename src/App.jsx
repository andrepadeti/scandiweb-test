import * as React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Toaster from './components/toast/toaster'
import MiniCart from './components/mini-cart/mini-cart'
import Category from './components/category/category'
import Nav from './components/nav/nav'
import Product from './components/product/product'
import Cart from './components/cart/cart'
import Checkout from './components/checkout/checkout'
import Loading from './components/loading/loading'
import ErrorBoundary from './components/ErrorBoundary'

import { GlobalContext } from './context/context'
import { CATEGORIES_QUERY } from './utils/queries'

// manipulates data into the right format for <Route path>
const convertCategoriesIntoRouteFormat = (categories, { component }) => {
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

const App = () => {
  const { loading, error, data } = useQuery(CATEGORIES_QUERY)

  if (loading) return <Loading />
  if (error) return <div>{error.toString()}</div>

  let { categories } = data
  // data object comes with preventExtensions. This is one way to remove it:
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
              to={convertCategoriesIntoRouteFormat(categories, {
                component: 'home page',
              })}
            />
          </Route>
          <Route
            exact
            path={convertCategoriesIntoRouteFormat(categories, {
              component: 'category',
            })}
          >
            <Category />
          </Route>
          <Route
            path={convertCategoriesIntoRouteFormat(categories, {
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

export default App
