/** Build: npm run build:css */
module.exports = {
  darkMode: 'class',
  content: ['./*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        brand: { red: '#C7222A', redDark: '#9F151C', redLight: '#E83842', charcoal: '#3E3E3E', slate: '#1E293B' }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        bengali: ['"Hind Siliguri"', 'sans-serif']
      }
    }
  }
};
