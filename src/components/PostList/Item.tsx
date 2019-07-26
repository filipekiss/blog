import React from "react"
import { Link } from "@reach/router"

export const PostListItem = ({ post }: { post: PostT }) => {
  return (
    <li key={post.id} id={post.id} className="border-gray-200 border-b-2 mb-8">
      <h2 class="mb-2">
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </h2>
      <p class="text-xl">
        {post.frontmatter.excerpt ? post.frontmatter.excerpt : post.excerpt}{" "}
        <Link to={post.fields.slug}>→</Link>
      </p>
      {post.frontmatter.date && (
        <small>
          <span> {post.frontmatter.date}</span>
        </small>
      )}
      <hr />
    </li>
  )
}
