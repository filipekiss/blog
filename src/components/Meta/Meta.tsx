import {graphql, useStaticQuery} from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import {Facebook} from './Facebook';
import {Twitter} from './Twitter';

// Used to make sure the metadata titles matches the page title
const formatTitle = (format: string, title: string) => {
    return format.replace(/%s/g, title);
};
export interface IProps {
    title?: string;
    url?: string;
    excerpt?: string;
    article?: boolean;
    img?: string;
    children?: React.ReactChild;
}

export const Meta = (props: IProps) => {
    const {title, url, excerpt, article, img} = props;
    const data: ISiteMetaData = useStaticQuery(graphql`
        query HeadingMetaQuery {
            site {
                siteMetadata {
                    header {
                        links {
                            href
                            isExternalLink
                            text
                        }
                    }
                    title
                    titleTemplate
                    siteDomain
                    protocol
                    description
                    image
                    social {
                        twitter {
                            username
                            url
                            text
                        }
                    }
                }
            }
        }
    `);

    const {
        description,
        image: socialImg,
        twitterId,
        social,
        siteDomain,
        title: defaultTitle,
        titleTemplate,
        protocol,
    } = data.site.siteMetadata;
    const {twitter} = social;

    const siteUrl = `${protocol}://${siteDomain}`;

    let canonicalUrl = url;
    if (url && url.startsWith('/')) {
        canonicalUrl = `${siteUrl}${url}`;
    }

    return (
        <>
            <Helmet defaultTitle={defaultTitle} titleTemplate={titleTemplate}>
                <html
                    className="font-sans mx-auto px-10 lg:px-0 lg:max-w-4xl lg:ml-32 xl:ml-64 text-gray-800
          min-h-full flex"
                />
                {title && <title>{title}</title>}
                <meta name="description" content={excerpt || description} />
                {/* Facebook */}
                <body className="flex-1 pt-16 pb-8 max-w-full text-lg" />
            </Helmet>
            <Facebook
                title={title ? formatTitle(titleTemplate, title) : defaultTitle}
                url={canonicalUrl || siteUrl}
                img={img || `${siteUrl}${socialImg}`}
                article={Boolean(article)}
            />
            <Twitter
                title={title ? formatTitle(titleTemplate, title) : defaultTitle}
                description={excerpt || description}
                id={twitterId}
                creator={twitter.username}
                domain={siteDomain}
                image={img || `${siteUrl}${socialImg}`}
            />
        </>
    );
};
