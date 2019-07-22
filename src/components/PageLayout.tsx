import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Header from "./Header"
import { Helmet } from "react-helmet"
import "../styles/global.css"
import { SiteMetaQuery } from "../types/graphql"

export default (props: any) => {
  const { children } = props
  const data: SiteMetaQuery = useStaticQuery(graphql`
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
        <html className="font-sans max-w-4xl mx-64 mt-16 text-gray-800" />
      </Helmet>
      <Header
        headerText={data!.site!.siteMetadata!.title!}
        links={data!.site!.siteMetadata!.header!.links!}
      />
      {children}
    </div>
  )
}
