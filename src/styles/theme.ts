import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#0070f3',
    secondary: '#1a73e8',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#171717',
    textSecondary: '#4a4a4a',
    border: '#e0e0e0',
    error: '#d32f2f',
    success: '#2e7d32',
  },
  shadows: {
    small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    medium: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    large: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  }
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#66b3ff',
    secondary: '#82b1ff',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#f5f5f5',
    textSecondary: '#b3b3b3',
    border: '#333333',
    error: '#f44336',
    success: '#4caf50',
  },
  shadows: {
    small: '0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.36)',
    medium: '0 3px 6px rgba(0,0,0,0.28), 0 2px 4px rgba(0,0,0,0.24)',
    large: '0 10px 20px rgba(0,0,0,0.28), 0 3px 6px rgba(0,0,0,0.22)',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  }
}; 