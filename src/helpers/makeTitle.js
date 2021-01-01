export const makeTitle = pageContext => {
  const { page, section, skill } = pageContext
  const title = page >= 2 ? `Porfolio Page ${page}` : "Portfolio"
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
