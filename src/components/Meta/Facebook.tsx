import React from 'react';
import Helmet from 'react-helmet';

export interface IProps {
    article: boolean;
    img: string;
    title: string;
    url: string;
}

export const Facebook = (props: IProps) => {
    const {url, img, article, title} = props;
    return (
        <Helmet>
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={img} />
            <meta
                property="og:type"
                content={article ? 'article' : 'website'}
            />
        </Helmet>
    );
};
