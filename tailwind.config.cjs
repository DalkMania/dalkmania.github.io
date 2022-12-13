/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        fontFamily: {
            display: ["Merriweather", "sans-serif"],
            body: ["Raleway", "sans-serif"]
        },
        extend: {
            colors: {
                "regal-blue": "#6189c6"
            }
        }
    },
    plugins: []
};
