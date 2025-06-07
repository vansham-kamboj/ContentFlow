
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Rocket, ChevronDown, Wand2, MessageSquare, CalendarDays } from 'lucide-react'; // Added CalendarDays
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfileMenu } from '@/components/auth/UserProfileMenu';

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us', icon: undefined },
  { href: '/feed', label: 'Public Feed' },
  { href: '/feedback', label: 'Your Take?'}, // Added Calendar Link
];

const toolLinks = [
  { href: '/reel', label: 'Reel Planner', icon: undefined },
  { href: '/tweet-generator', label: 'X Tweet Generator', icon: undefined },
  { href: '/linkedin', label: 'LinkedIn Posts', icon: undefined },
  { href: '/hook-generator', label: 'Hook Generator', icon: undefined },
];

export function Navbar() {
  const pathname = usePathname();
  const isToolLinkActive = toolLinks.some(link => pathname === link.href);
  const isMainLinkActive = (href: string) => pathname === href;


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
              isMainLinkActive(link.href) ? "text-accent font-semibold" : "text-muted-foreground"
            )}>
              <Link href={link.href} >
                {link.icon && <link.icon className="mr-2 h-4 w-4" />}
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
            <DropdownMenuContent className="w-56 bg-card border-border" align="start">
              {toolLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild className="cursor-pointer hover:bg-muted focus:bg-muted">
                  <Link
                    href={link.href}
                    className={cn(
                      "w-full flex items-center", 
                      pathname === link.href ? "text-accent font-semibold" : "text-card-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center ml-auto">
          <UserProfileMenu />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto flex items-center">
           <div className="mr-4">
            <UserProfileMenu />
          </div>
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
                     {link.icon && <link.icon className="mr-2 h-5 w-5" /> }
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
