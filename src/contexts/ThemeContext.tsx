'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CulturalTheme, ThemeContextType } from '@/types';
import { CULTURAL_THEMES, DEFAULT_THEME } from '@/lib/themes/cultural-themes';
import { ThemeService } from '@/lib/themes/theme-service';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<CulturalTheme>(DEFAULT_THEME);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize theme on mount
    const initializeTheme = () => {
      try {
        const savedTheme = ThemeService.initializeTheme();
        setCurrentTheme(savedTheme);
      } catch (error) {
        console.warn('Failed to initialize theme:', error);
        setCurrentTheme(DEFAULT_THEME);
        ThemeService.applyThemeToDocument(DEFAULT_THEME);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  const setTheme = (themeId: string) => {
    const newTheme = CULTURAL_THEMES.find(theme => theme.id === themeId) || DEFAULT_THEME;
    
    setCurrentTheme(newTheme);
    ThemeService.saveTheme(newTheme.id);
    ThemeService.applyThemeToDocument(newTheme);
  };

  const contextValue: ThemeContextType = {
    currentTheme,
    availableThemes: CULTURAL_THEMES,
    setTheme,
    isLoading
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook to get theme-aware CSS classes
export function useThemeClasses() {
  const { currentTheme } = useTheme();
  
  return {
    primary: `bg-[${currentTheme.colors.primary}] text-white`,
    secondary: `bg-[${currentTheme.colors.secondary}] text-white`,
    accent: `bg-[${currentTheme.colors.accent}] text-white`,
    gradient: `bg-gradient-to-br from-[${currentTheme.colors.primary}] to-[${currentTheme.colors.secondary}]`,
    border: `border-[${currentTheme.colors.primary}]`,
    text: `text-[${currentTheme.colors.primary}]`,
    hover: `hover:bg-[${currentTheme.colors.primary}] hover:text-white`,
    culturalPattern: `theme-${currentTheme.id}`,
  };
}