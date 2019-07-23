import {graphql} from 'gatsby';
import React from 'react';
import Intro from '../components/Intro';
import Meta from '../components/Meta';
import {PageLayout} from '../components/PageLayout/PageLayout';
import PostList from '../components/PostList';

type IndexDataQuery = {
    allMarkdownRemark: {
        edges: Array<{node: IPost}>;
    };
};

export default ({data}: {data: IndexDataQuery}) => (
    <PageLayout>
        <Meta />
        <Intro />
        <main>
            <PostList posts={data.allMarkdownRemark.edges} />
        </main>
    </PageLayout>
);

export const query = graphql`
    query IndexData($langKey: String!) {
        allMarkdownRemark(
            filter: {
                fields: {collection: {eq: "blog"}, langKey: {eq: $langKey}}
                frontmatter: {published: {eq: true}}
            }
            sort: {fields: frontmatter___date, order: DESC}
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        spoiler
                    }
                    fields {
                        slug
                    }
                    excerpt(pruneLength: 320)
                }
            }
        }
    }
`;
