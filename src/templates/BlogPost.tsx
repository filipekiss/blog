import { graphql } from "gatsby"
import React from "react"
import PageLayout from "../components/PageLayout"
import { MarkdownRemark } from "../types/graphql"

export default ({
  data,
}: {
  data: {
    markdownRemark: MarkdownRemark
  }
}) => {
  const post = data.markdownRemark
  return (
    <PageLayout>
      <div>
        <h1>{post!.frontmatter!.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post!.html! }} />
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
