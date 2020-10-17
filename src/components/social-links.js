import React from "react"

import FacebookLogo from "../assets/svg/facebook-square.svg"
import TwitterLogo from "../assets/svg/twitter-square.svg"
import LinkedInLogo from "../assets/svg/linkedin-square.svg"
import GithubLogo from "../assets/svg/github-square.svg"

const SocialLinks = ({ links }) => {
  const { fbLink, twitterLink, linkedInLink, githubLink } = links

  return (
    <ul className="social-icons flex items-center justify-center">
      <li className="facebook h-20 w-20">
        <a className="block h-20 w-20" href={fbLink}>
          <FacebookLogo className="block h-20 w-20" />
        </a>
      </li>
      <li className="twitter h-20 w-20">
        <a href={twitterLink}>
          <TwitterLogo className="block h-20 w-20" />
        </a>
      </li>
      <li className="linkedin h-20 w-20">
        <a href={linkedInLink}>
          <LinkedInLogo className="block h-20 w-20" />
        </a>
      </li>
      <li className="github h-20 w-20">
        <a href={githubLink}>
          <GithubLogo className="block h-20 w-20" />
        </a>
      </li>
    </ul>
  )
}

export default SocialLinks
