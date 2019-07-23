import {Link} from 'gatsby';
import React from 'react';

export const PostListItem = ({post}: {post: IPost}) => {
    return (
        <li
            key={post.id}
            id={post.id}
            className="border-gray-200 border-b-2 mb-8"
        >
            <h2 className="mb-2">
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
            </h2>
            <p className="text-xl">
                {post.frontmatter.spoiler
                    ? post.frontmatter.spoiler
                    : post.excerpt}{' '}
                <Link to={post.fields.slug}>→</Link>
            </p>
            {post.frontmatter.date && (
                <small>
                    <span> {post.frontmatter.date}</span>
                </small>
            )}
            <hr />
        </li>
    );
};
