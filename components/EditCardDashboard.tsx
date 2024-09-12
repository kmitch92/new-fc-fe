'use client';
import React, { useState } from 'react';
import { CornerDownLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardExample } from '@/components/CardExample';
import { DeckDropdown } from './DeckDropdown';
import { ICardInfo, IDeckInfo, ISessionUser } from '@/lib/api/types/types';
import { Checkbox } from './ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { addCardsToDeckById, updateUserTagsById } from '@/lib/api/handlers';
import { AnswerField } from './AnswerField';
import { TagsComboBox } from './TagsComboBox';
import { CardTypeDropdown } from './CardTypeDropdown';

interface CardDashboardProps {
  sessionUser: ISessionUser;
}

const multipleChoiceOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

export const EditCardDashboard = ({ sessionUser }: CardDashboardProps) => {
  const [deck, setDeck] = useState<IDeckInfo | undefined>();
  const [cardType, setCardType] = useState<string>('');
  const [cardQuestion, setCardQuestion] = useState<string>('');
  const [cardAnswer, setCardAnswer] = useState<string | string[]>('');
  const [cardExtra, setCardExtra] = useState<string>('');
  const [cardImageChecked, setCardImageChecked] = useState<boolean>(false);
  const [cardImage, setCardImage] = useState<string>('');
  const [cardTags, setCardTags] = useState<string[]>([]);
  const [addCardTagValue, setAddCardTagValue] = useState<string>('');
  const [subfieldChecked, setSubfieldChecked] = useState<boolean>(false);
  const [subfieldValue, setSubfieldValue] = useState<string>('');

  console.log(sessionUser);

  const handleSubmit = (card: ICardInfo, deckId: string) => {
    addCardsToDeckById([card], deckId);
    card.tags && updateUserTagsById(sessionUser.id, card.tags);
    setCardQuestion('');
    setSubfieldValue('');
    setCardType('');
    typeof cardAnswer === 'string' ? setCardAnswer('') : setCardAnswer([]);
    setCardExtra('');
    setCardImage('');
    setCardTags([]);
  };

  const handleCardTypeChange = (e: string) => {
    setCardType(e);
    if (cardType === 'dropdown') {
      setCardAnswer(multipleChoiceOptions);
    } else setCardAnswer('');
  };
  const handleQuestionChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e?.target?.value && setCardQuestion(e.target.value);
  };
  return (
    <div className="grid flex-1 gap-4 overflow-x-hidden rounded-lg border bg-background p-4 grid-cols-2">
      <div
        className="relative hidden flex-col items-start gap-8 md:flex col-span-1"
        x-chunk="dashboard-03-chunk-0"
      >
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4 bg-background">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Card Front Fields
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
                  value={cardQuestion}
                />
              </div>
              <div className="flex-row gap-2">
                <p>
                  Add image by URL?
                  <Checkbox
                    className="ml-4"
                    onCheckedChange={(checked) =>
                      checked != 'indeterminate' && setCardImageChecked(checked)
                    }
                  />
                </p>
              </div>
              {cardImageChecked && (
                <div className="grid gap-3">
                  <Label htmlFor="card-image-url">Card Image URL</Label>
                  <Input
                    id="card-image-url"
                    type="text"
                    placeholder="Subfield..."
                    onChange={(e: React.BaseSyntheticEvent) =>
                      setCardImage(e.target.value)
                    }
                    value={cardImage}
                  />
                </div>
              )}
              <Separator />
              <div className="flex-row gap-2">
                <p>
                  Add subfield?
                  <Checkbox
                    className="ml-4"
                    onCheckedChange={(checked) =>
                      checked != 'indeterminate' && setSubfieldChecked(checked)
                    }
                  />
                </p>
              </div>
              {subfieldChecked && (
                <div className="grid gap-3">
                  <Label htmlFor="subfield">Subfield</Label>
                  <Input
                    id="subfield"
                    type="text"
                    placeholder="Subfield..."
                    onChange={(e: React.BaseSyntheticEvent) =>
                      setSubfieldValue(e.target.value)
                    }
                    value={subfieldValue}
                  />
                </div>
              )}
              {/*
               Card Type selection
               */}
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4 bg-background">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Card Back Fields
            </legend>
            <CardTypeDropdown handleCardTypeChange={handleCardTypeChange} />
            {/*
               rest 
               */}

            <AnswerField
              type={cardType}
              setCardAnswer={setCardAnswer}
              cardAnswer={cardAnswer}
            />

            <div className="grid gap-3">
              <Label htmlFor="details">
                Extra details to display upon receiving the answer.
              </Label>
              <Input
                id="details"
                type="text"
                placeholder="Extra details..."
                onChange={(e: React.BaseSyntheticEvent) =>
                  setCardExtra(e.target.value)
                }
                value={cardExtra}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="add-tag">Add Tags</Label>
                <Input
                  id="add-tag"
                  type="text"
                  placeholder="add a tag for this card"
                  onChange={(e: React.BaseSyntheticEvent) =>
                    setAddCardTagValue(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      setCardTags((state) => [...state, addCardTagValue]);
                      setAddCardTagValue('');
                    }
                  }}
                  value={addCardTagValue}
                />
              </div>
              <div className="grid gap-3">
                <Label>Existing Tags</Label>
                <TagsComboBox
                  userTags={sessionUser.tagsUsed}
                  setCardTags={setCardTags}
                />
              </div>
            </div>
            <div className="flex-wrap">
              {cardTags.map((tag) => (
                <Badge
                  variant="default"
                  className="bg-primary mx-0.5 mt-1"
                  onClick={() =>
                    setCardTags((state) => state.filter((item) => item !== tag))
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </fieldset>
        </form>
      </div>

      <div className="relative flex h-full flex-col items-center rounded-xl bg-muted/50 p-4 col-span-1">
        <CardExample
          deck={deck}
          card={{
            frontField: cardQuestion,
            subfield: subfieldChecked ? subfieldValue : '',
            answerType: cardType,
            backField: cardAnswer,
            extraField: cardExtra,
            imageURL: cardImage,
            tags: cardTags,
          }}
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            type="submit"
            size="sm"
            className="ml-auto gap-1.5 mt-8"
            onClick={() => {
              deck?.id &&
                handleSubmit(
                  {
                    frontField: cardQuestion,
                    subfield: subfieldChecked ? subfieldValue : '',
                    answerType: cardType,
                    backField: cardAnswer,
                    extraField: cardExtra,
                    imageURL: cardImage,
                    tags: cardTags,
                  },
                  deck.id.toString()
                );
            }}
          >
            Submit Card
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
