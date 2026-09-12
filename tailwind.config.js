/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sepia-black': '#12100E',
        'cyber-charcoal': '#0F1117',
        'kasavu-gold': {
          DEFAULT: '#E5A93C',
          light: '#F5C869',
          dark: '#B88224'
        },
        'union-crimson': {
          DEFAULT: '#C85A32',
          bright: '#E84825',
          dark: '#963717'
        },
        'warm-cream': '#F4F1EA',
        'muted-bone': '#A39E93',
        'cyber-cyan': '#00F0FF',
        'cyber-emerald': '#10B981'
      },
      fontFamily: {
        serif: ['"Noto Serif Malayalam"', '"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Noto Serif Malayalam"', '"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', '"Noto Sans Malayalam"', '"Fira Code"', 'monospace'],
        sans: ['"Noto Sans Malayalam"', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'scanline': 'linear-gradient(rgba(18, 16, 14, 0) 50%, rgba(0, 0, 0, 0.4) 50%)'
      }
    },
  },
  plugins: [],
}
