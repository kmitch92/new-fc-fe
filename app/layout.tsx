import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UserProvider } from '@/contexts/UserContext';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';
import { getCardsToReview } from '@/lib/api/handlers';

export const metadata: Metadata = {
  title: 'Flash Cards',
  description: 'Remembering Intelligently',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const sUser = await useServerSessionUser();
  let decksToReview;
  if (sUser?.id) {
    const decksToReviewResponse = await getCardsToReview(sUser?.id as string);
    if (decksToReviewResponse.status === 200) { decksToReview = decksToReviewResponse.decks }
  }

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
          <UserProvider fetchedUser={sUser} fetchedDecks={decksToReview}>
            <Navbar />
            {children}
            <Footer />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
