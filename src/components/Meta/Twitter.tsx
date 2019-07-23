import React from "react"
import Helmet from "react-helmet"

export interface Props {
  title: string
  description: string
  id?: string
  creator?: string
  domain?: string
  image?: string
}

export const Twitter = (props: Props) => {
  const { title, description, id, creator, domain, image } = props
  return (
    <Helmet>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      {creator && <meta name="twitter:creator" content={creator} />}
      {domain && <meta name="twitter:domain" content={domain} />}
      {id && <meta property="twitter:account_id" content={id} />}
      {id && <meta name="twitter:site:id" content={id} />}
      {image && <meta name="twitter:image:src" content={image} />}
    </Helmet>
  )
}
