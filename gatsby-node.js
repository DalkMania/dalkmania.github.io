const { onCreateNode } = require("./src/gatsbyNode/onCreateNode")
const { turnPagesIntoPages } = require("./src/gatsbyNode/turnPagesIntoPages")
const { turnResumeIntoPage } = require("./src/gatsbyNode/turnResumeIntoPage")
const { createPortfolio } = require("./src/gatsbyNode/createPortfolio")

exports.onCreateNode = async params => await onCreateNode(params)

exports.createPages = async params => {
  await Promise.all([
    turnPagesIntoPages(params),
    turnResumeIntoPage(params),
    createPortfolio(params),
  ])
}
