/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const username = 'filipekiss';
const socialNetworks = {
    github: `https://github.com/${username}`,
    twitter: `https://twitter.com/${username}`,
};

const siteDomain =
    process.env.NODE_ENV === 'production'
        ? 'filipe.kiss.ink'
        : 'local.kiss.ink:8000';

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

const gatsbyConfig = {
    siteMetadata: {
        title: `filipe.kiss.ink`,
        titleTemplate: '%s · filipe.kiss.ink',
        description: `Hi, I'm Filipe Kiss and I'm a developer. I talk about software, code and other stuff`,
        image: `/images/social.png`,
        siteDomain,
        protocol,
        social: {
            github: {
                url: socialNetworks.github,
                text: 'github',
                username,
            },
            twitter: {
                url: socialNetworks.twitter,
                text: 'twitter',
                username,
            },
        },
        twitterId: '167462858',
        header: {
            links: [
                {
                    href: '/about',
                    text: 'about',
                    isExternalLink: false,
                },
                {
                    href: socialNetworks.github,
                    text: 'github',
                    isExternalLink: true,
                },
                {
                    href: socialNetworks.twitter,
                    text: 'twitter',
                    isExternalLink: true,
                },
            ],
        },
    },
    plugins: [
        'gatsby-plugin-postcss',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-typescript',
        'gatsby-plugin-svgr',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'blog',
                path: `${__dirname}/content/blog`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 900,
                        },
                    },
                    'gatsby-remark-external-links',
                    {
                        resolve: 'gatsby-remark-autolink-headers',
                        options: {
                            className: 'hide-before',
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-i18n',
            options: {
                langKeyDefault: 'en',
                useLangKeyLayout: false,
                pagesPaths: [`${__dirname}/content/blog`],
            },
        },
        'gatsby-plugin-catch-links',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
    ],
};

module.exports = gatsbyConfig;
