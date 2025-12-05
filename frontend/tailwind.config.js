/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1600px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      colors: {
        'primary': '#ed3849',
        'primary-dark': "#d23141",
        'primary-light': '#f4e5ec',
        'text-dark': '#0f172a',
        'text-light': '#64748b',
        'extra-light': '#f8fafc'
      },
      
      keyframes:{
        fadeUp:{
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        zoomIn:{
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideLeft:{
          '0%': { opacity: 0, transform: 'translateX(-40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        shrimmer:{
          '0%': { backgroundPosition: '200% center' },
        '100%': { backgroundPosition: '-200% center' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blob2: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-50px, 30px) scale(1.1)' },
          '66%': { transform: 'translate(20px, -20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blob3: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, 20px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, -30px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation:{
        fadeUp: 'fadeUp 0.8s ease-out forwards',
        zoomIn: 'zoomIn 0.6s ease-out forwards',
        slideLeft: 'slideLeft 0.6s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        blob: 'blob 15s infinite ease-in-out',
        blob2: 'blob2 18s infinite ease-in-out',
        blob3: 'blob3 20s infinite ease-in-out',
      }
    },
  },
  plugins: [],
  darkMode: 'class', //Enable class-based dark mode
}

