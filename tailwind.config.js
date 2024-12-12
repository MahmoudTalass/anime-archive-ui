/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dominant: "#17152F",
        complementary: "#443F5D",
        accent: "#B8ACCD",
        otherPurple: "#494395",
      },
    },
  },
  plugins: [],
};
