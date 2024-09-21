'use client';

import { ISessionUser } from '@/lib/api/types/types';
import { AddDeck } from '@/components/AddDeck';
import { WelcomeCard } from '@/components/WelcomeCard';
import { CardInteractions } from '@/components/CardInteractions';
import { getCardsToReview } from '@/lib/api/handlers';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Draggable() {
  return (
    <section className="h-[86vh] w-full">
      <PanelGroup direction="horizontal">
        <Panel collapsible>
          <PanelGroup direction="vertical">
            <Panel className="bg-primary border" minSize={25} maxSize={50}>
              Welcome Card
            </Panel>
            <PanelResizeHandle />
            <Panel className="bg-[red] border" minSize={25} maxSize={50}>
              Account Info, credits, notes etc
            </Panel>
            <PanelResizeHandle />
            <Panel
              className="bg-[yellow] border"
              minSize={25}
              maxSize={50}
            ></Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel>
          <PanelGroup direction="vertical">
            <Panel className="bg-[magenta] border" maxSize={33} minSize={15}>
              deck management
            </Panel>
            <PanelResizeHandle />
            <Panel className="bg-[lightgreen] border" maxSize={85} minSize={67}>
              card browser
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle />
        <Panel>
          <PanelGroup direction="vertical">
            <Panel className="bg-[navy] border" maxSize={33} minSize={15}>
              Metrics
            </Panel>
            <PanelResizeHandle />
            <Panel className="bg-[purple] border" maxSize={85} minSize={67}>
              Reviews
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </section>
  );
}
