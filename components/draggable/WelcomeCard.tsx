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
        <div className='p-1 flex'>
          <img src={sessionUser?.image as string} className="size-24 rounded-md" />
          <div className='w-3/4 px-2 justify-end'>
            <Typography.P>You have {reviewInfo.cardNumber} outstanding reviews in {reviewInfo.deckNumber} decks</Typography.P>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
