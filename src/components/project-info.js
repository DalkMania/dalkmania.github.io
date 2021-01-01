import React from "react"
import GithubLogo from "../assets/svg/github-square.svg"
import SiteLink from "../assets/svg/external-link-square-alt.svg"

const ProjectInfo = ({ project }) => {
  if (
    project.section !== "Web Development" &&
    project.demourl !== "" &&
    project.githuburl !== ""
  ) {
    return (
      <ul className="flex justify-between py-4">
        <li>
          <a href={project.githuburl}>
            Source Code{" "}
            <GithubLogo className="fill-current w-8 h-8 inline-block" />
          </a>
        </li>
        <li>
          <a href={project.demourl}>
            Demo <GithubLogo className="fill-current w-8 h-8 inline-block" />
          </a>
        </li>
      </ul>
    )
  } else if (
    project.section !== "Web Development" &&
    project.demourl === "" &&
    project.githuburl !== ""
  ) {
    return (
      <ul className="flex justify-between py-4">
        <li>
          <a
            href={project.githuburl}
            className="text-black hover:text-regal-blue active:text-regal-blue"
          >
            Source Code{" "}
            <GithubLogo className="fill-current w-8 h-8 inline-block" />
          </a>
        </li>
      </ul>
    )
  } else if (
    project.section === "Web Development" &&
    project.demourl !== "" &&
    project.githuburl === ""
  ) {
    return (
      <ul className="flex justify-between py-4">
        <li>
          <a
            href={project.demourl}
            className="text-black hover:text-regal-blue active:text-regal-blue"
          >
            Visit Website{" "}
            <SiteLink className="fill-current w-8 h-8 inline-block" />
          </a>
        </li>
      </ul>
    )
  } else if (project.section === "Web Development" && project.demourl !== "") {
    return (
      <ul className="flex justify-between py-4">
        <li>
          <a
            href={project.demourl}
            className="text-black hover:text-regal-blue active:text-regal-blue"
          >
            Visit Website{" "}
            <SiteLink className="fill-current w-8 h-8 inline-block" />
          </a>
        </li>
      </ul>
    )
  } else {
    return null
  }
}

export default ProjectInfo
