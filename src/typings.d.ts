interface SiteMetaData {
  site: {
    siteMetadata: {
      header: {
        links: HeaderLink[]
      }
      title: string
      titleTemplate: string
      description: string
      image: string
      siteDomain: string
      twitterId: string
      protocol: string
      social: {
        twitter: {
          url: string
          text: string
          username: string
        }
      }
    }
  }
}

interface HeaderLink {
  href: string
  text: string
  isExternalLink?: boolean
}

interface PostT {
  id: string
  excerpt: string
  html: string
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    date: string
    excerpt?: string
  }
}
