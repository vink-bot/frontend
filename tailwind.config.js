/** @type {import("tailwindcss").Config} */
const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000',
  white: '#fff',
  blue: {
    DEFAULT: '#1da1f2',
    dark: '#2a90e9',
    light: '#87ceeb',
  },
  gray: {
    darkest: '#37383a',
    darker: '#4a4a4a',
    dark: '#666',
    DEFAULT: '#999',
    light: '#ccc',
    lighter: '#e8e8e8',
    lightest: '#f0f0f0',
  },
  green: {
    DEFAULT: '#41b883',
    light: '#b6ed8b',
  },
  red: {
    DEFAULT: '#ff5268',
  },
  yellow: {
    DEFAULT: '#ffd132',
    light: '#ffeaa3',
  },
  orange: {
    DEFAULT: '#ff9a19',
    light: '#ffbf00',
  },
  indigo: {
    DEFAULT: '#5897fb',
  },
  pink: {
    DEFAULT: '#ff9c7d',
  },
  purple: {
    DEFAULT: '#dbedfb',
  },
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: colors,
      keyframes: {
        heightHide: {
          '0%': { height: 0, opacity: 0 },
          '50%': { height: '50%' },
          '100%': { height: '100%', opacity: 100 },
        },
        fadeInWord: {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInWord: 'fadeInWord 0.5s ease forwards',
      },
    },
  },
  plugins: [],
};
