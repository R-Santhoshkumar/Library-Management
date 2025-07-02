/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontSize: {
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '22px',
      '2xl': '26px',
      '3xl': '32px',
      '4xl': '40px',
      '5xl': '49px',
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        slab: ['Roboto Slab', 'serif'],
        cardi:['Cardo', 'serif']
      },
      colors: {
        'top-blue': '#00abe4',
        'white1': '#f5faff',
        'blue1': '#D5E4F5',
      }
    },
  },
  plugins: [],
}

