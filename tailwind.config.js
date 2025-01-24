/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // New way
  content: [
    './index.html',         // Include the main HTML file
    './src/**/*.{js,jsx}',  // Include all JavaScript/React files in the `src` directory
    './src/**/*.css',       // Include all CSS files in the `src` directory (if applicable)
  ],
  theme: {
    extend: {
      colors:{
        //Add custom colors here
        lw_dark_blue: "#070432",
        lw_blue: "#0F0A59",
        lw_yellow: "#FFC300",
        lw_red: "#FF0004",
        lw_green: "#009D34",
        lw_gray: "#D9D9D9",
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'], // Add Inter as the default sans-serif
      },
    },
  },
  plugins: [],
}

