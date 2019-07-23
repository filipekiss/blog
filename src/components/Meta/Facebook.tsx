import React from "react"
import Helmet from "react-helmet"

export interface Props {
  article: boolean
  img: string
  title: string
  url: string
}

export const Facebook = (props: Props) => {
  const { url, img, article, title } = props
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content={article ? "article" : "website"} />
    </Helmet>
  )
}
