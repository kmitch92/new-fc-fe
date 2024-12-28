import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ISessionUser } from '@/lib/api/types/types';
import { IReviewInfo } from './Draggable';
import Typography from '../Typography';

interface IWelcomeCardProps {
  sessionUser: ISessionUser;
  reviewInfo: IReviewInfo;
}

export function WelcomeCard({ sessionUser, reviewInfo }: IWelcomeCardProps) {

  return (
    <Card className="w-full h-full flex-col justify-evenly">
      <CardHeader>
        <CardTitle>Welcome, {sessionUser?.name}!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={sessionUser?.image as string} className="size-32 rounded-md" />
        <div className='border p-2 my-2 flex-col justify-evenly'>
          <Typography.P>You have {reviewInfo.cardNumber} outstanding reviews in {reviewInfo.deckNumber} decks</Typography.P>
        </div>
      </CardContent>
    </Card>
  );
}
