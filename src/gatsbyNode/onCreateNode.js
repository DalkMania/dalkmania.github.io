const { createFilePath } = require("gatsby-source-filesystem")
const { slugify } = require("../helpers/slugify")

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    let value = createFilePath({ node, getNode })
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "section") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/portfolio/${slugify(node.frontmatter.section)}/${slugify(
        node.frontmatter.title
      )}/`
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
    createNodeField({
      name: `fileAbsolutePath`,
      node,
      value: fileNode.absolutePath,
    })
  }
}
