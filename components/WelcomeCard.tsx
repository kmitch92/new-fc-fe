import { IDeckOfCards, ISessionUser } from '@/lib/api/types/types';
import { IDeck } from '@/lib/api/models/deck-model';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';

interface IWelcomeCardProps {
  cardsToReview: IDeckOfCards[] | IDeck[] | [];
}

export async function WelcomeCard({ cardsToReview }: IWelcomeCardProps) {
  const sessionUser = (await useServerSessionUser()) as ISessionUser;

  console.dir('welcome card!!', {
    ...cardsToReview,
    proofItsInWelcomeCard: true,
  });
  return (
    <Card className="w-[300px] h-[400px]">
      <CardHeader>
        <CardTitle>Welcome, {sessionUser?.name}!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={sessionUser?.image as string}
          className="size-32 rounded-md"
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-8">
        {cardsToReview?.length > 0 && (
          <p>
            You have
            <strong>
              {cardsToReview.reduce((acc) => acc + 1, 0)} reviews
            </strong>{' '}
            in <strong>{cardsToReview.length} decks</strong>.
            <br /> Ready to get started?
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
