'use client';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

type Props = {
  children: React.ReactNode;
};

export const ClientThemeWrapper = ({ children }: Props) => {
  const { theme } = useContext(ThemeContext);
  return <div data-theme={theme}>{children}</div>;
};
