/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
    screens: {
      'md': '768px',
      'lg': '1150px'
    }
  },
  plugins: [],
}
