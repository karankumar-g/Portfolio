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
          dark: '#08090E',
          darker: '#05060A',
          card: '#0D0F18',
          'card-hover': '#131724',
          subtle: '#111420',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(59, 130, 246, 0.35)',
          light: '#F8FAFC',
          'light-card': '#FFFFFF',
          'light-subtle': '#F1F5F9',
        },
        accent: {
          blue: '#3B82F6',
          cobalt: '#2563EB',
          sky: '#0EA5E9',
          teal: '#14B8A6',
          emerald: '#10B981',
          amber: '#F59E0B',
          slate: '#64748B',
          // Compatibility fallbacks
          violet: '#3B82F6',
          indigo: '#2563EB',
          cyan: '#0EA5E9',
          coral: '#F43F5E',
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
        'spin-slow': 'spin 18s linear infinite',
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
        'hero-glow': 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.06) 45%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
