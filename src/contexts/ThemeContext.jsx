import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return false;
    
    // Get saved preference or default to false
    const saved = localStorage.getItem('nab-theme');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    
    // Check system preference but default to light for enterprise app
    return false;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('nab-theme', JSON.stringify(isDark));
    
    // Apply theme to document with smooth transition
    const root = document.documentElement;
    
    // Add transition class temporarily
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      // Set CSS custom properties for enterprise dark theme
      root.style.setProperty('--nav-bg', '#0f172a');
      root.style.setProperty('--nav-border', '#334155');
      root.style.setProperty('--card-bg', '#1e293b');
      root.style.setProperty('--card-border', '#475569');
      root.style.setProperty('--text-primary', '#f8fafc');
      root.style.setProperty('--text-secondary', '#cbd5e1');
      root.style.setProperty('--sidebar-bg', '#0c1426');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      // Set CSS custom properties for enterprise light theme
      root.style.setProperty('--nav-bg', '#ffffff');
      root.style.setProperty('--nav-border', '#e2e8f0');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--card-border', '#e2e8f0');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--sidebar-bg', '#f8fafc');
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    const themeColor = isDark ? '#0f172a' : '#ffffff';
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = themeColor;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    
    // Remove transition after animation
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};