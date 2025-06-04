
'use client';

import React, { createContext, useContext, type ReactNode } from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

interface AuthContextType {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  signIn: (provider?: string, options?: Record<string, any>) => Promise<any>;
  signOut: (options?: Record<string, any>) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInternal>{children}</AuthProviderInternal>
    </SessionProvider>
  );
}

// Internal component to use hooks from SessionProvider
function AuthProviderInternal({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  
  return (
    <AuthContext.Provider value={{ session, status, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
