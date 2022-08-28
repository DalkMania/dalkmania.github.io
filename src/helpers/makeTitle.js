export const makeTitle = pageContext => {
  const { currentPage, section, skill } = pageContext
  const title = currentPage >= 2 ? `Porfolio Page ${currentPage}` : "Portfolio"
  let description

  if (section !== undefined) {
    description = "Projects filed under " + section
  }

  if (skill !== undefined) {
    description = "Projects filed under " + skill
  }

  if (skill === undefined && section === undefined) {
    description = "Here is a bunch of stuff I have created."
  }

  return [title, description]
}
