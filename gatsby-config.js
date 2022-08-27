module.exports = {
  pathPrefix: "/dalkmania.github.io",
  siteMetadata: {
    title: "Niklas Dahlqvist's Portfolio",
    description: "Just Another Portfolio",
    author: "Niklas Dahlqvist",
    canonicalUrl: "https://www.niklasdahlqvist.com",
    social: {
      fbLink: "https://www.facebook.com/ndahlqvist",
      twitterLink: "https://twitter.com/DalkMania",
      twitterUserName: "@DalkMania",
      linkedInLink: "http://www.linkedin.com/in/niklasdahlqvist",
      githubLink: "https://github.com/DalkMania",
    },
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1440,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Merriweather`,
              variants: [`300`, `900`],
            },
            {
              family: `Raleway`,
              subsets: [`latin`],
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/src/assets/svg`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/pages`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/portfolio`,
        name: "portfolio",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/education`,
        name: "education",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/experience`,
        name: "experience",
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-18219974-8`,
        // Puts tracking script in the head instead of the body
        head: true,
        // enable ip anonymization
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Niklas Dahlqvist's Portfolio`,
        short_name: `Niklas Dahlqvist's Portfolio`,
        start_url: `/`,
        background_color: `#90d0ec`,
        theme_color: `#ff6d70`,
        display: `minimal-ui`,
        icon: `static/favicon.png`, // The image at this location is 512x512.
      },
    },
  ],
}
