import React from "react"
import { Link } from "gatsby"

import GitHubLogo from "../assets/svg/github-square.svg"
import DemoIcon from "../assets/svg/external-link-square-alt.svg"

export const portfolioItemLinks = frontmatter => {
  const { githuburl, demourl } = frontmatter

  let github = <GitHubLogo className="link-none fill-current h-8 w-8" />
  let demo = <DemoIcon className="link-none fill-current h-8 w-8" />

  if (githuburl !== "") {
    github = (
      <a
        className="text-black hover:text-regal-blue active:text-regal-blue"
        href={githuburl}
      >
        <GitHubLogo className="fill-current h-8 w-8" />
      </a>
    )
  }

  if (demourl !== "") {
    demo = (
      <a
        className="text-black hover:text-regal-blue active:text-regal-blue"
        href={demourl}
      >
        <DemoIcon className="fill-current h-8 w-8" />
      </a>
    )
  }

  return [github, demo]
}
