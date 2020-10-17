import React from "react"
import SocialLinks from "./social-links"

const SiteInfo = ({ siteInfo }) => (
  <section className="site-info bg-gray-100 p-6 relative border-t border-gray-300">
    <div className="container mx-auto flex items-center flex-col justify-center">
      <ul className="text-center pb-6">
        <li className="font-display font-thin text-xl leading-loose site-name pb-3">
          {siteInfo.title}
        </li>
        <li className="uppercase font-thin text-sm leading-loose pt-3">
          {siteInfo.description}
        </li>
      </ul>
      <SocialLinks links={siteInfo.social} />
    </div>
  </section>
)

export default SiteInfo
