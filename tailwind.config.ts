import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom color palette based on original design
        cream: {
          50: '#fcfcf9',
          100: '#fffffd',
        },
        charcoal: {
          700: '#1f2121',
          800: '#262828',
        },
        slate: {
          500: '#626c71',
          900: '#13343b',
        },
        teal: {
          300: '#32b8c6',
          400: '#2da6b2',
          500: '#21808d',
          600: '#1d7480',
          700: '#1a6873',
          800: '#2996a1',
        },
        brown: {
          600: '#5e5240',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#f5f5f5',
          300: '#a7a9a9',
          400: '#777c7c',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        typing: {
          'from': {
            width: '0',
          },
          'to': {
            width: '100%',
          },
        },
        blink: {
          '0%, 50%': {
            opacity: '1',
          },
          '51%, 100%': {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
