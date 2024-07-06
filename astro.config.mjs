import { defineConfig } from "astro/config"
import icon from "astro-icon"
import mdx from "@astrojs/mdx"

import expressiveCode from "astro-expressive-code"

// https://astro.build/config
export default defineConfig({
  site: "https://www.niklasdahlqvist.com",
  integrations: [
    expressiveCode({
      themes: ["dracula"],
    }),
    icon({
      include: {
        fa: [
          "github-square",
          "external-link-square",
          "facebook-square",
          "twitter-square",
          "linkedin-square",
        ],
        "simple-icons": ["astro"],
      },
    }),
    mdx(),
  ],
})
