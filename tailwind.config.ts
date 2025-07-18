import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,md}',
    './node_modules/reveal.js/**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: '#00FF85',
          dark:   '#20DC8E'
        },
        brand: {
          black: '#000000',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        mint: '0 0 10px #00FF85'
      }
    }
  },
  plugins: []
};

export default config;
