/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0B1426',
        'navy-light': '#1A2332',
        'glow-blue': '#4A90E2',
        'glow-purple': '#8B5CF6',
        'export-primary': '#1E40AF',
        'export-secondary': '#3B82F6',
        'export-accent': '#F59E0B',
        'export-success': '#10B981',
        'export-warning': '#F59E0B',
        'export-error': '#EF4444',
        'export-dark': '#0F172A',
        'export-light': '#F8FAFC',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #4A90E2, 0 0 10px #4A90E2, 0 0 15px #4A90E2' },
          '100%': { boxShadow: '0 0 10px #4A90E2, 0 0 20px #4A90E2, 0 0 30px #4A90E2' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}


