/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles if using other CSS frameworks like DSFR
  },
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '960px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
}
