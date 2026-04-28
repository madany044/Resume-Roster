/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        roast: {
          orange: '#c8622a',
          'orange-light': '#f5e8df',
          ink: '#0f0e0d',
          muted: '#7a7670',
          surface: '#faf9f7',
          surface2: '#f0ede8',
          surface3: '#e4e0d8',
          good: '#2a7a4a',
          'good-light': '#e6f4ec',
          warn: '#7a5c1a',
          'warn-light': '#faf0dc',
          danger: '#a33030',
          'danger-light': '#fceaea',
        },
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
