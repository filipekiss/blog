import { graphql } from "gatsby"
import React from "react"
import Intro from "../components/Intro"
import PageLayout from "../components/PageLayout"
import PostList from "../components/PostList"
import Helmet from "react-helmet"
import Meta from "../components/Meta"

type IndexDataQuery = {
  allMarkdownRemark: {
    edges: Array<{ node: PostT }>
  }
}

export default ({ data }: { data: IndexDataQuery }) => (
  <PageLayout>
    <Meta></Meta>
    <Intro />
    <main>
      <PostList posts={data.allMarkdownRemark.edges} />
    </main>
  </PageLayout>
)

export const query = graphql`
  query IndexData {
    allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "blog" } }
        frontmatter: { published: { eq: true } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY HH:mm")
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
