import {graphql} from 'gatsby';
import React from 'react';
import {AuthorCard} from '../components/AuthorCard/AuthorCard';
import Meta from '../components/Meta';
import PageLayout from '../components/PageLayout';
import TranslationList from '../components/TranslationList';

interface ISinglePostProps {
    data: {
        markdownRemark: IPost;
    };
    pageContext: IPageContext;
}

export default (props: ISinglePostProps) => {
    const {data} = props;
    const post: IPost = data.markdownRemark;
    return (
        <PageLayout>
            <Meta title={post.frontmatter.title} url={post.fields.slug} />
            <main className="article single-entry">
                <h1>{post.frontmatter.title}</h1>
                <div className="my-4">
                    <small>Posted on {post.frontmatter.date}</small>
                </div>
                <TranslationList
                    post={post}
                    translations={props.pageContext.translations}
                />
                <div
                    className="mb-10"
                    dangerouslySetInnerHTML={{__html: post.html}}
                />
                <AuthorCard />
            </main>
        </PageLayout>
    );
};

export const query = graphql`
    query SinglePost($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}, collection: {eq: "blog"}}) {
            id
            html
            excerpt
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                spoiler
            }
            fields {
                slug
                langKey
            }
        }
    }
`;
