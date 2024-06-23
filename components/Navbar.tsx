'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { ModeToggle } from './ModeToggle';
import MenuIcon from '@mui/icons-material/Menu';
import { ExitIcon } from '@radix-ui/react-icons';
import { LogOut, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Blah',
    href: '',
    description: 'Blah Blah Blah Blah',
  },
  {
    title: 'Blah',
    href: '',
    description: 'Blah Blah Blah Blah.',
  },
  {
    title: 'Blah',
    href: '',
    description: 'Blah Blah Blah Blah.',
  },
  {
    title: 'Blah',
    href: '',
    description: 'Blah Blah Blah Blah.',
  },
  {
    title: 'Blah',
    href: '',
    description: 'Blah Blah Blah Blah.',
  },
  {
    title: 'Blah',
    href: '',
    description: 'Blah Blah Blah Blah.',
  },
];

export function Navbar() {
  return (
    <div className="flex flex-col justify-start z-10 bg-background mb-2 pb-2">
      <div className="w-full h-auto flex flex-row justify-between items-center mt-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <MenuIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Blah Blah Blah Blah.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="" title="Blah">
                    Blah Blah Blah Blah
                  </ListItem>
                  <ListItem href="" title="Blah">
                    Blah Blah Blah Blah.
                  </ListItem>
                  <ListItem href="" title="">
                    Blah Blah Blah Blah
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  FLASHCARDS
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="mr-24">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Blah</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/learn" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Learn
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blah
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="flex flex-row justify-between gap-8 items-center  mr-6">
          <NavigationMenuList>
            <NavigationMenuItem className="mr-2">
              <Link href="/settings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Settings />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
            <NavigationMenuItem className="mt-[4px] mr-2">
              <Popover>
                <PopoverTrigger>
                  <LogOut />
                </PopoverTrigger>
                <PopoverContent className="mr-8 flex flex-col gap-4">
                  <p>Are you sure you want to sign out?</p>
                  <Button onClick={() => signOut()}>Sign Out</Button>
                </PopoverContent>
              </Popover>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator className="my-1" />
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
