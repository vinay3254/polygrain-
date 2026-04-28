/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'app-background': 'transparent',
        'app-bg': 'transparent',
        'app-surface': '#1C1C1C',
        'app-card': '#1C1C1E',
        'app-primary': '#C9A84C',
        'app-secondary': '#F5E6A3',
        'app-ai': '#F5A800',
        'app-danger': '#EF4444',
        'app-text': '#FFFFFF',
        'app-muted': 'rgba(201, 168, 76, 0.6)',
      },
      fontFamily: {
        syne: ['Gotham', 'Montserrat', 'sans-serif'],
        'dm-sans': ['Gotham', 'Montserrat', 'sans-serif'],
        inter: ['Gotham', 'Montserrat', 'sans-serif'],
        poppins: ['Gotham', 'Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-cta': 'linear-gradient(90deg, #F5A800 0%, #F07820 100%)',
        'gradient-bg': 'linear-gradient(180deg, #1C1C1C 0%, #0D0D0D 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(20px, -30px)' },
          '50%': { transform: 'translate(-10px, -50px)' },
          '75%': { transform: 'translate(30px, -20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(-20px, 30px)' },
          '66%': { transform: 'translate(20px, -20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(245, 168, 0, 0.5)' },
        },
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'float-slower': 'float-slow 16s ease-in-out infinite reverse',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
