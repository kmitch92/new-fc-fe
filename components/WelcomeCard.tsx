import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ISessionUser } from '@/lib/api/types/types';
import { IReviewInfo } from './draggable/Draggable';
import Typography from './Typography';

interface IWelcomeCardProps {
  sessionUser: ISessionUser;
  reviewInfo: IReviewInfo;
}

export function WelcomeCard({ sessionUser, reviewInfo }: IWelcomeCardProps) {

  return (
    <Card className="w-[300px] h-[400px]">
      <CardHeader>
        <CardTitle>Welcome, {sessionUser?.name}!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={sessionUser?.image as string} className="size-32 rounded-md" />
        <div className='border'>
          <Typography.P>You have {reviewInfo.cardNumber} outstanding reviews in {reviewInfo.deckNumber} decks</Typography.P>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-8"></CardFooter>
    </Card>
  );
}
