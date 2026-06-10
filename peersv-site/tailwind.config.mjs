/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        'ink-deep': '#0d0d0f',
        anthracite: '#1a1a1d',
        paper: '#ffffff',
        soft: '#f5f5f5',
        line: '#e5e5e5',
        muted: '#666666',
        // Clubkleuren — krachtige accenten tegen donker
        club: {
          red: '#d72638',
          'red-dark': '#a81d2c',
          yellow: '#f9c80e',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'card-hover': '0 20px 40px -20px rgba(0, 0, 0, 0.35)',
        'glow-red': '0 0 40px rgba(215, 38, 56, 0.35)',
        'glow-yellow': '0 0 40px rgba(249, 200, 14, 0.35)',
      },
      letterSpacing: {
        display: '-0.02em',
      },
    },
  },
  plugins: [],
};
