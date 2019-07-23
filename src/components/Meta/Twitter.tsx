import React from 'react';
import Helmet from 'react-helmet';

export interface IProps {
    title: string;
    description: string;
    id?: string;
    creator?: string;
    domain?: string;
    image?: string;
    cardType?: string;
}

export const Twitter = (props: IProps) => {
    const {title, description, id, creator, domain, image} = props;
    const defaultCardType = image ? 'summary_large_image' : 'summary';
    const cardType = props.cardType ? props.cardType : defaultCardType;
    return (
        <Helmet>
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:card" content={cardType} />
            {creator && <meta name="twitter:creator" content={`@${creator}`} />}
            {domain && <meta name="twitter:domain" content={domain} />}
            {id && <meta property="twitter:account_id" content={id} />}
            {id && <meta name="twitter:site:id" content={id} />}
            {image && <meta name="twitter:image:src" content={image} />}
        </Helmet>
    );
};
