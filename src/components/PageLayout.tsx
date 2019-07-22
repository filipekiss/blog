import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import "../styles/global.css"
import Header from "./Header"

export default (props: any) => {
  const { children } = props
  const data: SiteMetaData = useStaticQuery(graphql`
    query SiteMeta {
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
  `)

  return (
    <div>
      <Helmet>
        <html
          className="font-sans max-w-4xl mx-64 text-gray-800
          min-h-full flex"
        />
        <body className="flex-1 pt-16 text-lg" />
      </Helmet>
      <Header
        headerText={data.site.siteMetadata.title}
        links={data.site.siteMetadata.header.links}
      />
      {children}
    </div>
  )
}
