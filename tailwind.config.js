/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: 'rgb(var(--brand-yellow) / <alpha-value>)',
          orange: 'rgb(var(--brand-brown-yellow) / <alpha-value>)',
          red: 'rgb(var(--brand-scarlet) / <alpha-value>)',
          choc: 'rgb(var(--brand-dark) / <alpha-value>)',
          cream: 'rgb(var(--brand-tile) / <alpha-value>)',
          soft: 'rgb(var(--brand-potato) / <alpha-value>)',
          crimson: 'rgb(var(--brand-crimson) / <alpha-value>)',
          scarlet: 'rgb(var(--brand-scarlet) / <alpha-value>)',
          charred: 'rgb(var(--brand-charred) / <alpha-value>)',
          potato: 'rgb(var(--brand-potato) / <alpha-value>)',
          tile: 'rgb(var(--brand-tile) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pop: '0 5px 0 0 rgb(var(--brand-dark))',
        card: '0 10px 30px -12px rgb(var(--brand-dark) / .25)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: '.6' }, '100%': { transform: 'scale(1.7)', opacity: '0' } },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        'spin-slow': 'spinSlow 40s linear infinite',
        'spin-slower': 'spinSlow 70s linear infinite reverse',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
