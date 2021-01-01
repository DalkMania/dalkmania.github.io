const path = require(`path`)
const slugify = require(`slugify`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const {
  createPaginationPages,
  prefixPathFormatter,
} = require("gatsby-pagination")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    let value = createFilePath({ node, getNode })
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "section") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/portfolio/${slugify(node.frontmatter.section, {
        replacement: "-", // replace spaces with replacement
        remove: /[*+~.()'"!:@]/g, // regex to remove characters
        lower: true, // result in lower case
      })}/${slugify(node.frontmatter.title, {
        replacement: "-", // replace spaces with replacement
        remove: /[*+~.()'"!:@]/g, // regex to remove characters
        lower: true,
      })}/`
      value = slug
    }
    createNodeField({
      name: "sourceInstanceName",
      node,
      value: fileNode.sourceInstanceName,
    })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

const turnPagesIntoPages = async ({ graphql, actions }) => {
  const pagesTemplate = path.resolve(`./src/templates/page.js`)
  const ResumeTemplate = path.resolve(`./src/templates/resume.js`)
  const { data } = await graphql(`
    query {
      pages: allMdx(
        filter: { fields: { sourceInstanceName: { eq: "pages" } } }
        limit: 1000
      ) {
        nodes {
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
    }
  `)

  // 3. Loop over each pizza and create a page for that pizza
  data.pages.nodes.forEach(page => {
    if (page.fields.slug === "/home/" || page.fields.slug === "/portfolio/") {
    }
    if (page.fields.slug === "/resume/") {
      actions.createPage({
        path: "/resume",
        component: ResumeTemplate,
        context: {
          slug: page.fields.slug,
        },
      })
    } else {
      actions.createPage({
        path: page.fields.slug,
        component: pagesTemplate,
        context: {
          slug: page.fields.slug,
        },
      })
    }
  })
}

const turnPortfolioIntoPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const PortfolioTemplate = path.resolve(`./src/templates/portfolio.js`)
  const PortfolioItemTemplate = path.resolve(
    `./src/templates/portfolio-item-template.js`
  )
  const { data } = await graphql(`
    query {
      portfolio: allMdx(
        filter: { fields: { sourceInstanceName: { eq: "portfolio" } } }
        limit: 1000
        sort: { fields: fileAbsolutePath, order: DESC }
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
                  fluid(maxWidth: 570, maxHeight: 250) {
                    src
                    sizes
                    srcSet
                    aspectRatio
                  }
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  let sections = []
  let skills = []
  data.portfolio.nodes.forEach(item => {
    // Sections
    sections = sections.concat(item.frontmatter.section)
    sections = sections.filter((x, i, a) => a.indexOf(x) == i)

    // Skills
    skills = skills.concat(item.frontmatter.skills)
    skills = skills.filter((x, i, a) => a.indexOf(x) == i)

    createPage({
      path: item.fields.slug,
      component: PortfolioItemTemplate,
      context: {
        slug: item.fields.slug,
        sections,
        skills,
      },
    })
  })

  createPaginationPages({
    createPage,
    edges: data.portfolio.nodes,
    component: PortfolioTemplate,
    limit: 12,
    pathFormatter: prefixPathFormatter("/portfolio"),
    context: {
      sections,
      skills,
    },
  })

  // Make section pages
  sections.forEach(section => {
    const items = data.portfolio.nodes.filter(item => {
      return item.frontmatter.section === section
    })

    createPaginationPages({
      createPage,
      edges: items,
      component: PortfolioTemplate,
      limit: 12,
      pathFormatter: prefixPathFormatter(
        `/portfolio/${slugify(section.toLowerCase())}`
      ),
      context: {
        baseSlug: `/portfolio/${slugify(section.toLowerCase())}`,
        section: section,
        sections,
        skills,
      },
    })
  })

  // Make skill pages
  skills.forEach(skill => {
    const items = data.portfolio.nodes.filter(item => {
      return item.frontmatter.skills.includes(skill)
    })

    createPaginationPages({
      createPage,
      edges: items,
      component: PortfolioTemplate,
      limit: 12,
      pathFormatter: prefixPathFormatter(
        `/portfolio/${slugify(skill.toLowerCase())}`
      ),
      context: {
        baseSlug: `/portfolio/${slugify(skill.toLowerCase())}`,
        skill: skill,
        sections,
        skills,
      },
    })
  })
}

exports.createPages = async params => {
  await Promise.all([
    turnPagesIntoPages(params),
    turnPortfolioIntoPages(params),
  ])
}
