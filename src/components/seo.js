import React from "react"
import { useSiteInformation } from "../hooks/SiteInformation"
import { normalizeUrl } from "../helpers/normalizeUrl"

const SEO = ({ description, title, slug, children }) => {
  const data = useSiteInformation()

  const metaDescription = description || data?.description
  const defaultTitle = data?.title
  const url = normalizeUrl(data.canonicalUrl + "/" + slug)

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={data.social.twitterUserName || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default SEO
