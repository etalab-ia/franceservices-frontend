/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,tsx}', './src/components/**/*.{html,tsx}'],
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  theme: {
    screens: {
      sm: '576px',
      md: '960px',
      lg: '1440px',
    },
  },
}
