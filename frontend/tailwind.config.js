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
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Primary Amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        cyber: {
          500: '#06b6d4',
          600: '#0891b2',
        },
        dark: {
          bg: '#090D14',
          surface: '#111827',
          elevated: '#162235',
          border: '#1F2E47',
          text: '#F1F5F9',
          muted: '#94A3B8',
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          elevated: '#F1F5F9',
          border: '#E2E8F0',
          text: '#0F172A',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.25)',
        'glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.25)',
      }
    },
  },
  plugins: [],
}
