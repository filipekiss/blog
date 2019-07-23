import { graphql } from "gatsby"
import React from "react"
import PageLayout from "../components/PageLayout"
import Meta from "../components/Meta"

type BlogPostQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
      }
      html: string
    }
  }
}

export default ({ data }: BlogPostQuery) => {
  const post = data.markdownRemark
  return (
    <PageLayout>
      <Meta title={post.frontmatter.title} />
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
      fields: { slug: { eq: $slug }, collection: { eq: "blog" } }
    ) {
      html
      frontmatter {
        title
      }
    }
  }
`
