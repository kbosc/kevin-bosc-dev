import type {ReactNode} from 'react';
import {createContext, useCallback, useEffect, useState} from 'react';
import type {Theme} from '@/types';

// ---------------------------------------------------
// Context shape
// ---------------------------------------------------

interface ThemeContextValue {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
/* eslint-disable-next-line react-refresh/only-export-components */
export { ThemeContext };

// ---------------------------------------------------
// Helper — read initial theme
// ---------------------------------------------------

const STORAGE_KEY = 'theme-preference';

function getInitialTheme(): Theme {
    // 1. Check localStorage for saved preference
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    // 2. Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

// ---------------------------------------------------
// Provider component
// ---------------------------------------------------

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    const isDark = theme === 'dark';

    const toggleTheme = useCallback(() => {
        setTheme((currentTheme) => {
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            return nextTheme;
        });
    }, []);

    // Apply theme to <html> element and persist to localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const contextValue: ThemeContextValue = {
        theme,
        isDark,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

