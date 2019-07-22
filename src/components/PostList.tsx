import { Link } from "gatsby"
import React from "react"

type Props = {
  posts: Array<{ node: PostT }>
}

export default (props: Props) => {
  const { posts } = props
  return (
    <ul class="list-none">
      {posts.map(({ node: post }) => {
        return (
          <li key={post.id} id={post.id}>
            <Link to={post.fields.slug}>
              <h3>
                {post.frontmatter.title} <span>— {post.frontmatter.date}</span>
              </h3>
              <p>{post.excerpt}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
