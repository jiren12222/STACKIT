import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0B0F1A',
        'light': '#F5F5F0',
        'teal': '#00D4AA',
        'green': '#14F195',
        'muted': '#9CA3AF',
        'muted-dark': '#6B7280',
      },
      backgroundColor: {
        'dark': '#0B0F1A',
        'light': '#F5F5F0',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'pulseGlow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 170, 0.6)' },
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config

export default config
