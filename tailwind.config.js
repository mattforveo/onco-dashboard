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
        // Dark mode backgrounds
        dark: {
          primary: '#0D1117',
          secondary: '#161B22',
          tertiary: '#21262D',
          border: '#30363D',
        },
        // Accent colors
        accent: {
          blue: '#58A6FF',
          cyan: '#56D4DD',
          green: '#3FB950',
          orange: '#F78166',
          red: '#F85149',
          purple: '#BC8CFF',
        },
        // Cancer type colors
        cancer: {
          lymphoma: '#8B5CF6',
          solid: '#F59E0B',
          other: '#6B7280',
        },
        // Vaccine colors
        vaccine: {
          pfizer: '#0EA5E9',
          moderna: '#EF4444',
          astrazeneca: '#22C55E',
          jj: '#F97316',
          sputnik: '#8B5CF6',
          other: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
