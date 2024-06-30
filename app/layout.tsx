import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: 'Flash Cards',
  description: 'Remembering Intelligently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        style={{
          backgroundImage: 'url(/crosses-variant.png)',
          boxSizing: 'border-box',
          boxShadow:
            'inset 0 0 500px 200px hsl(var(--background)), inset 0 0 600px 300px hsl(var(--background))',
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
