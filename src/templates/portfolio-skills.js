import React from "react"
import { graphql } from "gatsby"
import PortfolioItem from "../components/portfolio-item"
import DropdownFilter from "../components/dropdown-filter"
import Pagination from "../components/pagination"
import SEO from "../components/seo"
import { makeTitle } from "../helpers/makeTitle"

const PortfolioSkillIndex = ({ data, pageContext }) => {
  const { currentPage, numPages, skills, sections, baseSlug } = pageContext
  const pageTitles = makeTitle(pageContext)

  const PortfolioItems = data.allMdx.nodes.map(node => {
    return <PortfolioItem key={node.id} item={node} />
  })

  return (
    <>
      <div className="text-center py-12">
        <p className="text-base leading-6 text-regal-blue font-semibold tracking-wide uppercase">
          {pageTitles[0]}
        </p>
        <h3 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
          {pageTitles[1]}
        </h3>
      </div>
      <div className="portfolio-filters flex justify-between">
        <DropdownFilter
          items={sections}
          name="Sections"
          baseSlug={"/portfolio"}
        />
        <DropdownFilter items={skills} name="Skills" baseSlug={"/portfolio"} />
      </div>
      <ul className="portfolio-grid container pt-12  pb-8 mx-auto flex flex-wrap -m-4">
        {PortfolioItems}
      </ul>
      {numPages > 1 && (
        <Pagination baseSlug={baseSlug} page={currentPage} pages={numPages} />
      )}
    </>
  )
}

export const Head = ({ pageContext }) => {
  const { currentPage } = pageContext
  const pageTitles = makeTitle(pageContext)
  return (
    <SEO
      title={pageTitles[0]}
      description={pageTitles[1]}
      slug={`portfolio/${currentPage}`}
    />
  )
}

export default PortfolioSkillIndex

export const portfolioSkillQuery = graphql`
  query portfolioSkillQuery($skip: Int!, $limit: Int!, $skill: [String]!) {
    allMdx(
      filter: {
        fields: { sourceInstanceName: { eq: "portfolio" } }
        frontmatter: { skills: { in: $skill } }
      }
      sort: { fields: { fileAbsolutePath: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
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
        fields {
          slug
        }
        internal {
          contentFilePath
        }
      }
    }
  }
`
