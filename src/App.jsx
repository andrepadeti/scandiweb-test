import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import { withRouter } from 'react-router'
import { gql } from '@apollo/client'
import { graphql } from '@apollo/client/react/hoc'

// import CategoriesQuery from './components/categoriesQuery'
import Category from './components/category/category'
import Nav from './components/nav/nav'
import Product from './components/product/product'

import { GlobalContext } from './context/context'

const CATEGORIES_QUERY = gql`
  query {
    categories {
      name
    }
  }
`

class AppWithoutQuery extends React.Component {
  // manipulates data into the right format for <Route path>
  convertDataIntoRouteFormat(data, { component }) {
    let formattedData = []
    switch (component) {
      case 'category':
        data.categories.forEach((category, index) => {
          formattedData[index] = `/${category.name}`
        })
        break
      case 'product':
        data.categories.forEach((category, index) => {
          formattedData[index] = `/${category.name}/:product`
        })
        break
      case 'home page':
        data.categories.forEach((category, index) => {
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
    return (
      <GlobalContext>
        <Router>
          <Nav categories={data.categories} />
          <Route exact path="/">
            {/* redirects to the first category in the list */}
            <Redirect
              to={this.convertDataIntoRouteFormat(data, {
                component: 'home page',
              })}
            />
          </Route>
          <Route
            exact
            path={this.convertDataIntoRouteFormat(data, {
              component: 'category',
            })}
          >
            <Category />
          </Route>
          <Route
            path={this.convertDataIntoRouteFormat(data, {
              component: 'product',
            })}
          >
            <Product />
          </Route>
        </Router>
      </GlobalContext>
    )
  }
}

const withQuery = graphql(CATEGORIES_QUERY)
const App = withQuery(AppWithoutQuery)
export default App
