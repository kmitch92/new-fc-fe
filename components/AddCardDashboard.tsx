'use client';
import React, { useState, useEffect } from 'react';
import { Bird, CornerDownLeft, Rabbit, Turtle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CardExample } from '@/components/CardExample';
import { DeckDropdown } from './DeckDropdown';
import { IDeckInfo, ISessionUser } from '@/lib/api/types/types';

interface AddCardDashboardProps {
  sessionUser: ISessionUser;
}

export const AddCardDashboard = ({ sessionUser }: AddCardDashboardProps) => {
  const [deck, setDeck] = useState<IDeckInfo | undefined>();
  const [cardType, setCardType] = useState<string>('');
  const [cardQuestion, setCardQuestion] = useState<string>('');
  const [cardAnswer, setCardAnswer] = useState<string>('');
  const [cardExtra, setCardExtra] = useState<string>('');
  const [cardImage, setCardImage] = useState<string>('');
  const [cardTags, setCardTags] = useState<string[]>([]);

  useEffect(() => {
    console.log(deck);
  }, []);

  const handleCardTypeChange = (e: string) => {
    setCardType(e);
  };
  const handleQuestionChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    //@ts-ignore
    e?.target?.value && setCardQuestion(e.target.value);
  };
  return (
    <main className="grid flex-1 gap-4 overflow-hidden p-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        className="relative hidden flex-col items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Card Fields
            </legend>
            <div className="grid gap-3">
              {/*
                deck selection 
                 */}
              <DeckDropdown sessionUser={sessionUser} setDeck={setDeck} />

              <div className="grid gap-3">
                <Label htmlFor="question">
                  Type the question or prompt as it should appear on the card.
                </Label>
                <Input
                  id="question"
                  type="text"
                  placeholder="Question..."
                  onChange={(e: React.ChangeEvent) => handleQuestionChange(e)}
                />
              </div>
              {/*
               Card Type selection
               */}
              <Label htmlFor="cardType">Card Type</Label>
              <Select onValueChange={handleCardTypeChange}>
                <SelectTrigger
                  id="cardType"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Choose card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Rabbit className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          {'Answer mode: '}
                          <span className="font-medium text-foreground">
                            Type
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Type in your answer.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="bigtype">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Bird className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          {'Answer mode: '}
                          <span className="font-medium text-foreground">
                            {'Type (expanded)'}
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Type in an expanded area.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="dropdown">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Turtle className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          {'Answer mode: '}
                          <span className="font-medium text-foreground">
                            Dropdown
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Multiple choice selection from a dropdown.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {/*
               rest 
               */}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">
                Replace this field with something else
              </Label>
              <Input id="temperature" type="number" placeholder="0.4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">Some field</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">And another</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Some thing
            </legend>
            <div className="grid gap-3">
              <Label htmlFor="role">field X</Label>
              <Select defaultValue="system">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">blah</SelectItem>
                  <SelectItem value="user">dii</SelectItem>
                  <SelectItem value="assistant">bloop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">final field</Label>
              <Textarea
                id="content"
                placeholder="You are a..."
                className="min-h-[9.5rem]"
              />
            </div>
          </fieldset>
        </form>
      </div>

      <div className="relative flex h-full min-h-[50vh] flex-col items-center rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <Badge
          variant="outline"
          className="absolute right-3 top-3 bg-background"
        >
          Output
        </Badge>

        <CardExample
          deck={deck}
          card={{
            frontField: cardQuestion,
            answerType: cardType,
            backField: cardAnswer,
            extraField: cardExtra,
            imageURL: cardImage,
            tags: cardTags,
          }}
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" size="sm" className="ml-auto gap-1.5 mt-8 ">
            Submit Card
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </main>
  );
};
