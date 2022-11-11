import React from "react"
import { graphql } from "gatsby"
import ExperienceItem from "../components/experience-item"
import EducationItem from "../components/education-item"
import SEO from "../components/seo"

const Resume = ({ data: { mdx, education, experience }, children }) => {
  const EducationItems = education.nodes.reverse().map(node => {
    return <EducationItem key={node.id} item={node} />
  })
  const ExperienceItems = experience.nodes.map(node => {
    return <ExperienceItem key={node.id} item={node} />
  })

  return (
    <>
      <div className="text-center py-12">
        <p className="text-base leading-6 text-regal-blue font-semibold tracking-wide uppercase">
          {mdx.frontmatter.title}
        </p>
        <h3 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
          {mdx.frontmatter.introparagraph}
        </h3>
      </div>
      <div className="page-content">{children}</div>
      <div className="experience pt-5 pb-0">
        <h3 className="experience-title font-extrabold">Experience</h3>
        <ul className="experience-items">{ExperienceItems}</ul>
      </div>

      <div className="education pt-5 pb-0">
        <h3 className="education-title font-extrabold">Education</h3>
        <ul className="education-items">{EducationItems}</ul>
      </div>
    </>
  )
}

export const Head = ({ data: { mdx } }) => {
  return (
    <SEO
      title={mdx.frontmatter.title}
      description={mdx.frontmatter.introparagraph}
      slug={"resume"}
    />
  )
}

export default Resume

export const pageQuery = graphql`
  query ($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        introparagraph
      }
    }
    education: allMdx(
      filter: { fields: { sourceInstanceName: { eq: "education" } } }
      limit: 1000
    ) {
      nodes {
        id
        frontmatter {
          title
          school
          location
          years
          image {
            src {
              id
              childImageSharp {
                gatsbyImageData(
                  width: 100
                  height: 100
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
    experience: allMdx(
      filter: { fields: { sourceInstanceName: { eq: "experience" } } }
      limit: 1000
      sort: { fields: { fileAbsolutePath: ASC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          company
          location
          years
          image {
            src {
              id
              childImageSharp {
                gatsbyImageData(
                  width: 100
                  height: 100
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }
`
