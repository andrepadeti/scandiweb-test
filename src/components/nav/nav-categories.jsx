import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const SessionLink = styled(Link)`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: var(--c-text);

  &:hover {
    font-weight: bold;
  }

  ${props => {
    if (props.$active) {
      if (props.$mobile) {
        return css`
          font-weight: bold;
        `
      } else {
        return css`
          color: var(--c-primary);
          border-bottom: 1px solid var(--c-primary);
        `
      }
    }
  }}
`

class NavCategories extends React.Component {
  handleCategoryClick() {
    return null
  }

  render() {
    const { pathname, categories, mobile, handleClick } = this.props

    return (
      <>
        {categories.map((category, index) => (
          <SessionLink
            onClick={handleClick}
            key={index}
            to={`/${category.name}`}
            $active={pathname === category.name}
            $mobile={mobile}
          >
            {category.name}
          </SessionLink>
        ))}
      </>
    )
  }
}

export default NavCategories
