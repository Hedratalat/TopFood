/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        hacen: ['"Hacen Egypt"', "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#5f823a", // main green color
          light: "#88a15f", //green light derived
          dark: "#3f5b26", // green dark derived
        },
        secondary: {
          DEFAULT: "#d64727", // main red color
          light: "#e77a5b", // red light derived
          dark: "#a5351c", // red dark derived
        },
        //
        accent: {
          light: "#f1f5f2", // Light accent color for backgrounds, highlights, or subtle UI elements
          dark: "#222222", // Dark accent color for text, footers, or contrasting elements
        },
      },
    },
  },
  plugins: [],
};
