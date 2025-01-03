'use client';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { CornerDownLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardExample } from '@/components/CardInteractions/CardExample';
import { DeckDropdown } from '../Deck/DeckDropdown';
import { ICardSubmission, IDeckInfo, ISessionUser } from '@/lib/api/types/types';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { addCardsToDeckById, updateUserTagsById } from '@/lib/api/handlers';
import { AnswerField } from './AnswerField';
import { TagsComboBox } from '../TagsComboBox';
import { CardTypeDropdown } from './CardTypeDropdown';
import Typography from '../Typography';

interface AddCardDashboardProps {
  sessionUser: ISessionUser;
}

const multipleChoiceOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

export const AddCardDashboard = ({ sessionUser }: AddCardDashboardProps) => {
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

  const handleSubmit = (card: ICardSubmission, deckId: string) => {
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
              <Typography.Small text="Card Front Fields" />
            </legend>
            <div className="grid gap-3">
              {/*
                deck selection 
                 */}
              <DeckDropdown sessionUser={sessionUser} setDeck={setDeck as Dispatch<SetStateAction<IDeckInfo>>} />

              <div className="grid gap-3">
                <Input
                  id="question"
                  type="text"
                  placeholder="Type question..."
                  onChange={(e: React.ChangeEvent) => handleQuestionChange(e)}
                  value={cardQuestion}
                />
              </div>
              <div className="flex justify-start ml-[1rem]">
                <div className="w-[50%]">
                  <Typography.Muted text="Image?" />
                </div>
                <Checkbox
                  onCheckedChange={(checked) =>
                    checked != 'indeterminate' && setCardImageChecked(checked)
                  }
                />
              </div>
              {cardImageChecked && (
                <div className="grid gap-3">
                  <Input
                    id="card-image-url"
                    type="text"
                    placeholder="Card Image URL"
                    onChange={(e: React.BaseSyntheticEvent) =>
                      setCardImage(e.target.value)
                    }
                    value={cardImage}
                  />
                </div>
              )}
              <Separator />
              <div className="flex justify-start ml-[1rem]">
                <div className="w-[50%]">
                  <Typography.Muted text="Subfield?" />
                </div>
                <Checkbox
                  onCheckedChange={(checked) =>
                    checked != 'indeterminate' && setSubfieldChecked(checked)
                  }
                />
              </div>
              {subfieldChecked && (
                <div className="grid gap-3">
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
            <legend className="-ml-1 px-1">
              <Typography.Small text="Card Back Fields" />
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
            <div className="flex-col gap-4">
              <div className="mb-2">
                <Input
                  id="add-tag"
                  type="text"
                  placeholder="Add tags..."
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
                <TagsComboBox
                  userTags={sessionUser?.tagsUsed ?? []}
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
