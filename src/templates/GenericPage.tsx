import React from "react"
import { graphql } from "gatsby"
import PageLayout from "../components/PageLayout"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <PageLayout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </PageLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug }, collection: { eq: "pages" } }
    ) {
      html
      frontmatter {
        title
      }
    }
  }
`
