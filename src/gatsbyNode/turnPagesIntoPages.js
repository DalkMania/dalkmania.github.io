exports.turnPagesIntoPages = async ({ graphql, actions }) => {
  const pagesTemplate = require.resolve(`../templates/page.js`)
  const result = await graphql(`
    {
      pages: allMdx(
        filter: {
          fields: {
            sourceInstanceName: { eq: "pages" }
            slug: { ne: "/resume/" }
          }
        }
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

  result.data.pages.nodes.forEach(page => {
    actions.createPage({
      path: page.fields.slug,
      component: `${pagesTemplate}?__contentFilePath=${page.internal.contentFilePath}`,
      context: {
        slug: page.fields.slug,
      },
    })
  })
}
