export const slugify = (text: string | undefined) => {
  if (text) {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and") // Replace & with ‘and’
      .replace(/\s+/g, "-")
      .replace(/[^\w\\-]+/g, "")
      .replace(/\\-\\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  }
}
