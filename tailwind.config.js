/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#851E3B',      
          dark: '#64172C',         
          light: '#D23761',        
        },
        secondary: {
          DEFAULT: '#424651',      
          dark: '#2E3138',         
          light: '#848A9A',       
        },
      },
      fontFamily: {
        quicksand: ["quicksand", "serif"],
        atma: ["atma", "system-ui"],
        poppins: ["poppins", "sans-serif"],
        abel: ["abel", "serif"]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}