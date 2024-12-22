import { IDeckInfo, ISessionUser } from '@/lib/api/types/types';
import { AddDeck } from '@/components/Deck/AddDeck';
import { WelcomeCard } from '@/components/WelcomeCard';
import { CardInteractions } from '@/components/CardInteractions';
import { getCardsToReview } from '@/lib/api/handlers';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import {
  DragHandleHorizontalIcon,
  DragHandleVerticalIcon,
} from '@radix-ui/react-icons';
import { DeckDropdown } from '@/components/Deck/DeckDropdown';
import { useState } from 'react';

export default async function Draggable() {
  const sessionUser = await useServerSessionUser();
  const [deck, setDeck] = useState<IDeckInfo>()
  return (
    <section className="h-[86vh] w-full px-4">
      <PanelGroup direction="horizontal">
        {/* {//VERT} */}
        <Panel maxSize={30} minSize={5}>
          <PanelGroup direction="vertical">
            <Panel className="bg-primary border" minSize={25} maxSize={50}>
              Welcome Card
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
            <Panel className="bg-[yellow] border" minSize={25} maxSize={50}>
              Misc? account settings?
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="flex flex-row justify-center items-center">
          <DragHandleVerticalIcon />
        </PanelResizeHandle>
        {/* //VERT */}
        <Panel maxSize={30} minSize={5}>
          <PanelGroup direction="vertical">
            <Panel className="bg-[magenta] border" maxSize={33} minSize={15}>
              <DeckDropdown sessionUser={sessionUser as ISessionUser} setDeck={setDeck} />
              deck management
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel className="bg-[lightgreen] border" maxSize={85} minSize={67}>
              card browser
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="flex flex-row justify-center items-center">
          <DragHandleVerticalIcon />
        </PanelResizeHandle>
        {/* //VERT */}
        <Panel>
          <PanelGroup direction="vertical">
            <Panel className="bg-[navy] border" maxSize={33} minSize={15}>
              Metrics
            </Panel>
            <PanelResizeHandle className="flex flex-row justify-center items-center">
              <DragHandleHorizontalIcon />
            </PanelResizeHandle>
            <Panel className="bg-[purple] border" maxSize={85} minSize={67}>
              Reviews
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </section>
  );
}
