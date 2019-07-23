import { Link } from "gatsby"
import React from "react"

type Props = {
  posts: Array<{ node: PostT }>
}

export default (props: Props) => {
  const { posts } = props
  if (posts.length < 1) {
    return <div className="text-lg">No posts here yet! Come back later.</div>
  }
  return (
    <ul className="list-none">
      {posts.map(({ node: post }) => {
        return (
          <li key={post.id} id={post.id}>
            <Link to={post.fields.slug}>
              <h3>
                {post.frontmatter.title}
                {post.frontmatter.date && (
                  <span> &middot; {post.frontmatter.date}</span>
                )}
              </h3>
              <p>
                {post.frontmatter.excerpt
                  ? post.frontmatter.excerpt
                  : post.excerpt}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
