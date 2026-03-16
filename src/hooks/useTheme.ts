import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

/**
 * Hook to access the current theme and toggle function.
 * Must be used within a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

