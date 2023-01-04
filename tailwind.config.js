/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'showcase': "url('/assets/showcase.png')",
        'btn': "url('/assets/button.png')",
        'contact-header': "url('/assets/contact.png')"
      },
      screens: {
        'lg': '790px',
      },
    },
    
  },
  plugins: [],
}
