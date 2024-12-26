'use client';
import { useState, useEffect } from 'react';
import { IDeckInfo, IDeckOfCards, ISessionUser } from '@/lib/api/types/types';
import { CardWithInfo } from '../CardReview';
import { WelcomeCard } from '@/components/WelcomeCard';
import { CardInteractions } from '@/components/CardInteractions';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import {
  DragHandleHorizontalIcon,
  DragHandleVerticalIcon,
} from '@radix-ui/react-icons';
import { DeckBlock } from '@/components/Deck/DeckBlock';
import { ObjectId } from 'mongoose';
import { CardReview } from '../CardReview';
import { Card } from '../ui/card';
interface DraggableProps {
  sessionUser: ISessionUser
}
export default function Draggable({ sessionUser }: DraggableProps) {
  const [activeDeck, setActiveDeck] = useState<IDeckInfo>({ id: "" as unknown as ObjectId, name: "", description: "" })
  const [cardsToReview, setCardsToReview] = useState<IDeckOfCards[]>([])

  return (
    <section className="h-[86vh] w-full px-4">
      <PanelGroup direction="horizontal">
        {/* {//VERT} LEFT COLUMN  */}
        <Panel >
          <PanelGroup direction="vertical">
            <Panel >
              <WelcomeCard />
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel className="bg-[red] border">
              Account Info, credits, notes etc
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel >
              Misc? account settings?

            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="flex flex-row justify-center items-center">
          <DragHandleVerticalIcon />
        </PanelResizeHandle>
        {/* //VERT right COLUMN*/}
        <Panel>
          <PanelGroup direction="vertical">
            <Panel >
              <PanelGroup direction="horizontal">
                <Panel>
                  <DeckBlock activeDeck={activeDeck} setActiveDeck={setActiveDeck} sessionUser={sessionUser} />
                </Panel>
                <Panel>
                  <Card>
                    <h1>metrics placeholder</h1>
                  </Card>
                </Panel>
              </PanelGroup>
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel>
              <CardInteractions cardsToReview={cardsToReview} sessionUser={sessionUser} />
            </Panel>
          </PanelGroup>
        </Panel>

      </PanelGroup>
    </section>
  );
}
