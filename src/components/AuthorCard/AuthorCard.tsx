import React from "react"
import AuthorPicture from "../../../static/images/me.png"
import { IconLink, ServiceIcons } from "./IconLink"
import { Link } from "gatsby"

interface Props {
  date?: string
}

export const AuthorCard = (props: Props) => {
  const { date } = props
  return (
    <div
      className="text-center shadow rounded mb-10 p-6 md:flex
      md:justify-between md:items-center md:mb-0 lg:max-w-lg"
    >
      <Link to="/about" className="hide-before w-24 m-auto mb-5 md:mb-auto">
        <img
          className="rounded-circle shadow "
          src={AuthorPicture}
          alt="Filipe Kiss"
        />
      </Link>
      <div className="mx-auto mb-5 md:mb-0">
        Hi, I'm Kiss and I talk about software, code and other stuff.
      </div>
      <div className="flex m-auto justify-end md:flex-col">
        <IconLink
          className="text-gray-900 hover:text-victoria-500"
          icon={ServiceIcons.GITHUB}
          href="https://github.com/filipekiss"
        />
        <IconLink
          className="text-gray-900 hover:text-victoria-500 ml-8 md:ml-0 md:mt-2"
          icon={ServiceIcons.TWITTER}
          href="https://twitter.com/filipekiss"
        />
      </div>
    </div>
  )
}
