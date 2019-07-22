interface SiteMetaData {
  site: {
    siteMetadata: {
      title: string
      header: {
        links: Array<HeaderLink>
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
  }
}
