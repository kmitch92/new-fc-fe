'use client';
import React, { useState, useEffect, Dispatch } from 'react';
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
import { CardExample } from '@/components/CardExample';
import { DeckDropdown } from './DeckDropdown';
import { IDeckInfo, ISessionUser } from '@/lib/api/types/types';
import { Checkbox } from './ui/checkbox';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
  const [cardImage, setCardImage] = useState<string>('');
  const [cardTags, setCardTags] = useState<string[]>([]);
  const [addCardTagValue, setAddCardTagValue] = useState<string>('');
  const [subfieldChecked, setSubfieldChecked] = useState<boolean>(false);
  const [subfieldValue, setSubfieldValue] = useState<string>('');
  const [extraFieldChecked, setExtraFieldChecked] = useState<boolean>(false);
  const [extraFieldValue, setExtraFieldValue] = useState<string>('');

  useEffect(() => {}, []);

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
    <main className="grid flex-1 gap-4 overflow-hidden p-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        className="relative hidden flex-col items-start gap-8 md:flex"
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
                />
              </div>
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
            <div>
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
            </div>
            {/*
               rest 
               */}

            {renderAnswerField(cardType, setCardAnswer)}

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
                />
              </div>
              <div className="grid gap-3">
                <Label>Existing Tags</Label>
                {renderTagsComboBox(sessionUser.tagsUsed, setCardTags)}
              </div>
              <div className="flex-wrap">
                {cardTags.map((tag) => (
                  <Badge
                    variant="default"
                    className="bg-primary"
                    onClick={() =>
                      setCardTags((state) =>
                        state.filter((item) => item !== tag)
                      )
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
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
            subfield: subfieldChecked ? subfieldValue : '',
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

const renderAnswerField = (
  type: string,
  setCardAnswer: React.Dispatch<React.SetStateAction<string | string[]>>
) => {
  return type === 'dropdown' ? (
    <div className="grid gap-3">
      <fieldset className="grid gap-6 rounded-lg border p-4 bg-background">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Multiple Choice Answer Options - only one correct answer
        </legend>
        {multipleChoiceOptions.map((_, idx) => (
          <div className="grid gap-2">
            <Input
              id={`answer-option${idx}`}
              type="text"
              placeholder={`Option ${idx + 1}`}
              onChange={(e: React.BaseSyntheticEvent) =>
                setCardAnswer((state) => [
                  ...state.slice(0, idx),
                  e.target.value,
                  ...state.slice(idx + 1),
                ])
              }
            />
          </div>
        ))}
      </fieldset>
    </div>
  ) : (
    <div className="grid gap-3">
      <Label htmlFor="answer">
        Type the answer as it should appear on the card.
      </Label>
      <Input
        id="answer"
        type="text"
        placeholder="Answer..."
        onChange={(e: React.BaseSyntheticEvent) =>
          setCardAnswer(e.target.value)
        }
      />
    </div>
  );
};

const renderTagsComboBox = (
  userTags: string[],
  setCardTags: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [tagsRender] = React.useState<Record<string, string>[]>(
    userTags?.length
      ? userTags.map((tag: string) => ({ value: tag, label: tag }))
      : []
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? tagsRender.find((tag) => tag.value === value)?.label
            : 'Select tag...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup>
            {tagsRender.map((tag) => (
              <CommandItem
                key={tag.value}
                value={tag.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setCardTags((state) =>
                    state.includes(currentValue)
                      ? state.filter((tag) => tag !== currentValue)
                      : [...state, currentValue]
                  );
                  setValue('');
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === tag.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {tag.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
