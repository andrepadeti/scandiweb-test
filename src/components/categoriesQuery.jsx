/* 
try everything i could to move the query here instead of doing the query in the app component 
but couldn't make it work :-( 
*/

import React from 'react'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'

import Context from '../context/context'

const CATEGORIES_QUERY = gql`
  query {
    categories {
      name
    }
  }
`

class CategoriesQuery extends React.Component {
  constructor(props) {
    super(props)
    this.handleSetCategories = this.handleSetCategories.bind(this)
  }

  static contextType = Context

  handleSetCategories = categories => {
    const { setCategories } = this.context

    /* this line throws error - too many renders */
    setCategories(categories)
  }

  render() {
    return (
      <Query query={CATEGORIES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>
          this.handleSetCategories(data.categories)
          return this.props.children
        }}
      </Query>
    )
  }
}

export default CategoriesQuery
