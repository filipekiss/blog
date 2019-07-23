import React from "react"
import "../styles/global.css"
import Header from "./Header"
import Meta from "./Meta"
import { useStaticQuery, graphql } from "gatsby"

export default (props: any) => {
  const { children } = props

  const data: SiteMetaData = useStaticQuery(graphql`
    query HeaderSiteQuery {
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
      <Meta />
      <Header
        headerText={data.site.siteMetadata.title}
        links={data.site.siteMetadata.header.links}
      />
      {children}
    </div>
  )
}
