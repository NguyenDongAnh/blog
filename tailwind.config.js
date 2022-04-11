module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'sekeleton': 'sekeleton 1s ease infinite'
      },
      keyframes: {
        'sekeleton': {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}