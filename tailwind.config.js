/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#08090D',
          darker: '#050608',
          card: '#0E1017',
          'card-hover': '#141824',
          subtle: '#121520',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(124, 58, 237, 0.3)',
          light: '#F8FAFC',
          'light-card': '#FFFFFF',
          'light-subtle': '#F1F5F9',
        },
        accent: {
          violet: '#7C3AED',
          indigo: '#6366F1',
          cyan: '#06B6D4',
          teal: '#22D3EE',
          amber: '#F59E0B',
          coral: '#F43F5E',
          emerald: '#10B981',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-line': 'glowLine 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        glowLine: {
          '0%, 100%': { opacity: '0.4', transform: 'translateX(-100%)' },
          '50%': { opacity: '1', transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 20%, rgba(124, 58, 237, 0.15), rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
