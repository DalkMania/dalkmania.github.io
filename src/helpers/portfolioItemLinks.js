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
      <Link
        className="text-black hover:text-regal-blue active:text-regal-blue"
        to={githuburl}
      >
        <GitHubLogo className="fill-current h-8 w-8" />
      </Link>
    )
  }

  if (demourl !== "") {
    demo = (
      <Link
        className="text-black hover:text-regal-blue active:text-regal-blue"
        to={demourl}
      >
        <DemoIcon className="fill-current h-8 w-8" />
      </Link>
    )
  }

  return [github, demo]
}
