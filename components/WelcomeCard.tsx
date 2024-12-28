'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { useContext } from 'react';
// import { UserContext } from '@/contexts/UserContext';
import { ISessionUser } from '@/lib/api/types/types';

interface IWelcomeCardProps {
  sessionUser: ISessionUser;
}

export function WelcomeCard({ sessionUser }: IWelcomeCardProps) {
  // const { user, decksOfCardsReview } = useContext(UserContext);
  console.log("WelcomeCard", sessionUser)

  return (
    <Card className="w-[300px] h-[400px]">
      <CardHeader>
        <CardTitle>Welcome, {sessionUser?.name}!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={sessionUser?.image as string} className="size-32 rounded-md" />
        {/* <div className='border'> */}
        {/* <h1>Expect reviews here</h1> */}
        {/* {Array.isArray(decksOfCardsReview) && decksOfCardsReview.map((deckOfCards) => {

            return (<div key={deckOfCards?.id.toString() ?? Math.random()}>
              <h1 key={deckOfCards?.id.toString() + "title"}>{deckOfCards.name ?? deckOfCards?.id.toString() ?? "undefined"}</h1>
              <ul key={deckOfCards?.id.toString() + "list"}>
                {Array.isArray(deckOfCards.cards) && deckOfCards.cards.map((card) => <li key={card?.frontField}>{card?.frontField}</li>)}
              </ul>
            </div>)
          })} */}
        {/* </div> */}
      </CardContent>
      <CardFooter className="flex flex-col gap-8"></CardFooter>
    </Card>
  );
}
