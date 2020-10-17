import React from "react"
import { Link } from "gatsby"
import GatsbyLogo from "../assets/svg/gatsby-logo.svg"

const Footer = () => (
  <footer
    id="colophon"
    className="bg-gray-900 border-t border-gray-700"
    role="contentinfo"
  >
    <div className="container mx-auto flex items-center justify-between text-white p-3 relative">
      <p className="copyright flex-1 leading-loose">
        © {new Date().getFullYear()} <Link to="/">Niklas Dahlqvist</Link>
      </p>
      <p className="w-24 leading-loose flex items-center">
        <span>
          <a className="w-24" href="https://www.gatsbyjs.org/">
            <GatsbyLogo />
          </a>
        </span>
      </p>
    </div>
  </footer>
)

export default Footer
