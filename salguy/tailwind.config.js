/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-diagonal': 'linear-gradient(135deg, #FFEEDF 10%, #FFF8F1 41%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
}
