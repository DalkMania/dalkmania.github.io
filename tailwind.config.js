module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: [
    './src/**/*.js',
    './src/**/*.mdx'
  ],
  theme: {
    fontFamily: {
      display: ["Merriweather Black", "sans-serif"],
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
