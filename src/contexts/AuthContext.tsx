
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
  const [isLoading, setIsLoading] = useState(true);
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
        setError(data.error || "User not found or invalid credentials.");
        setCurrentUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(LOGGED_IN_USERNAME_KEY);
        }
        toast({ title: "Login Failed", description: data.error || "User not found or invalid credentials.", variant: "destructive" });
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during login.";
      setError(errorMessage);
      setCurrentUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LOGGED_IN_USERNAME_KEY);
      }
      toast({ title: "Login Error", description: "Could not connect to login service.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // Check local storage for persisted username on initial load
    const persistedUsername = typeof window !== 'undefined' ? localStorage.getItem(LOGGED_IN_USERNAME_KEY) : null;
    if (persistedUsername) {
      // Attempt to "re-login" to fetch fresh user data if necessary, or simply set state
      // For this example, we'll re-call loginWithUsername to ensure data consistency
      // and handle cases where user details might have changed server-side.
      loginWithUsername(persistedUsername);
    } else {
      setIsLoading(false); // No persisted user, stop loading
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loginWithUsername is stable due to useCallback

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
