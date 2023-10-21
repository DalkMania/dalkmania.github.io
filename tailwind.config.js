/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      display: ["Merriweather", "sans-serif"],
      body: ["Raleway", "sans-serif"],
    },
    extend: {
      colors: {
        "regal-blue": "#0e54a3",
        "fb-hover": "#3b5998",
        "twitter-hover": "#55acee",
        "linkedin-hover": "#0077b5",
        "github-hover": "",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#222",
            a: {
              color: "#0e54a3",
              "&:hover": {
                color: "#2c5282",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
