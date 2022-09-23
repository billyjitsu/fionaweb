/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nfbGreen: "#80e1d6",  
        btmGreen: "#c7f8e3",
        btnYellow: "#ffdd0f",
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
}