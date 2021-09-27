import { gql } from '@apollo/client'

// queries for categories
export const CATEGORIES_QUERY = gql`
  query {
    categories {
      name
    }
  }
`

// queries for available currencies
export const CURRENCY_QUERY = gql`
  query {
    currencies
  }
`

// queries for all products in a certain category
export const PRODUCTS_QUERY = gql`
  query Products($category: String!) {
    category(input: { title: $category }) {
      products {
        id
      }
    }
  }
`

// queries for all products in all categories
export const ALL_PRODUCTS_QUERY = gql`
  query All {
    categories {
      name
      products {
        id
      }
    }
  }
`

// queries for product details
export const PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      gallery
      description
      inStock
      attributes {
        # disable apollo caching for attributes
        # apollo was mixing attributes for different products
        # this article explains it all:
        # https://kamranicus.com/graphql-apollo-object-caching/
        __typename @skip(if: true)
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency
        amount
      }
    }
  }
`
