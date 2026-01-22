'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-light-muted dark:bg-surface-dark-muted animate-pulse"
        disabled
        aria-label="Loading theme toggle"
      />
    );
  }

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-2 md:focus:ring-4 ${
        isDark 
          ? 'bg-gradient-dark focus:ring-accent-600/50 shadow-md md:shadow-lg shadow-dark-glow' 
          : 'bg-gradient-accent focus:ring-accent-400/50 shadow-md md:shadow-lg'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icons container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Sun 
          className={`absolute w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-500 ${
            isDark 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
          }`}
          strokeWidth={2.5}
        />
        <Moon 
          className={`absolute w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-500 ${
            isDark 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`}
          strokeWidth={2.5}
        />
      </div>
      
      {/* Inner glow effect for dark mode */}
      <div className={`absolute inset-1.5 md:inset-2 rounded-full bg-white/20 transition-all duration-300 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Subtle border */}
      <div className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
        isDark 
          ? 'border-accent-500/30' 
          : 'border-accent-400/30'
      }`} />
    </button>
  );
}