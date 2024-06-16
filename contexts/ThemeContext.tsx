'use client';
import { useEffect, useState, createContext } from 'react';

interface ThemeContextType {
  theme: string;
  changeTheme: Function;
}

const initialTheme: ThemeContextType = {
  theme: 'winter',
  changeTheme: () => {},
};

type Props = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ThemeContextType>(initialTheme);

function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<string>('winter');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const localTheme = localStorage.getItem('theme') || 'winter';
    setTheme(localTheme);
  }, []);

  if (!isMounted) return <></>;

  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
