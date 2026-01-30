/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // KINU Horizonte Vivo Design System
        kinu: {
          night: '#0F172A',
          deep: '#1E293B',
          surface: '#334155',
          emerald: {
            light: '#6EE7B7',
            DEFAULT: '#10B981',
            dark: '#059669',
            deep: '#047857',
          },
          horizon: {
            light: '#7DD3FC',
            DEFAULT: '#0EA5E9',
            dark: '#0284C7',
          },
          gold: {
            light: '#FDE047',
            DEFAULT: '#EAB308',
            muted: 'rgba(234, 179, 8, 0.3)',
          },
          gray: {
            100: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
          },
          white: '#F8FAFC',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'kinu': '16px',
        'kinu-lg': '20px',
        'kinu-xl': '24px',
      },
      boxShadow: {
        'kinu': '0 4px 20px rgba(16, 185, 129, 0.15)',
        'kinu-lg': '0 8px 40px rgba(16, 185, 129, 0.2)',
        'gold': '0 4px 20px rgba(234, 179, 8, 0.2)',
      },
      backdropBlur: {
        'kinu': '20px',
      },
      animation: {
        'silk': 'silk 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        silk: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(234, 179, 8, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(234, 179, 8, 0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
