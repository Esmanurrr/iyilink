/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 'baloo' adını verdiğimiz özel bir Tailwind sınıfı oluşturuyoruz.
        "baloo": ['"Baloo"', "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
