import { defineConfig } from "astro/config"
import icon from "astro-icon"
import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"

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
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
  plugins: ["prettier-plugin-astro"],
})
