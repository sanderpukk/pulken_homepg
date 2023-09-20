import type { Config } from 'tailwindcss'

const withMT = require("@material-tailwind/react/utils/withMT");
const fontFamily = {
  sans: ["Roboto", "sans-serif"],
  serif: ["Roboto Slab", "serif"],
  body: ["Roboto", "sans-serif"],
};

const config: Config = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      fontFamily: {
        "Montserrat": ["Montserrat", "sans-serif"],
        "Montserrat-header": ["Montserrat-500", "sans-serif"],
        "Maven-Pro": ["Maven Pro", "sans-serif"]
       },
      colors: {
        'nav-red': '#5f0707',
        'footer-text-color': '#e8d1d2',
        'title-color': '#fdfdd5'
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        }
      },
      animation: {
        slideIn: "slideIn 1.5s ease-in-out"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'background-globe': "url('globe.jpg')"  
      },
    },
  },
  plugins: [],
})
export default config
