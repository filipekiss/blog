import React from "react"
import PageLayout from "../components/PageLayout"
import Helmet from "react-helmet"
import Meta from "../components/Meta"

export default () => (
  <PageLayout>
    <Meta title="about" url="/about" />
    <h1>About</h1>
    <div className="flex mb-20 items-center flex-col lg:flex-row">
      <div className="mb-10 lg:mb-0 max-w-xs lg:max-w-full lg:order-2 lg:w-1/2">
        <img
          className="rounded-circle lg:rounded-lg object-cover shadow-lg"
          src="/images/me.png"
          alt="Me and my cat Tabule"
        />
      </div>
      <div className="lg:w-1/2">
        Hi, welcome to my blog! This is where I'll write all the things I keep
        _googling_ because I forget how to do them. I'll also use this space to
        talk about some projects and software development in general. If you
        like what I write here, you should also{" "}
        <a href="https://twitter.com/filipekiss">follow me on twitter</a>. (And
        yes, Kiss is my real last name).
      </div>
    </div>
    <h4>Tech Stack</h4>
    <ul>
      <li>
        Site build with <a href="https://gatsbyjs.org">GatsbyJS</a>
      </li>
      <li>
        Theme is custom made, based on{" "}
        <a href="https://kothemes.com/themes/kompact/">Kompact</a>
      </li>
      <li>
        Fonts:{" "}
        <a
          rel="noopener noreferer"
          href="https://fonts.google.com/specimen/Nunito"
        >
          Nunito
        </a>{" "}
        and{" "}
        <a
          rel="noopener noreferer"
          className="font-mono"
          href="https://fonts.google.com/specimen/Space+Mono"
        >
          Space Mono
        </a>
      </li>
      <li>TypeScript, just because</li>
      <li>
        Source available on{" "}
        <a href="https://github.com/filipekiss/blog">GitHub</a>
      </li>
    </ul>
  </PageLayout>
)
