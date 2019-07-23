import React from 'react';
import {ReactComponent as GithubIcon} from '../../../static/images/icons/github.svg';
import {ReactComponent as TwitterIcon} from '../../../static/images/icons/twitter.svg';

export enum ServiceIcons {
    GITHUB = GithubIcon({className: 'fill-current'}),
    TWITTER = TwitterIcon({className: 'fill-current'}),
}

interface IProps {
    icon: ServiceIcons;
    href: string;
    className?: string;
}

export const IconLink = (props: IProps) => {
    return (
        <a
            className={`hide-before w-8 rounded-circle ${props.className ||
                ''}`}
            href={props.href}
            rel="noopener noreferer"
        >
            {props.icon}
        </a>
    );
};
