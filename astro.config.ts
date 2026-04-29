import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.niklasdahlqvist.com/",
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Raleway",
      cssVariable: "--font-raleway",
      weights: ["100 900"],
      subsets: ["latin"],
      styles: ["normal", "italic"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Merriweather",
      cssVariable: "--font-merriweather",
      weights: ["100 900"],
      subsets: ["latin"],
      styles: ["normal", "italic"],
    },
  ],
  integrations: [
    react(),
    expressiveCode({
      themes: ["dracula"],
    }),
    mdx(),
  ],
});
