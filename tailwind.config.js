/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#ffd132',
        'yellow-light': '#ffeaa3',
        white: '#ffffff',
        'blue-light': '#cfefff',
        'gray-light': '#e7e7e8',
        'gray-dark': '#616372',
        black: '#000000',
      },
    },
  },
  plugins: [],
};
