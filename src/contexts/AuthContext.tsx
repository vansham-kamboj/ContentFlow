
'use client';

import React, { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from 'react';
import { findUserById, type NotionUser } from '@/lib/notion';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: NotionUser | null;
  isLoading: boolean;
  error: string | null;
  loginWithNotionId: (pageId: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const NOTION_USER_ID_KEY = 'contentFlowNotionUserId';

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<NotionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading true to check local storage
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const logout = useCallback(() => {
    setCurrentUser(null);
    setError(null);
    setIsLoading(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(NOTION_USER_ID_KEY);
    }
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  }, [toast]);

  const loginWithNotionId = useCallback(async (pageId: string) => {
    if (!pageId.trim()) {
        setError("Notion User ID cannot be empty.");
        toast({ title: "Login Failed", description: "Notion User ID cannot be empty.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const user = await findUserById(pageId.trim());
      if (user) {
        setCurrentUser(user);
        if (typeof window !== 'undefined') {
          localStorage.setItem(NOTION_USER_ID_KEY, user.id);
        }
        toast({ title: "Login Successful", description: `Welcome back, ${user.name || 'User'}!` });
      } else {
        setError("User not found with the provided Notion ID, or the ID is invalid.");
        setCurrentUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(NOTION_USER_ID_KEY);
        }
        toast({ title: "Login Failed", description: "User not found or ID is invalid.", variant: "destructive" });
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during login.";
      setError(errorMessage);
      setCurrentUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(NOTION_USER_ID_KEY);
      }
      toast({ title: "Login Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // Check local storage for persisted user ID on initial load
    const persistedUserId = typeof window !== 'undefined' ? localStorage.getItem(NOTION_USER_ID_KEY) : null;
    if (persistedUserId) {
      loginWithNotionId(persistedUserId);
    } else {
      setIsLoading(false); // No persisted user, stop loading
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loginWithNotionId is stable due to useCallback

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, error, loginWithNotionId, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProviderWrapper');
  }
  return context;
}
