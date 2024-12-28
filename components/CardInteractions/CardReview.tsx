'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICard } from '../../lib/api/models/card-model';
import Typography from '../Typography';

interface CardReviewProps {
  reviews: CardWithInfo[];
}

export interface CardWithInfo extends ICard {
  deckName: string;
  deckId: string;
  deckDescription: string;
}

const renderAnswerField = (cardType: string, backfield: string | string[]) => {
  switch (cardType) {
    case 'type':
      return (
        <Input
          id="answer"
          type="text"
          placeholder="Answer"
          value={backfield}
          onChange={(e) => console.log(e.target.value)}
        />
      );
    case 'bigtype':
      return (
        <Textarea
          id="answer"
          placeholder="Answer"
          value={backfield}
          onChange={(e) => console.log(e.target.value)}
        />
      );
    case 'dropdown':
      return (
        <>
          <Label htmlFor="dropdown">Select Option</Label>
          <Select>
            <SelectTrigger id="dropdown">
              <SelectValue placeholder="...Or by Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value={backfield[0]}>{backfield[0]}</SelectItem>
              <SelectItem value={backfield[1]}>{backfield[1]}</SelectItem>
              <SelectItem value={backfield[2]}>{backfield[2]}</SelectItem>
              <SelectItem value={backfield[3]}>{backfield[3]}</SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    default:
      return <h3>Card Type Required</h3>;
  }
};

interface CardViewProps {
  cardWithInfo: CardWithInfo;
}

export const CardView = ({ cardWithInfo }: CardViewProps) => {
  return (
    <Card className="w-[95%] h-[85%] ">
      <CardHeader>
        <CardTitle>CARD QUESTION</CardTitle>
        <CardDescription>
          Deck: {cardWithInfo.deckName || 'Choose Deck'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cardWithInfo.imageURL && (
          <img
            style={{ objectFit: 'cover' }}
            src={cardWithInfo.imageURL}
            alt="stand in for where an image could go"
            className="border border-primary rounded-md p-4 my-4 h-36 w-full"
          />
        )}

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="question">Question:</Label>
            <h1 id="question">
              {cardWithInfo.frontField ?? 'Question Required...'}
            </h1>
            {cardWithInfo.subfield && <p>{cardWithInfo.subfield}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            {renderAnswerField(
              cardWithInfo.answerType || '',
              cardWithInfo.backField || ''
            )}
          </div>
          <div>
            <p>{cardWithInfo.extraField}</p>
          </div>
          <div className="flex-wrap">
            {cardWithInfo.tags &&
              cardWithInfo.tags.map((tag: string) => (
                <Badge variant="default" className="bg-primary mx-0.5 mt-1">
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Skip</Button>
        <Button>Answer</Button>
      </CardFooter>
    </Card>
  );
};

export const CardReview = ({ reviews }: CardReviewProps) => {
  const [cardsToReview, setCardsToReview] = useState<CardWithInfo[]>(reviews);
  const [cardInReview, setCardInReview] = useState<CardWithInfo | null>(null);

  const onReview = (card: CardWithInfo, answer: string) => { };
  console.log(cardsToReview.slice(0, 10).map((card) => card.frontField));

  return (
    <div className="flex flex-row">
      <div>
        <Typography.List
          textArr={cardsToReview.slice(0, 10).map((card) => card.frontField)}
        >
          <></>
        </Typography.List>
      </div>
    </div>
  );
};
