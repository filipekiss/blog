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
                            removeAccents: true,
                            icon: `<svg height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.26 13a2 2 0 0 1 .01-2.01A3 3 0 0 0 9 5H5a3 3 0 0 0 0 6h.08a6.06 6.06 0 0 0 0 2H5A5 5 0 0 1 5 3h4a5 5 0 0 1 .26 10zm1.48-6a2 2 0 0 1-.01 2.01A3 3 0 0 0 11 15h4a3 3 0 0 0 0-6h-.08a6.06 6.06 0 0 0 0-2H15a5 5 0 0 1 0 10h-4a5 5 0 0 1-.26-10z"></path></svg>`,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            inlineCodeMarker: '›',
                            aliases: {
                                sh: 'bash',
                            },
                            prompt: {
                                user: 'filipe',
                                host: 'localhost',
                                global: true,
                            },
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
