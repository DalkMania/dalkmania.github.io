import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from '../components/seo'

const Page = ({ data, pageContext }) => {
  const page = data.mdx
  const slug = pageContext.slug

  return (
    <>
    <SEO title={page.frontmatter.title} description={page.frontmatter.introparagraph} slug={slug} />
    <div class="text-center py-12">
      <p class="text-base leading-6 text-regal-blue font-semibold tracking-wide uppercase">{page.frontmatter.title}</p>
      <h3 class="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
      {page.frontmatter.introparagraph}
      </h3>
    </div>
      
      <MDXRenderer>{page.body}</MDXRenderer>
    </>
  )
}

export default Page

export const pageQuery = graphql`
  query BlogPostQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
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
