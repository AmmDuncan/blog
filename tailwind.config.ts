import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        purple: {
          600: '#451ebc',
          500: '#5222d0',
          DEFAULT: '#5222d0',
          400: '#602CE8',
          300: '#714cce',
          100: '#dad0f2',
        },
        grey: {
          950: '#020203',
          900: '#09090e',
          800: '#101019',
          700: '#191926',
          600: '#242435',
          DEFAULT: '#242435',
          500: '#313147',
          400: '#3a3a4f',
          300: '#4b4b62',
          200: '#8d8da7',
          100: '#d1d1d9',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'serif'],
      },
      boxShadow: {
        xl: '0 1.6rem 2.4rem rgba(0,0,0,.075),0 0 .2rem rgba(0,0,0,.03)',
        lg: '0 3.2rem 5.6rem -2.4rem rgba(75,75,98,.2),0 0 .4rem rgba(209,209,217,.25)',
      },
    },
  },
  plugins: [],
};
export default config;
