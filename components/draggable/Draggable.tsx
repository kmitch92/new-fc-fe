'use client';
import { useState, useEffect } from 'react';
import { IDeckInfo, IDeckOfCards, ISessionUser } from '@/lib/api/types/types';
import { CardWithInfo } from '../CardReview';
import { WelcomeCard } from '@/components/WelcomeCard';
import { CardInteractions } from '@/components/CardInteractions';
import { getCardsToReview } from '@/lib/api/handlers';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';

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
        <Panel maxSize={30} minSize={5}>
          <PanelGroup direction="vertical">
            <Panel minSize={25} maxSize={50}>
              <WelcomeCard />
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel className="bg-[red] border" minSize={25} maxSize={50}>
              Account Info, credits, notes etc
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel minSize={25} maxSize={50}>
              Misc? account settings?

            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="flex flex-row justify-center items-center">
          <DragHandleVerticalIcon />
        </PanelResizeHandle>
        {/* //VERT right COLUMN*/}
        <Panel maxSize={95} minSize={70}>
          <PanelGroup direction="vertical">
            <Panel maxSize={33} minSize={15}>
              <div className='flex-row'>
                <DeckBlock activeDeck={activeDeck} setActiveDeck={setActiveDeck} sessionUser={sessionUser} />
                <Card>
                  <h1>metrics placeholder</h1>
                </Card>
              </div>
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel maxSize={85} minSize={67}>
              <CardInteractions cardsToReview={cardsToReview} sessionUser={sessionUser} />
            </Panel>
          </PanelGroup>
        </Panel>

      </PanelGroup>
    </section>
  );
}
