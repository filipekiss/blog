/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const gatsbyConfig = {
  siteMetadata: {
    title: `filipe.kiss.ink`,
    header: {
      links: [
        {
          href: "/about",
          text: "about",
          isExternalLink: false,
        },
        {
          href: "https://github.com/filipekiss",
          text: "github",
          isExternalLink: true,
        },
        {
          href: "https://twitter.com/filipekiss",
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        excerpt_separator: `<!-- end -->`,
      },
    },
  ],
}

module.exports = gatsbyConfig
