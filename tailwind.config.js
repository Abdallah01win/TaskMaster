/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        dark: {
          100: '#010101',
          200: '#0A0A0A',
          300: '#0F0F0F',
        },
        light: {
          100: '#FDFDFF',
        },
        ash: { 100: '#1b1b1b', 200: '#646464', 300: '#b1b0b6' },
        lightBlue: '#0469ff',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
