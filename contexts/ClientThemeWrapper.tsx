'use client';
import { useContext, PropsWithChildren } from 'react';
import { ThemeContext } from './ThemeContext';

export const ClientThemeWrapper = ({ children }: PropsWithChildren) => {
  const { theme } = useContext(ThemeContext);

  return <div data-theme={theme}>{children}</div>;
};
