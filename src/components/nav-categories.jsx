import React from 'react'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import { Link } from 'react-router-dom'

const Session = styled(Link)`
  display: flex;
  align-items: center;
  text-transform: uppercase;

  &:hover {
    /* font-weight: bold; */
    color: var(--c-primary);
    border-bottom: 1px solid var(--c-primary);
  }

  &:link:active {
    color: var(--c-primary);
    border-bottom: 1px solid var(--c-primary);
  }
`

class NavCategories extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { selected: 0 }
  //   this.handleCategoryClick = this.handleCategoryClick.bind(this)
  // }

  // static contextType = Context

  handleCategoryClick() {
    return null
  }

  render() {
    const currentPath = this.props.currentPath

    return (
      <>
        {this.props.categories.map((category, index) => (
          <Session
            key={index}
            to={`${category.name}`}
            className={currentPath === category && 'active'}
          >
            {category.name}
          </Session>
        ))}
      </>
    )
  }
}

export default NavCategories