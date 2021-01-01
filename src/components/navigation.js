import React from "react"
import { Link } from "gatsby"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
].map(link => {
  link.key = `${link.label}`
  return link
})

const toggleMenu = () => {
  document.getElementById("nav-toggle").checked = false
}

const Navigation = () => (
  <>
    <input
      type="checkbox"
      id="nav-toggle"
      aria-labelledby="nav-toggle"
      className="nav-toggle hidden"
    ></input>
    <ul className="main-navigation hidden md:flex md:items-center md:flex-1 md:justify-end text-black">
      {links.map(({ key, href, label }) => (
        <li
          key={key}
          className="text-right uppercase ml-6 hover:text-regal-blue active:text-regal-blue"
        >
          <Link
            activeClassName="text-regal-blue"
            to={href}
            onClick={toggleMenu}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
    <label
      htmlFor="nav-toggle"
      className="nav-toggle-label absolute mr-3 right-0 block md:hidden"
    >
      <span></span>
    </label>
  </>
)

export default Navigation
