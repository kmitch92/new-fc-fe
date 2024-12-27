'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';


export function WelcomeCard() {
  const { user, decksOfCardsReview } = useContext(UserContext);
  console.dir({
    1: "IN THE WELCOME CARD",
    2: "///////////////////",
    user,
    decksOfCardsReview,
  })

  return (
    <Card className="w-[300px] h-[400px]">
      <CardHeader>
        <CardTitle>Welcome, {user?.name ?? 'unknown'}!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={user?.image as string} className="size-32 rounded-md" />
        <div className='border'>
          <h1>Expect reviews here</h1>
          {Array.isArray(decksOfCardsReview) && decksOfCardsReview.map((deckOfCards) => {
            return (<div key={deckOfCards.deck?.id.toString() ?? Math.random()}>
              <h1 key={deckOfCards.deck?.id.toString() + "title"}>{deckOfCards.deck?.name ?? deckOfCards.deck?.id.toString() ?? "undefined"}</h1>
              <ul key={deckOfCards.deck?.id.toString() + "list"}>
                {Array.isArray(deckOfCards.cards) && deckOfCards.cards.map((card) => <li key={card?.frontField}>{card?.frontField}</li>)}
              </ul>
            </div>)
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-8"></CardFooter>
    </Card>
  );
}
