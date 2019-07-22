import React from "react"
import { Link } from "gatsby"

export type HeaderProps = {
  headerText: string
  links: HeaderLink[]
}

export type HeaderLink = {
  href: string
  text: string
  isExternalLink?: boolean
}

const buildHeaderLink = (link: HeaderLink) => {
  const { href, text, isExternalLink } = link
  if (isExternalLink) {
    return <a href={href}>{text}</a>
  }
  return <Link to={href}>{text}</Link>
}

export default (props: HeaderProps) => {
  const { headerText, links } = props
  const linksElement = (
    <nav class="flex flex-col">
      <ul className="flex justify-end my-auto">
        {links.map((link: HeaderLink) => {
          return (
            <li className="ml-10" id={link.text.replace(/[^A-Za-z0-9]/gi, "-")}>
              {buildHeaderLink(link)}
            </li>
          )
        })}
      </ul>
    </nav>
  )
  return (
    <div class="flex justify-between">
      <Link className="text-victoria-600 text-3xl" to="/">
        <h1 className="text-6xl text-gray-900">{headerText}</h1>
      </Link>
      {linksElement}
    </div>
  )
}
