import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
    site: "https://www.niklasdahlqvist.com",
    trailingSlash: "always",
    markdown: {
        shikiConfig: {
            theme: "dracula"
        }
    },
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false
            }
        }),
        image({
            serviceEntryPoint: "@astrojs/image/sharp"
        }),
        mdx(),
        react()
    ]
});
