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
        lwfs1: "#011638",
        lwfs2: "#0d21a1",
        lwfs3: "#eef0f2",
        lwfs4: "#141414",
        lwfs5: "#eec643",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], // Add Inter as the default sans-serif
      },
    },
  },
  plugins: [],
}

