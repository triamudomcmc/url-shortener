/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem"
    },
    extend: {
      colors: {
        malt: {
          100: "#FEF8F2",
          200: "#F9F3ED"
        },
        lapis: {
          600: "#2E6CF6"
        }
      }
    }
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/line-clamp")]
}
