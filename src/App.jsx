import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { withRouter } from 'react-router'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'

// import CategoriesQuery from './components/categoriesQuery'
import Category from './components/category/category'
import Nav from './components/nav/nav'
import ProductDetails from './components/product/product-details'

import { GlobalContext } from './context/context'

const CATEGORIES_QUERY = gql`
  query {
    categories {
      name
    }
  }
`

class App extends React.Component {
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
      default:
    }
    return formattedData
  }

  render() {
    return (
      <GlobalContext>
        <Query query={CATEGORIES_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>
            if (error) return <div>Error</div>
            return (
              <Router>
                <Nav categories={data.categories} />
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
                  <ProductDetails />
                </Route>
              </Router>
            )
          }}
        </Query>
      </GlobalContext>
    )
  }
}

export default App
