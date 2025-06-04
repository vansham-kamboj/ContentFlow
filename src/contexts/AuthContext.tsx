
'use client';

import React, { createContext, useContext, type ReactNode } from 'react';
import type { User } from '@/lib/user'; // Keep User type for potential future use if needed elsewhere

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginWithUsername: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  // No user state, login is removed
  const currentUser = null;
  const isLoading = false;
  const error = null;

  const loginWithUsername = async (username: string): Promise<void> => {
    // No-op: Login functionality removed
    console.warn("Login functionality has been removed. Call to loginWithUsername for user:", username, "ignored.");
    return Promise.resolve();
  };

  const logout = (): void => {
    // No-op: Logout functionality removed
    console.warn("Logout functionality has been removed. Call to logout ignored.");
  };

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
