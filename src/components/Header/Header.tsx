import {Link} from 'gatsby';
import React from 'react';

export type HeaderProps = {
    headerText: string;
    links: IHeaderLink[];
};

const buildHeaderLink = (link: IHeaderLink) => {
    const {href, text, isExternalLink} = link;
    if (isExternalLink) {
        return (
            <a rel="noreferer noopener" target="_blank" href={href}>
                {text}
            </a>
        );
    }
    return <Link to={href}>{text}</Link>;
};

export const Header = (props: HeaderProps) => {
    const {headerText, links} = props;
    const linksElement = (
        <nav className="flex flex-col">
            <ul className="flex justify-end my-auto list-none">
                {links.map((link: IHeaderLink) => {
                    return (
                        <li
                            className="ml-2 lg:ml-10"
                            key={link.text.replace(/[^A-Za-z0-9]/gi, '-')}
                        >
                            {buildHeaderLink(link)}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
    return (
        <div className="flex justify-between items-end mb-20 text-base lg:text-xl">
            <Link to="/">{headerText}</Link>
            {linksElement}
        </div>
    );
};
