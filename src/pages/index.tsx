import { graphql } from "gatsby"
import React from "react"
import Intro from "../components/Intro"
import PageLayout from "../components/PageLayout"
import PostList from "../components/PostList"

type IndexDataQuery = {
  allMarkdownRemark: {
    edges: Array<{ node: PostT }>
  }
}

export default ({ data }: { data: IndexDataQuery }) => (
  <PageLayout>
    <Intro />
    <PostList posts={data.allMarkdownRemark.edges} />
  </PageLayout>
)

export const query = graphql`
  query IndexData {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            excerpt
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
