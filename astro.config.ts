import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-expect-error
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    expressiveCode({
      themes: ["dracula"],
    }),
    mdx(),
  ],
});
