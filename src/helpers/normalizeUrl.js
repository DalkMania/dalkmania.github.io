// Normalize URL by removing duplicates and triplicates, but retaining protocols.
export const normalizeUrl = url => {
  return `${url}/`.replace(/([^:]\/)\/+/g, "$1")
}
