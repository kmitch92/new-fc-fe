'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TagsComboBoxProps {
  userTags: string[];
  setCardTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagsComboBox = ({ userTags, setCardTags }: TagsComboBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? userTags.find((tag) => tag === value) : 'Select tag...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {userTags.length > 0
                ? userTags.map((tag) => (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setCardTags((existingTags) =>
                          existingTags.length > 0
                            ? existingTags.includes(currentValue)
                              ? [...existingTags]
                              : [...existingTags, currentValue]
                            : [currentValue]
                        );
                        setValue('');
                        setOpen(false);
                      }}
                    >
                      <p>{tag}</p>
                    </CommandItem>
                  ))
                : ''}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
