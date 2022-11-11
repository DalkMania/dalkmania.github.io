exports.turnResumeIntoPage = async ({ graphql, actions }) => {
  const ResumeTemplate = require.resolve(`../templates/resume.js`)
  const result = await graphql(`
    {
      pages: allMdx(
        filter: {
          fields: {
            sourceInstanceName: { eq: "pages" }
            slug: { eq: "/resume/" }
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
      component: `${ResumeTemplate}?__contentFilePath=${page.internal.contentFilePath}`,
      context: {
        slug: page.fields.slug,
      },
    })
  })
}
