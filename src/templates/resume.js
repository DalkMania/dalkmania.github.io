import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import ExperienceItem from "../components/experience-item"
import EducationItem from "../components/education-item"
import SEO from '../components/seo'

const Resume = ({ data }) => {
  const page = data.mdx
  const education = data.education.nodes
  const experience = data.experience.nodes

  const EducationItems = education.reverse().map(node => {
    return <EducationItem key={node.id} item={node} />
  })
  const ExperienceItems = experience.map(node => {
    return <ExperienceItem key={node.id} item={node} />
  })

  return (
    <>
      <SEO title={page.frontmatter.title} description={page.frontmatter.introparagraph} slug={'resume'} />
      <div class="text-center py-12">
        <p class="text-base leading-6 text-regal-blue font-semibold tracking-wide uppercase">{page.frontmatter.title}</p>
        <h3 class="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
        {page.frontmatter.introparagraph}
        </h3>
      </div>

      <MDXRenderer>{page.body}</MDXRenderer>

      <div className="experience pt-5 pb-0">
        <h3 className="experience-title">Experience</h3>
        <ul className="experience-items">{ExperienceItems}</ul>
      </div>

      <div className="education pt-5 pb-0">
        <h3 className="education-title">Education</h3>
        <ul className="education-items">{EducationItems}</ul>
      </div>
    </>
  )
}

export default Resume

export const pageQuery = graphql`
  query ResumeQuery {
    mdx(fields: { slug: { eq: "/resume/" } }) {
      id
      body
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
        body
        frontmatter {
          title
          school
          location
          years
          image {
            src {
              id
              childImageSharp {
                fluid(maxWidth: 100, maxHeight: 100) {
                  src
                  sizes
                  srcSet
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
    experience: allMdx(
      filter: { fields: { sourceInstanceName: { eq: "experience" } } }
      limit: 1000
      sort: { fields: fileAbsolutePath, order: ASC }
    ) {
      nodes {
        id
        body
        frontmatter {
          title
          company
          location
          years
          image {
            src {
              id
              childImageSharp {
                fluid(maxWidth: 100, maxHeight: 100) {
                  src
                  sizes
                  srcSet
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  }
`
