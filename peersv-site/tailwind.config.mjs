/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        paper: '#ffffff',
        soft: '#f5f5f5',
        line: '#e5e5e5',
        muted: '#666666',
        // Clubkleuren — alleen voor accenten (knoppen, lijntjes, hover)
        club: {
          red: '#d72638',
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
    },
  },
  plugins: [],
};
