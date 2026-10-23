/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'on-primary': '#ffffff',
        'surface-container-lowest': 'var(--surface-card)',
        'secondary-container': 'var(--sage-subtle)',
        'on-secondary-container': 'var(--sage)',
        'tertiary-container': 'var(--surface-raised)',
        surface: 'var(--surface-bg)',
        'surface-container': 'var(--surface-card)',
        'surface-container-low': 'var(--surface-subtle)',
        'surface-container-high': 'var(--surface-raised)',
        'on-surface': 'var(--text-body)',
        'on-surface-variant': 'var(--text-muted)',
        'outline-variant': 'var(--border-light)',
        'surface-card': 'var(--surface-card)',
        'surface-subtle': 'var(--surface-subtle)',
        'surface-raised': 'var(--surface-raised)',
        'on-surface-display': 'var(--text-display)',
        muted: 'var(--text-muted)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        secondary: 'var(--sage)',
        'secondary-subtle': 'var(--sage-subtle)',
        outline: 'var(--border-light)',
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
