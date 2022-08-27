import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"

const Page = ({ data: { mdx }, children }) => {
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
    </>
  )
}

export const Head = ({ data: { mdx }, pageContext: { slug } }) => {
  return (
    <SEO
      title={mdx.frontmatter.title}
      description={mdx.frontmatter.introparagraph}
      slug={slug}
    />
  )
}

export default Page

export const pageQuery = graphql`
  query ($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        introparagraph
      }
      fields {
        slug
      }
    }
  }
`
