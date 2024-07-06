import { defineConfig } from "astro/config"
import icon from "astro-icon"
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [
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
  plugins: ["prettier-plugin-astro"],
})
