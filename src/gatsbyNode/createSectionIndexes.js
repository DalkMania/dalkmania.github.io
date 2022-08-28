const { slugify } = require("../helpers/slugify")

exports.createSectionIndexes = async ({ graphql, actions }) => {
  const { createPage } = actions
  const PortfolioTemplate = require.resolve(
    `../templates/portfolio-sections.js`
  )
  const postsPerPage = 12

  const result = await graphql(`
    {
      portfolio: allMdx(
        filter: { fields: { sourceInstanceName: { eq: "portfolio" } } }
        sort: { fields: fields___fileAbsolutePath, order: DESC }
      ) {
        nodes {
          id
          frontmatter {
            skills
            section
          }
        }
      }
    }
  `)

  let sections = []
  let skills = []

  result.data.portfolio.nodes.forEach(item => {
    // Sections
    sections = sections.concat(item.frontmatter.section)
    sections = sections.filter((x, i, a) => a.indexOf(x) == i)

    // Skills
    skills = skills.concat(item.frontmatter.skills)
    skills = skills.filter((x, i, a) => a.indexOf(x) == i)
  })

  // Make skill pages
  sections.forEach(section => {
    const items = result.data.portfolio.nodes.filter(item => {
      return item.frontmatter.section === section
    })

    const numPages = Math.ceil(items.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/portfolio/${slugify(section)}`
            : `/portfolio/${slugify(section)}/${i + 1}`,
        component: `${PortfolioTemplate}`,
        context: {
          section: section,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          sections,
          skills,
        },
      })
    })
  })
}
