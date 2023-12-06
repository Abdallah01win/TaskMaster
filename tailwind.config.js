/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#0a0a0aff',
          200: '#0f0f0fff',
          300: '#181818ff'
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
