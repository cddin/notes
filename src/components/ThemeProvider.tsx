'use client';

import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '@/styles/theme';
import StyledComponentsRegistry from './StyledComponentsRegistry';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rendering with incorrect theme on server side
    return <>{children}</>;
  }

  return (
    <StyledComponentsRegistry>
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        value={{
          light: 'light',
          dark: 'dark',
          system: 'system',
        }}
      >
        <ThemeWrapper>{children}</ThemeWrapper>
      </NextThemeProvider>
    </StyledComponentsRegistry>
  );
}

function ThemeWrapper({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(lightTheme);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setTheme(resolvedTheme === 'dark' ? darkTheme : lightTheme);
  }, [resolvedTheme]);

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
} 