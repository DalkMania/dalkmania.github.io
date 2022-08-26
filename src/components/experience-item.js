import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

const ExperienceItem = ({ item, children }) => {
  const { frontmatter, id } = item

  return (
    <li key={id} className="bg-white shadow overflow-hidden sm:rounded-lg my-8">
      <div className="experience-item px-4 py-5 sm:px-6 flex justify-between">
        <div className="experience-information">
          <h4 className="experience-company font-bold">
            {frontmatter.company}
          </h4>
          <h4 className="experience-name">{frontmatter.title}</h4>
          <p>
            {frontmatter.years} | {frontmatter.location}
          </p>
        </div>
        <GatsbyImage
          image={frontmatter.image.src.childImageSharp.gatsbyImageData}
          className="experience-image h-24 w-24 no-border"
          alt="Company Logo"
        />
      </div>
      <div className="px-4 pt-0 pb-5 sm:px-6">{children}</div>
    </li>
  )
}

export default ExperienceItem
