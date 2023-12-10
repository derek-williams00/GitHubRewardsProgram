/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'github-white': '#fafafa',
        'github-gray': '#f5f5f5',
        'github-black': '#333',
        'github-red': '#bd2c00',
        'github-green': '#6cc644',
        'github-blue': '#4078c0',
        'hover-green': '#44b03a',
        'hover-red': '#a80202',
        'hover-blue': '#375fb0',
      },
    },
    fontFamily: {
      body: ['Roboto', 'sans-serif'],
    },
    keyframes: {
      appear: {
        '0%': { opacity: '0%' },
        '100%': { opacity: '100%' },
      },
      popup: {
        '0%': { transform: 'scale(0.95)' },
        '100%': { transform: 'scale(1)' },
      },
    },
    animation: {
      appear: 'appear 0.3s ease-in',
      popup: 'popup 0.3s ease-in-out',
    },
  },

  plugins: [],
};
