
'use client';

import React, { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from 'react';
import type { User } from '@/lib/user'; // Updated import
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  loginWithUsername: (username: string) => Promise<void>; // Renamed and signature changed
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOGGED_IN_USERNAME_KEY = 'contentFlowLoggedInUsername'; // Key for local storage

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start true to handle initial load/re-login
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const logout = useCallback(() => {
    setCurrentUser(null);
    setError(null);
    setIsLoading(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOGGED_IN_USERNAME_KEY);
    }
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  }, [toast]);

  const loginWithUsername = useCallback(async (username: string) => {
    if (!username.trim()) {
        setError("Username cannot be empty.");
        toast({ title: "Login Failed", description: "Username cannot be empty.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data as User);
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOGGED_IN_USERNAME_KEY, (data as User).username);
        }
        toast({ title: "Login Successful", description: `Welcome back, ${data.name || data.username}!` });
      } else {
        // Use the error message from the API response
        const apiError = data.error || "Login failed. Please check your username.";
        setError(apiError);
        setCurrentUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(LOGGED_IN_USERNAME_KEY);
        }
        toast({ title: "Login Failed", description: apiError, variant: "destructive" });
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = "Could not connect to login service. Please try again later.";
      setError(errorMessage);
      setCurrentUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LOGGED_IN_USERNAME_KEY);
      }
      toast({ title: "Login Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const persistedUsername = typeof window !== 'undefined' ? localStorage.getItem(LOGGED_IN_USERNAME_KEY) : null;
    if (persistedUsername) {
      loginWithUsername(persistedUsername).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loginWithUsername is stable, run once on mount.

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, error, loginWithUsername, logout }}>
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
