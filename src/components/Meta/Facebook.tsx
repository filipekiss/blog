import React from "react"
import Helmet from "react-helmet"

export interface Props {
  url: string
  img: string
  article: boolean
}

export const Facebook = (props: Props) => {
  const { url, img, article } = props
  return (
    <Helmet>
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content={article ? "article" : "website"} />
    </Helmet>
  )
}
