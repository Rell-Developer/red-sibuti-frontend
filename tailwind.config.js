/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        color1:"#F1F1F1",
        color2:"#80ED99",
        color3:"#57CC99",
        color4:"#38A3A5",
        color5:"#22577A",
        color6:"#353535"
      }
    },
  },
  plugins: [],
}

