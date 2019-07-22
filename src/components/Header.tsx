import { Link } from "gatsby"
import React from "react"

export type HeaderProps = {
  headerText: string
  links: HeaderLink[]
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
    <nav className="flex flex-col">
      <ul className="flex justify-end my-auto list-none">
        {links.map((link: HeaderLink) => {
          return (
            <li
              className="ml-10"
              key={link.text.replace(/[^A-Za-z0-9]/gi, "-")}
            >
              {buildHeaderLink(link)}
            </li>
          )
        })}
      </ul>
    </nav>
  )
  return (
    <div className="flex justify-between mb-20">
      <Link className="text-victoria-600" to="/">
        <span className="text-gray-900">{headerText}</span>
      </Link>
      {linksElement}
    </div>
  )
}
