
'use client';

import React, { useState } from 'react';
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
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { LogOut, UserCircle, LogIn, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function UserProfileMenu() {
  const { currentUser, isLoading, loginWithNotionId, logout, error } = useAuth();
  const [notionIdInput, setNotionIdInput] = useState('');

  const handleLogin = async () => {
    await loginWithNotionId(notionIdInput);
    setNotionIdInput(''); // Clear input after attempt
  };

  if (isLoading) {
    return <Button variant="ghost" size="icon" className="animate-pulse rounded-full w-9 h-9 bg-muted"></Button>;
  }

  if (!currentUser) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-card text-card-foreground border-border p-4 space-y-3" align="end">
          <DropdownMenuLabel className="text-base font-medium">Login with Notion ID</DropdownMenuLabel>
          <div className="space-y-1">
            <Label htmlFor="notionIdInput" className="text-xs">Your Notion User Page ID</Label>
            <Input
              id="notionIdInput"
              type="text"
              placeholder="Enter Notion Page ID"
              value={notionIdInput}
              onChange={(e) => setNotionIdInput(e.target.value)}
              className="text-sm"
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button onClick={handleLogin} disabled={isLoading || !notionIdInput.trim()} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const userName = currentUser.name || 'User';
  const userEmail = currentUser.email;
  const userImage = currentUser.avatarUrl;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userImage || undefined} alt={userName || 'User Avatar'} />
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
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer hover:bg-destructive/10 text-destructive focus:bg-destructive/20 focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
