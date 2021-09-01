import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'

// import CategoriesQuery from './components/categoriesQuery'
import Gallery from './components/gallery'
import Nav from './components/nav'

import { GlobalContext } from './context/context'

const CATEGORIES_QUERY = gql`
  query {
    categories {
      name
    }
  }
`

class App extends React.Component {
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
                <Route path="/:category">
                  <Gallery />
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
