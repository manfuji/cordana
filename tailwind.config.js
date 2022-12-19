const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Proxima Nova', ...defaultTheme.fontFamily.sans],
        Poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        'Poppins-base': ['Poppins base', ...defaultTheme.fontFamily.sans],
        'Poppins-normal': ['Poppins normal', ...defaultTheme.fontFamily.sans],
        'Poppins-semibold': [
          'Poppins semibold',
          ...defaultTheme.fontFamily.sans,
        ],
        'Poppins-bold': ['Poppins bold', ...defaultTheme.fontFamily.sans],
        'Poppins-extra': ['Poppins extra', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
