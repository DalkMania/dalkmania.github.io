import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { portfolioItemLinks } from "../helpers/portfolioItemLinks"

const PortfolioItem = ({ item }) => {
  const {
    frontmatter,
    id,
    fields: { slug },
  } = item
  const links = portfolioItemLinks(frontmatter)

  return (
    <li key={id} className="portfolio-item p-4 md:w-1/2 lg:w-1/3">
      <div className="item-information flex flex-col h-full border-2 border-gray-200 rounded-lg overflow-hidden">
        <GatsbyImage
          image={
            frontmatter.coverimage?.src?.childImageSharp?.gatsbyImageData ??
            null
          }
          className="lg:h-48 md:h-36 w-full object-cover object-center no-border"
          alt="Project Image"
        />
        <div className="p-6 flex flex-col flex-1">
          <h4 className="tracking-widest text-xs font-medium text-gray-500 mb-1">
            {frontmatter.section}
          </h4>
          <h4 className="title-font text-lg font-bold text-gray-900 mb-3">
            {frontmatter.title}
          </h4>
          <p className="leading-relaxed mb-3 flex-1">
            {frontmatter.introparagraph}
          </p>
          <div className="flex items-center flex-wrap">
            <Link
              to={slug}
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              Learn More
            </Link>
            <span className="text-gray-300 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300 h-10 w-10">
              {links[0]}
            </span>
            <span className="text-gray-300 inline-flex items-center leading-none text-sm h-6 w-6">
              {links[1]}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default PortfolioItem
