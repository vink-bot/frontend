/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: 'rgb(255, 209, 50)',
        white: 'rgb(255 255 255)',
        'blue-light': 'rgb(207 239 255)',
        'gray-light': 'rgb(231 231 232)',
        'gray-dark': 'rgb(97 99 114)',
        black: 'rgb(0 0 0)',
      },
    },
  },
  plugins: [],
};
