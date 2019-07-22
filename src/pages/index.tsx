import React from "react"
import PageLayout from "../components/PageLayout"
import { graphql } from "gatsby"

export default () => <PageLayout></PageLayout>

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { fields: frontmatter___date }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
