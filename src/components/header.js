import React from "react"
import { Link } from "gatsby"
import Navigation from "./navigation"

const Header = () => (
  <header
    id="masthead"
    className="site-header border-t-4 border-b border-gray-300"
    role="banner"
  >
    <nav
      className="header-navigation container mx-auto flex items-center justify-between flex-wrap bg-white p-3 relative"
      role="navigation"
    >
      <div className="flex items-center flex-shrink-0 text-black">
        <h1 className="site-title">
          <Link to="/">Niklas Dahlqvist</Link>
        </h1>
      </div>
      <Navigation />
    </nav>
  </header>
)

export default Header
