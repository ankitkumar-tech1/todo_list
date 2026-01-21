/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'Inter', 'sans-serif']
      },
      colors: {
        bg: '#020617',
        surface: '#020617',
        surfaceSoft: 'rgba(15,23,42,0.85)',
        surfaceStrong: '#020617',
        accent: '#6366f1',
        accentSoft: 'rgba(99,102,241,0.1)',
        accentStrong: '#4f46e5',
        foreground: '#e5e7eb',
        muted: '#9ca3af',
        danger: '#f97373',
        success: '#4ade80'
      },
      boxShadow: {
        'glass-sm': '0 18px 45px rgba(15,23,42,0.55)',
        'glass-lg': '0 30px 80px rgba(15,23,42,0.9)'
      },
      backdropBlur: {
        glass: '22px'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      }
    }
  },
  plugins: []
};

