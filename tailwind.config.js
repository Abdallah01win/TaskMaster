/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#070600'
        },
        light: {
          100: '#FDFDFF'
        },
        lightBlue: '#358EF1'
      }
    }
  },
  plugins: []
}
