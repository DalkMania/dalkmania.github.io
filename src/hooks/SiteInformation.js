import { useStaticQuery, graphql } from "gatsby"

export const useSiteInformation = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            description
            canonicalUrl
            social {
              fbLink
              githubLink
              linkedInLink
              twitterLink
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
