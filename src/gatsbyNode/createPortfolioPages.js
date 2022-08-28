exports.createPortfolioPages = async ({ graphql, actions }) => {
  const pagesTemplate = require.resolve(
    `../templates/portfolio-item-template.js`
  )
  const result = await graphql(`
    {
      portfolio: allMdx(
        filter: { fields: { sourceInstanceName: { eq: "portfolio" } } }
        sort: { fields: fields___fileAbsolutePath, order: DESC }
      ) {
        nodes {
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

  result.data.portfolio.nodes.forEach(page => {
    actions.createPage({
      path: page.fields.slug,
      component: `${pagesTemplate}?__contentFilePath=${page.internal.contentFilePath}`,
      context: {
        slug: page.fields.slug,
      },
    })
  })
}
