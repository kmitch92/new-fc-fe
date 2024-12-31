import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UserProvider } from '@/contexts/UserContext';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';
import { getCardsToReview } from '@/lib/api/handlers';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Flash Cards',
  description: 'Remembering Intelligently',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning={true}>
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
          {/* <UserProvider fetchedUser={sUser} fetchedDecks={decksToReview}> */}
          <Navbar />
          {children}
          <SiteFooter />
          {/* </UserProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
