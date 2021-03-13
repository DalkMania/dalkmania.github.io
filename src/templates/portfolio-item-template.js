import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"
import ProjectInfo from "../components/project-info"

const PortfolioItemTemplate = ({ data, pageContext }) => {
  const page = data.mdx
  const slug = pageContext.slug

  return (
    <>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.introparagraph}
        slug={slug}
      />
      <div className="text-center py-12">
        <p className="text-base leading-6 text-regal-blue font-semibold tracking-wide uppercase">
          {page.frontmatter.title}
        </p>
        <h3 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
          {page.frontmatter.introparagraph}
        </h3>
      </div>
      <ProjectInfo project={page.frontmatter} />
      <div className="page-content">
        <MDXRenderer>{page.body}</MDXRenderer>
      </div>
    </>
  )
}

export default PortfolioItemTemplate

export const pageQuery = graphql`query PortfolioItemQuery($slug: String) {
  mdx(fields: {slug: {eq: $slug}}) {
    id
    body
    frontmatter {
      title
      introparagraph
      section
      skills
      githuburl
      demourl
      coverimage {
        src {
          id
          childImageSharp {
            gatsbyImageData(
              width: 570
              height: 250
              placeholder: BLURRED
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
}
`
