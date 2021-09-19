import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SessionLink = styled(Link)`
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
    const { pathname, categories } = this.props

    return (
      <>
        {categories.map((category, index) => (
          <SessionLink
            key={index}
            to={`/${category.name}`}
            className={pathname === category.name && 'active-link'}
          >
            {category.name}
          </SessionLink>
        ))}
      </>
    )
  }
}

export default NavCategories
