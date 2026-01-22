/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary Colors (from your palette)
        brand: {
          accent: '#c08301',      // Couleur d'accent (gold)
          dark: '#181306',        // Couleur foncée (near black)
          light: '#FFF9EB',       // Couleur claire (cream)
        },
        
        // Extended accent palette (gold variations)
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#c08301',         // Main brand accent
          600: '#a67001',
          700: '#8c5e01',
          800: '#724d01',
          900: '#583c01',
          950: '#3e2a01',
        },
        
        // Extended dark palette (warm blacks and grays)
        dark: {
          50: '#f8f7f6',
          100: '#e8e5e1',
          200: '#d1cbc3',
          300: '#b3a99d',
          400: '#8a7c6d',
          500: '#5a4f43',
          600: '#3d352c',
          700: '#2d261f',
          800: '#1f1a14',
          900: '#181306',          // Main brand dark
          950: '#0f0d04',
        },
        
        // Extended light palette (warm neutrals)
        light: {
          50: '#ffffff',
          100: '#FFF9EB',          // Main brand light
          200: '#FFF5D6',
          300: '#FFF0C1',
          400: '#FFEBAC',
          500: '#FFE697',
          600: '#F5D97F',
          700: '#E5C96F',
          800: '#D5B95F',
          900: '#C5A94F',
        },
        
        // Semantic colors matching brand palette
        primary: {
          DEFAULT: '#c08301',
          light: '#fbbf24',
          dark: '#a67001',
        },
        
        secondary: {
          DEFAULT: '#181306',
          light: '#3d352c',
          dark: '#0f0d04',
        },
        
        // UI State colors (adjusted to match warm palette)
        success: {
          light: '#d1fae5',
          DEFAULT: '#10b981',
          dark: '#047857',
        },
        warning: {
          light: '#fef3c7',
          DEFAULT: '#f59e0b',
          dark: '#b45309',
        },
        error: {
          light: '#fee2e2',
          DEFAULT: '#ef4444',
          dark: '#b91c1c',
        },
        info: {
          light: '#dbeafe',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
        
        // Surface colors (flattened for easy use)
        'surface-light-base': '#ffffff',
        'surface-light-elevated': '#FFF9EB',
        'surface-light-muted': '#f8f7f6',
        'surface-dark-base': '#0f0d04',
        'surface-dark-elevated': '#181306',
        'surface-dark-muted': '#2d261f',
        
        // Text colors (flattened)
        'text-light-primary': '#181306',
        'text-light-secondary': '#3d352c',
        'text-light-muted': '#5a4f43',
        'text-light-inverse': '#FFF9EB',
        'text-dark-primary': '#FFF9EB',
        'text-dark-secondary': '#FFF5D6',
        'text-dark-muted': '#d1cbc3',
        'text-dark-inverse': '#181306',
        
        // Border colors (flattened)
        'border-light': '#e8e5e1',
        'border-light-strong': '#d1cbc3',
        'border-light-accent': '#c08301',
        'border-dark': '#2d261f',
        'border-dark-strong': '#3d352c',
        'border-dark-accent': '#c08301',
      },
      
      backgroundImage: {
        // Brand gradients
        'gradient-accent': 'linear-gradient(135deg, #fbbf24 0%, #b9a001 50%, #d89001 100%)',
        'gradient-accent-soft': 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #c08301 100%)',
        'gradient-dark': 'linear-gradient(135deg, #2d261f 0%, #181306 50%, #0f0d04 100%)',
        'gradient-light': 'linear-gradient(135deg, #ffffff 0%, #FFF9EB 50%, #FFF5D6 100%)',
        
        // Directional gradients
        'gradient-accent-to-r': 'linear-gradient(to right, #fbbf24, #c08301)',
        'gradient-accent-to-b': 'linear-gradient(to bottom, #fbbf24, #c08301)',
        'gradient-warm': 'linear-gradient(135deg, #c08301 0%, #b45309 100%)',
        
        // Page backgrounds
        'page-light': 'linear-gradient(to bottom right, #ffffff, #FFF9EB)',
        'page-dark': 'linear-gradient(to bottom right, #0f0d04, #181306)',
        
        // Overlay gradients
        'overlay-accent': 'linear-gradient(180deg, transparent 0%, rgba(192, 131, 1, 0.8) 100%)',
        'overlay-dark': 'linear-gradient(180deg, transparent 0%, rgba(24, 19, 6, 0.9) 100%)',
      },
      
      boxShadow: {
        'accent-sm': '0 2px 8px -2px rgba(192, 131, 1, 0.3)',
        'accent': '0 4px 16px -4px rgba(192, 131, 1, 0.4)',
        'accent-lg': '0 10px 40px -10px rgba(192, 131, 1, 0.5)',
        'accent-xl': '0 20px 60px -15px rgba(192, 131, 1, 0.6)',
        
        'dark-sm': '0 2px 8px -2px rgba(24, 19, 6, 0.3)',
        'dark': '0 4px 16px -4px rgba(24, 19, 6, 0.4)',
        'dark-lg': '0 10px 40px -10px rgba(24, 19, 6, 0.5)',
        'dark-xl': '0 20px 60px -15px rgba(24, 19, 6, 0.6)',
        
        'glow-accent': '0 0 20px rgba(192, 131, 1, 0.4)',
        'glow-light': '0 0 20px rgba(255, 249, 235, 0.4)',
        
        'inner-accent': 'inset 0 2px 4px 0 rgba(192, 131, 1, 0.1)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(24, 19, 6, 0.1)',
      },
      
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

