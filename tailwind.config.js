/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      margin: {
        13: 13 / 4 + 'rem',
      },
      padding:{
        13: "3.3.25rem"
      },
      colors: {
        batata: '#09c', // this will be without shades of color
        matata: {
          50: '#c1effe',
          100: '#90e3ff',
          200: '#5fd7ff',
          300: '#2ecaff',
          400: '#00bdfc',
          500: '#09c',
          600: '#00749b',
          700: '#004f6a',
          800: '#002a39',
          900: '#000608',
        }
      },
      screens: {
        '3xl': '1700px',
      },

    },
  },
  plugins: [heroui()],
  darkMode: 'class', // media same as a system theme - class >> put it on body tag and control the theme using JS  - mode >> 
}

