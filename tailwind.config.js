/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#1E90FF",
        background: "#E9ECEF",
        text: "#212529",
        success: "#28A745",
        danger: "#DC3545",
        warning: "#FFC107",
        info: "#17A2B8",
        light: "#FFFFFF",
        dark: "#000000",
      },
    },
  },
  plugins: [],
}
