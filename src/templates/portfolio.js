import React from "react"
import PortfolioItem from "../components/portfolio-item"
import DropdownFilter from "../components/dropdown-filter"
import Pagination from "../components/pagination"
import SEO from "../components/seo"
import { makeTitle } from "../helpers/makeTitle"

const PortfolioIndex = ({ pageContext }) => {
  const { nodes, page, prev, next, pages, sections, skills } = pageContext
  const pageTitles = makeTitle(pageContext)

  const PortfolioItems = nodes.map(node => {
    return <PortfolioItem key={node.id} item={node} />
  })

  return (
    <>
      <SEO
        title={pageTitles[0]}
        description={pageTitles[1]}
        slug={"portfolio"}
      />
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
      {pages > 1 && (
        <Pagination
          baseSlug={"/portfolio"}
          page={page}
          pages={pages}
          prev={prev}
          next={next}
        />
      )}
    </>
  )
}

export default PortfolioIndex
