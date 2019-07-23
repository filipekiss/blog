/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const username = "filipekiss"
const socialNetworks = {
  github: `https://github.com/${username}`,
  twitter: `https://twitter.com/${username}`,
}

const gatsbyConfig = {
  siteMetadata: {
    title: `filipe.kiss.ink`,
    titleTemplate: "%s · filipe.kiss.ink",
    description: `Hi, I'm Filipe Kiss and I'm a developer. I talk about software, code and other stuff`,
    image: `/images/social.png`,
    siteDomain: "filipe.kiss.ink",
    social: {
      github: {
        url: socialNetworks.github,
        text: "github",
        username,
      },
      twitter: {
        url: socialNetworks.twitter,
        text: "twitter",
        username,
      },
    },
    twitterId: "167462858",
    header: {
      links: [
        {
          href: "/about",
          text: "about",
          isExternalLink: false,
        },
        {
          href: socialNetworks.github,
          text: "github",
          isExternalLink: true,
        },
        {
          href: socialNetworks.twitter,
          text: "twitter",
          isExternalLink: true,
        },
      ],
    },
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-plugin-tslint",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog`,
      },
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "pages",
    //     path: `${__dirname}/content/pages`,
    //   },
    // },
    "gatsby-transformer-remark",
  ],
}

module.exports = gatsbyConfig
