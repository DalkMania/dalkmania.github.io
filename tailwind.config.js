module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  content: ["./src/**/*.js", "./src/**/*.mdx", "./src/**/*.svg"],
  theme: {
    fontFamily: {
      display: ["Merriweather", "sans-serif"],
      body: ["Raleway", "sans-serif"],
    },
    extend: {
      colors: {
        "regal-blue": "#6189c6",
      },
    },
  },
  variants: {},
  plugins: [],
}
