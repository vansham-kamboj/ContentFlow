
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut, UserCircle } from 'lucide-react';

export function UserProfileMenu() {
  const { session, status, signIn, signOut } = useAuth();

  if (status === 'loading') {
    return <Button variant="ghost" size="sm" className="animate-pulse bg-muted w-20 h-8 rounded-md"></Button>;
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <Button onClick={() => signIn('google')} variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground">
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    );
  }

  const userName = session.user?.name || 'User';
  const userEmail = session.user?.email;
  const userImage = session.user?.image;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userImage || ''} alt={userName || 'User Avatar'} />
            <AvatarFallback>
              {userName ? userName.charAt(0).toUpperCase() : <UserCircle size={20}/>}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-card text-card-foreground border-border" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            {userEmail && <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Add other items like "Profile", "Settings" here if needed */}
        {/* <DropdownMenuItem className="cursor-pointer hover:bg-muted/50">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-muted/50">
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer hover:bg-destructive/10 text-destructive focus:bg-destructive/20 focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
