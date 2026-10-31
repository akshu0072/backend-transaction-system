/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fintech: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          primary: '#2563EB',
          'primary-dark': '#1D4ED8',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          success: '#16A34A',
          error: '#DC2626',
          warning: '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.06)',
        'card-hover': '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
