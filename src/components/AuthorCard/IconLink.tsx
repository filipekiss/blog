import React from "react"
import { ReactComponent as GithubIcon } from "../../../static/images/icons/github.svg"
import { ReactComponent as TwitterIcon } from "../../../static/images/icons/twitter.svg"

export enum ServiceIcons {
  GITHUB = GithubIcon,
  TWITTER = TwitterIcon,
}

interface Props {
  icon: ServiceIcons
  href: string
  className?: string
}

export const IconLink = (props: Props) => {
  return (
    <a
      className={`hide-before w-8 rounded-circle ${props.className || ""}`}
      href={props.href}
      rel="noopener noreferer"
    >
      {props.icon({
        className: "fill-current",
      })}
    </a>
  )
}
