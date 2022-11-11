const { slugify } = require("../helpers/slugify")

exports.createPortfolio = async ({ graphql, actions }) => {
  const { createPage } = actions
  const PortfolioTemplate = require.resolve(`../templates/portfolio.js`)
  const pagesTemplate = require.resolve(
    `../templates/portfolio-item-template.js`
  )
  const PortfolioSectionTemplate = require.resolve(
    `../templates/portfolio-sections.js`
  )
  const PortfolioSkillTemplate = require.resolve(
    `../templates/portfolio-skills.js`
  )
  const postsPerPage = 12

  const result = await graphql(`
    {
      portfolio: allMdx(
        filter: { fields: { sourceInstanceName: { eq: "portfolio" } } }
        sort: { fields: { fileAbsolutePath: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            skills
            section
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

  // Create Paginated Portfolio Pages
  const numPages = Math.ceil(result.data.portfolio.nodes.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/portfolio` : `/portfolio/${i + 1}`,
      component: `${PortfolioTemplate}`,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        sections,
        skills,
      },
    })
  })

  // Create Portfolio Single Pages
  result.data.portfolio.nodes.forEach(page => {
    actions.createPage({
      path: page.fields.slug,
      component: `${pagesTemplate}?__contentFilePath=${page.internal.contentFilePath}`,
      context: {
        slug: page.fields.slug,
      },
    })
  })

  // Make section pages
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
        component: `${PortfolioSectionTemplate}`,
        context: {
          baseSlug: `/portfolio/${slugify(section)}`,
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

  // Make skill pages
  skills.forEach(skill => {
    const items = result.data.portfolio.nodes.filter(item => {
      return item.frontmatter.skills.includes(skill)
    })

    const numPages = Math.ceil(items.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/portfolio/${slugify(skill)}`
            : `/portfolio/${slugify(skill)}/${i + 1}`,
        component: `${PortfolioSkillTemplate}`,
        context: {
          baseSlug: `/portfolio/${slugify(skill)}`,
          skill: skill,
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
