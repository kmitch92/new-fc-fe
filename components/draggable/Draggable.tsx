'use client';
import { useState, useEffect } from 'react';
import { ICardExtra, IDeckInfo, ISessionUser } from '@/lib/api/types/types';
import { WelcomeCard } from '@/components/draggable/WelcomeCard';
import { CardInteractions } from '@/components/CardInteractions/CardInteractions';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import {
  DragHandleHorizontalIcon,
  DragHandleVerticalIcon,
} from '@radix-ui/react-icons';
import { DeckBlock } from '@/components/Deck/DeckBlock';
import { Card } from '../ui/card';
import { IDeck } from '@/lib/api/models/deck-model';
import { getCardsToReview } from '@/lib/api/handlers';
import { CardBrowser } from '../CardBrowser/CardBrowser';
import { UserMetrics } from '../UserMetrics';

interface DraggableProps {
  sessionUser: ISessionUser
}

export interface IReviewInfo {
  deckNumber: number;
  cardNumber: number;
}

export default function Draggable({ sessionUser }: DraggableProps) {
  const [activeDeck, setActiveDeck] = useState<IDeckInfo | null>(null)
  const [activeCard, setActiveCard] = useState<ICardExtra | null>(null)
  const [cardsToReview, setCardsToReview] = useState<IDeck[]>([])
  const [reviewInfo, setReviewInfo] = useState<IReviewInfo>({ deckNumber: 0, cardNumber: 0 })
  const [cardInfos, setCardInfos] = useState<ICardExtra[]>([])

  useEffect(() => {
    sessionUser?.decks && getCardsToReview(sessionUser.decks).then((result) => {
      const decks: IDeck[] = result.decks as IDeck[]
      setCardsToReview(decks)
      setReviewInfo({ deckNumber: decks.length, cardNumber: decks.reduce((total, deck: IDeck) => total + deck.cards.length, 0) })

      const cardsWithInfo: ICardExtra[] = []

      decks.forEach((deck) => {
        deck.cards.forEach((card) => {
          const cardInfo: ICardExtra = card as ICardExtra
          cardInfo.deckInfo = { id: deck.id, name: deck.name, description: deck.description }
          cardsWithInfo.push(cardInfo)
        })
      })

      cardsWithInfo.length && setCardInfos(cardsWithInfo)
    })
  }, [])

  return (
    <section className="h-[86vh] w-full px-4">
      <PanelGroup direction="horizontal">
        {/* {//VERT} LEFT COLUMN  */}
        <Panel minSize={10} defaultSize={50} maxSize={90} >
          <PanelGroup direction="vertical">
            <Panel minSize={10} maxSize={40} defaultSize={25}>
              <WelcomeCard sessionUser={sessionUser} reviewInfo={reviewInfo} />
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel minSize={10} maxSize={40} defaultSize={15}>
              <DeckBlock activeDeck={activeDeck} setActiveDeck={setActiveDeck} sessionUser={sessionUser} />
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel minSize={20} maxSize={80} defaultSize={60}>
              <CardBrowser cardInfos={cardInfos} setActiveCard={setActiveCard} setActiveDeck={setActiveDeck} activeCard={activeCard} />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="flex flex-row justify-center items-center">
          <DragHandleVerticalIcon />
        </PanelResizeHandle>
        {/* //VERT right COLUMN*/}
        <Panel minSize={60} defaultSize={75} maxSize={90}>
          <PanelGroup direction="vertical">
            <Panel minSize={60} defaultSize={75} maxSize={90}>
              <CardInteractions cardsToReview={cardsToReview} sessionUser={sessionUser} activeCard={activeCard} activeDeck={activeDeck} />
            </Panel>
          </PanelGroup>
        </Panel>

      </PanelGroup>
    </section>
  );
}
