import React from "react"
import { PostListItem } from "./Item"

type Props = {
  posts: Array<{ node: PostT }>
}

export const PostList = (props: Props) => {
  const { posts } = props
  if (posts.length < 1) {
    return <div className="text-lg">No posts here yet! Come back later.</div>
  }
  return (
    <ul className="list-none">
      {posts.map(({ node: post }) => {
        return <PostListItem post={post} />
      })}
    </ul>
  )
}
