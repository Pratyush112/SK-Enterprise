/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Keep dual light and dark mode support
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1600px',
        'container-max': '1280px',
        'custom-1200': '1200px',
        'custom-900': '900px',
      },
      colors: {
        // Cargokite / AMES Industrial Palette (Bright & Light Theme)
        'bg-dark': '#ffffff',      // Remapped: Bright pure white surface
        'bg-light': '#f8fafc',     // Clean slate-50 architectural background
        'bg-paper': '#f1f5f9',     // Slate-100 secondary container
        'accent': '#00b4d8',       // Bright eye-appealing Cargokite cyan
        'accent-hover': '#0096c7',
        'accent-bright': '#0088cc', // Deep cyan highlight
        'accent-ochre': '#b5622b', // AMES safari-khaki / ochre
        'muted': '#64748b',        // Slate-500 readable muted text
        
        // Re-mapped semantic tokens for bright light theme
        'primary': '#00b4d8',
        'primary-container': '#e0f2fe',
        'on-primary': '#ffffff',
        'primary-fixed': '#bae6fd',
        'on-primary-fixed': '#0369a1',
        'secondary': '#64748b',
        'secondary-container': '#f1f5f9',
        'on-secondary-container': '#0f172a',
        'surface': '#ffffff',
        'on-surface': '#0f172a',
        'surface-dark': '#ffffff',
        'on-surface-dark': '#0f172a',
        'text-dark-bg': '#0f172a',
        'text-light-bg': '#0f172a',
        'surface-card': '#ffffff',
        'surface-card-dark': '#ffffff',
        'surface-variant': '#f1f5f9',
        'on-surface-variant': '#334155',
        'outline': '#cbd5e1',
        'outline-variant': '#e2e8f0',
        'error': '#ef4444',
      },
      fontFamily: {
        "headline": ["'Archia'", "'Archia Regular'", "sans-serif"],
        "body": ["'Plus Jakarta Sans'", "sans-serif"],
        "sans": ["'Plus Jakarta Sans'", "sans-serif"],
        "serif": ["'Lora'", "serif"],
        "subheadline": ["'Lora'", "serif"],
        "accent": ["'Lora'", "serif"],
        "label": ["'Plus Jakarta Sans'", "sans-serif"],
        "manrope": ["'Plus Jakarta Sans'", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      spacing: {
        'section-sm': '4rem',      // 64px mobile
        'section-md': '5rem',      // 80px tablet
        'section-lg': '8rem',      // 128px desktop
        'section-xl': '10rem',     // 160px large desktop
      },
      borderRadius: {
        'industrial-sm': '6px',
        'industrial-md': '12px',
        'industrial-lg': '20px',
      },
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
      }
    },
  },
  plugins: [],
}

