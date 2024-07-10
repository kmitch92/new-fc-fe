'use client';
import React from 'react';
import { Type, SquareStack, Keyboard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CardTypeDropdownProps {
  handleCardTypeChange: (arg0: string) => void;
}

export const CardTypeDropdown = ({
  handleCardTypeChange,
}: CardTypeDropdownProps) => {
  return (
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
              <Type className="size-5" />
              <div className="grid gap-0.5">
                <p>
                  {'Answer mode: '}
                  <span className="font-medium text-foreground">Type</span>
                </p>
                <p className="text-xs" data-description>
                  Type in your answer.
                </p>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="bigtype">
            <div className="flex items-start gap-3 text-muted-foreground">
              <Keyboard className="size-5" />
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
              <SquareStack className="size-5" />
              <div className="grid gap-0.5">
                <p>
                  {'Answer mode: '}
                  <span className="font-medium text-foreground">Dropdown</span>
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
  );
};
