import React from "react"
import GitHubLogo from "../assets/svg/github-square.svg"
import DemoIcon from "../assets/svg/external-link-square-alt.svg"

export const portfolioItemLinks = ({ githuburl, demourl }) => {
  const linkClassNames =
    "text-black hover:text-regal-blue active:text-regal-blue"
  const inActiveIconClassNames = "link-none fill-current h-8 w-8"
  const activeIconClassNames = "fill-current h-8 w-8"

  let github = <GitHubLogo className={inActiveIconClassNames} />
  let demo = <DemoIcon className={inActiveIconClassNames} />

  if (githuburl) {
    github = (
      <a className={linkClassNames} href={githuburl}>
        <GitHubLogo className={activeIconClassNames} />
      </a>
    )
  }

  if (demourl) {
    demo = (
      <a className={linkClassNames} href={demourl}>
        <DemoIcon className={activeIconClassNames} />
      </a>
    )
  }

  return [github, demo]
}
