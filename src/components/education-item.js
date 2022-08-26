import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const EducationItem = ({ item, children }) => {
  const { frontmatter, id } = item

  return (
    <li key={id} className="bg-white shadow overflow-hidden sm:rounded-lg my-8">
      <div className="education-item flex justify-between px-4 py-5 sm:px-6">
        <div className="education-information">
          <h4 className="school-name font-extrabold">{frontmatter.school}</h4>
          <h4 className="program-name">{frontmatter.title}</h4>
          <p>
            {frontmatter.years} | {frontmatter.location}
          </p>
        </div>
        <GatsbyImage
          image={frontmatter.image.src.childImageSharp.gatsbyImageData}
          className="education-image h-24 w-24 no-border"
          alt="School Logo"
        />
      </div>

      <div className="px-4 pt-0 pb-5 sm:px-6">{children}</div>
    </li>
  )
}

export default EducationItem
