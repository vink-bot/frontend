/** @type {import("tailwindcss").Config} */
const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000',
  white: '#fff',
  gray: {
    DEFAULT: '#999',
    lightest: '#f0f0f0',
  },
  yellow: {
    DEFAULT: '#ffd132',
  },
  orange: {
    DEFAULT: '#ff9a19',
  },
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: colors,
      keyframes: {
        heightFadeOut: {
          '0%': { visibility: 'hidden' },
          '100%': { height: '40px' },
        },
        heightFadeIn: {
          '0%': { height: '40px' },
          '50%': { height: '50%' },
          '100%': { height: '100%', visibility: 'show' },
        },
        fadeInMessage: {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease forwards',
        fadeInMessage: 'fadeInMessage 0.5s ease forwards',
        heightFadeOut: 'heightFadeOut 0.2s linear forwards',
        heightFadeIn: 'heightFadeIn 0.2s linear forwards',
      },
    },
    brightness: {
      25: '.25',
    },
  },
  plugins: [],
};
