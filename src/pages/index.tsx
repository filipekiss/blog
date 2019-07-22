import { graphql, Link } from "gatsby"
import React from "react"
import Intro from "../components/Intro"
import PageLayout from "../components/PageLayout"

type IndexDataQuery = {
  allMarkdownRemark: {
    totalCount: number
    edges: Array<{ node: PostT }>
  }
}

export default ({ data }: { data: IndexDataQuery }) => (
  <PageLayout>
    <Intro />
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={node.fields.slug}>
          <h3>
            {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
          </h3>
          <p>{node.excerpt}</p>
        </Link>
      </div>
    ))}
  </PageLayout>
)

export const query = graphql`
  query IndexData {
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
