const { onCreateNode } = require("./src/gatsbyNode/onCreateNode")
const { turnPagesIntoPages } = require("./src/gatsbyNode/turnPagesIntoPages")
const { turnResumeIntoPage } = require("./src/gatsbyNode/turnResumeIntoPage")
const {
  createPortfolioIndex,
} = require("./src/gatsbyNode/createPortfolioIndex")
const { createSkillIndexes } = require("./src/gatsbyNode/createSkillIndexes")
const {
  createSectionIndexes,
} = require("./src/gatsbyNode/createSectionIndexes")
const {
  createPortfolioPages,
} = require("./src/gatsbyNode/createPortfolioPages")

exports.onCreateNode = async params => await onCreateNode(params)

exports.createPages = async params => {
  await Promise.all([
    turnPagesIntoPages(params),
    turnResumeIntoPage(params),
    createPortfolioIndex(params),
    createSectionIndexes(params),
    createSkillIndexes(params),
    createPortfolioPages(params),
  ])
}
