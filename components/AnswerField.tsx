'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const multipleChoiceOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

interface AnswerFieldProps {
  type: string;
  setCardAnswer: React.Dispatch<React.SetStateAction<string | string[]>>;
  cardAnswer: string | string[];
}
export const AnswerField = ({
  type,
  setCardAnswer,
  cardAnswer,
}: AnswerFieldProps) => {
  return type === 'dropdown' ? (
    <div className="grid gap-3">
      <fieldset className="grid gap-6 rounded-lg border p-4 bg-background">
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
      <Input
        id="answer"
        type="text"
        placeholder="Answer..."
        onChange={(e: React.BaseSyntheticEvent) =>
          setCardAnswer(e.target.value)
        }
        value={cardAnswer}
      />
    </div>
  );
};
