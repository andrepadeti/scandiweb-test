import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Session = styled(Link)`
  display: flex;
  align-items: center;
  text-transform: uppercase;

  &:hover {
    font-weight: bold;
  }

  &:active {
    color: var(--c-primary);
    border-bottom: 1px solid var(--c-primary);
  }
`

class NavCategories extends React.Component {

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
            to={`/${category.name}`}
            className={currentPath === category.name && 'active-link'}
          >
            {category.name}
          </Session>
        ))}
      </>
    )
  }
}

export default NavCategories
