import { graphql } from "gatsby"
import React from "react"
import Meta from "../components/Meta"
import PageLayout from "../components/PageLayout"
import { AuthorCard } from "../components/AuthorCard/AuthorCard"

type BlogPostQuery = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        date: string
      }
      html: string
      fields: {
        slug: string
      }
    }
  }
}

export default ({ data }: BlogPostQuery) => {
  const post = data.markdownRemark
  return (
    <PageLayout>
      <Meta title={post.frontmatter.title} url={post.fields.slug} />
      <main className="article single-entry">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="mb-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <AuthorCard date={post.frontmatter.date} />
      </main>
    </PageLayout>
  )
}

export const query = graphql`
  query SinglePost($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug }, collection: { eq: "blog" } }
    ) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`
