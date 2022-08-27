import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"

const IndexPage = ({ data: { mdx } }) => {
  return (
    <div className="text-center pt-12">
      <h1 className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
        {mdx.frontmatter.title}
      </h1>
      <blockquote>{mdx.frontmatter.introparagraph}</blockquote>
    </div>
  )
}

export const Head = ({ data: { mdx } }) => {
  return (
    <SEO
      title={"Home"}
      description={mdx.frontmatter.introparagraph}
      slug={""}
    />
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    mdx(fields: { slug: { eq: "/" } }) {
      id
      body
      frontmatter {
        title
        introparagraph
      }
    }
  }
`
