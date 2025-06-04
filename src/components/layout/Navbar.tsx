
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Rocket, ChevronDown, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/feed', label: 'Public Feed' },
];

const toolLinks = [
  { href: '/reel', label: 'Reel Planner', icon: undefined },
  { href: '/story', label: 'Story Prompts', icon: undefined },
  { href: '/linkedin', label: 'LinkedIn Posts', icon: undefined },
  { href: '/hook-generator', label: 'Hook Generator', icon: Wand2 },
];

export function Navbar() {
  const pathname = usePathname();
  const isToolLinkActive = toolLinks.some(link => pathname === link.href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-6 flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2 text-primary-foreground mr-6">
          <Rocket className="h-7 w-7 text-accent" />
          <span className="font-bold text-xl font-headline">ContentFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium flex-grow">
          {mainNavLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className={cn(
              "transition-colors hover:text-accent hover:bg-transparent px-3",
              pathname === link.href ? "text-accent font-semibold" : "text-muted-foreground"
            )}>
              <Link href={link.href} >
                {link.label}
              </Link>
            </Button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn(
                "transition-colors hover:text-accent hover:bg-transparent px-3 outline-none",
                isToolLinkActive ? "text-accent font-semibold" : "text-muted-foreground"
              )}>
                Explore tools
                <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {toolLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild className="cursor-pointer">
                  <Link
                    href={link.href}
                    className={cn(
                      "w-full flex items-center", 
                      pathname === link.href ? "text-accent font-semibold" : ""
                    )}
                  >
                    {link.icon && <link.icon className="mr-2 h-4 w-4" /> }
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-primary-foreground" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background text-foreground p-6 flex flex-col">
              <div className="mb-8">
                 <Link href="/" className="flex items-center space-x-2">
                    <Rocket className="h-7 w-7 text-accent" />
                    <span className="font-bold text-xl font-headline">ContentFlow</span>
                </Link>
              </div>
              <nav className="flex flex-col space-y-4 flex-grow">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg transition-colors hover:text-accent flex items-center",
                       pathname === link.href ? "text-accent font-semibold" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div>
                  <p className="text-lg text-muted-foreground mb-2 mt-2">Explore tools</p>
                  <div className="flex flex-col space-y-3 pl-4">
                    {toolLinks.map((link) => (
                       <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-lg transition-colors hover:text-accent flex items-center", 
                          pathname === link.href ? "text-accent font-semibold" : "text-foreground"
                        )}
                      >
                        {link.icon && <link.icon className="mr-2 h-5 w-5" /> }
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
