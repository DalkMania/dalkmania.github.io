import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const page = data.mdx

  return (
    <>
      <SEO
        title={"Home"}
        description={page.frontmatter.introparagraph}
        slug={""}
      />
      <div className="text-center pt-12">
        <h1 className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
          {page.frontmatter.title}
        </h1>
        <blockquote>{page.frontmatter.introparagraph}</blockquote>
      </div>
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    mdx(fields: { slug: { eq: "/home/" } }) {
      id
      body
      frontmatter {
        title
        introparagraph
      }
    }
  }
`
