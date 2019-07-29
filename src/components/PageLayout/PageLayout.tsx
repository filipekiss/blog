import {graphql, useStaticQuery} from 'gatsby';
import React from 'react';
import '../../styles/global.css';
import Footer from '../Footer';
import Header from '../Header';
import Meta from '../Meta';

export const PageLayout = (props: any) => {
    const {children} = props;

    const data: ISiteMetaData = useStaticQuery(graphql`
        query HeaderSiteQuery {
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
                }
            }
        }
    `);
    return (
        <div className={props.className}>
            <Meta />
            <Header
                headerText={data.site.siteMetadata.title}
                links={data.site.siteMetadata.header.links}
            />
            {children}
            <Footer />
        </div>
    );
};
