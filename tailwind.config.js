/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ml-blue': '#3483FA',
        'ml-yellow': '#fff159',
        'ml-gray': '#EBEBEB',
        'ml-black': '#333333',
      },
    },
  },
  plugins: [],
}