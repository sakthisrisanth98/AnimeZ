/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',    // Extra small phones
        'sm': '640px',    // Small tablets
        'md': '1100px',   // Tablets (increased to cover 1080px width)
        'lg': '1200px',   // Laptops
        'xl': '1536px',   // Large screens
      },
    },
  },
  plugins: [],
}