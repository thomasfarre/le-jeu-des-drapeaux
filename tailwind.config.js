/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        baloo: ["'Baloo 2'", "sans-serif"],
      },
      fontSize: {
        title: "3.25rem",
      },
      borderRadius: {
        card: "3rem",
        btn: "3.75rem",
      },
    },
  },
  plugins: [],
};
