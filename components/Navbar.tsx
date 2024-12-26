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


export function Navbar() {
  return (
    <div className="flex flex-col justify-start z-10 bg-background mb-2 pb-2">
      <div className="w-full h-auto flex flex-row justify-between items-center mt-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  FLASHCARDS
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="flex flex-row justify-between gap-8 items-center  mr-6">
          <NavigationMenuList>
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
