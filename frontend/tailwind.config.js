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
        'primary': '#0040e0',
        'primary-container': '#2e5bff',
        'on-primary': '#ffffff',
        'primary-fixed': '#dde1ff',
        'on-primary-fixed': '#001356',
        'secondary': '#545f73',
        'secondary-container': '#d5e0f8',
        'on-secondary-container': '#111c2d',
        'surface': '#f7f9fb',
        'on-surface': '#191c1e',
        'surface-variant': '#e1e2ec',
        'on-surface-variant': '#44474f',
        'surface-container': '#eceef0',
        'surface-container-high': '#e6e8ea',
        'surface-container-highest': '#e0e3e5',
        'outline': '#737686',
        'outline-variant': '#c3c6d7',
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'background': '#f7f9fb',
        'on-background': '#191c1e',
        'text-dark': '#0f172a',
        'text-light': '#64748b',
        'extra-light': '#f8fafc'
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"],
        "manrope": ["Manrope", "sans-serif"],
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
        shimmer:{
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        }
      },
      animation:{
        fadeUp: 'fadeUp 0.8s ease-out forwards',
        zoomIn: 'zoomIn 0.6s ease-out forwards',
        slideLeft: 'slideLeft 0.6s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class', //Enable class-based dark mode
}

