import React from "react"
import { useSiteInformation } from "../hooks/SiteInformation"
import Header from "../components/header"
import SiteInfo from "../components/site-info"
import Footer from "../components/footer"
import "../assets/css/base.css"

const Layout = ({ children }) => {
  const data = useSiteInformation()
  return (
    <div id="wrapper" className="site">
      <Header />
      <main id="content" className="hfeed site-main" role="main">
        <div className="container mx-auto p-3 relative">{children}</div>
      </main>
      <SiteInfo siteInfo={data} />
      <Footer />
    </div>
  )
}

export default Layout
