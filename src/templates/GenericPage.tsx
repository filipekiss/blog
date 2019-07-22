import { graphql } from "gatsby"
import React from "react"
import Helmet from "react-helmet"
import PageLayout from "../components/PageLayout"

type GenericPageQuery = {
  data: {
    markdownRemark: PostT
  }
}

export default ({ data }: GenericPageQuery) => {
  const post = data.markdownRemark
  return (
    <PageLayout>
      <Helmet>
        <title>filipe.kiss.ink &middot; {post.frontmatter.title}</title>
      </Helmet>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </PageLayout>
  )
}

export const query = graphql`
  query GenericPage($slug: String!) {
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
