import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export interface Props {
  title?: string
  url?: string
  excerpt?: string
  post?: boolean
  img?: string
  children?: React.ReactChild
}

export default function Meta(props: Props) {
  const { title, url, excerpt, post, img, children } = props
  const data: SiteMetaData = useStaticQuery(graphql`
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
  `)

  const {
    description,
    image: socialImg,
    twitterId,
    social,
    siteDomain,
    title: defaultTitle,
    titleTemplate,
  } = data.site.siteMetadata
  const { twitter } = social

  const siteUrl = `https://${siteDomain}`

  console.log({ props, data })

  return (
    <Helmet defaultTitle={defaultTitle} titleTemplate={titleTemplate}>
      <html
        className="font-sans mx-auto px-10 lg:px-0 lg:max-w-4xl lg:ml-32 xl:ml-64 text-gray-800
          min-h-full flex"
      />
      {title && <title>{title}</title>}
      <meta name="description" content={excerpt || description} />
      {/* Facebook */}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img || socialImg} />
      <meta property="og:type" content={post ? "article" : "website"} />
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={excerpt || description} />
      <meta property="twitter:account_id" content={twitterId} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter.username} />
      <meta name="twitter:domain" content={siteUrl} />
      <meta name="twitter:site:id" content={twitterId} />
      <body className="flex-1 pt-16 pb-8 max-w-full text-lg" />
      {children}
    </Helmet>
  )
}
