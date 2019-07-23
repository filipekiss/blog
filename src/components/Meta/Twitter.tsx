import React from "react"
import Helmet from "react-helmet"

export interface Props {
  title: string
  description: string
  id: string
  creator: string
  domain: string
}

export const Twitter = (props: Props) => {
  const { title, description, id, creator, domain } = props
  return (
    <Helmet>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:account_id" content={id} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:domain" content={domain} />
      <meta name="twitter:site:id" content={id} />
    </Helmet>
  )
}
