/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/*.{html,js,jsx}',
    './src/static/*.{html,js,jsx}',
    './src/services/*.{html,js,jsx}',
    './public/index.html',
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
