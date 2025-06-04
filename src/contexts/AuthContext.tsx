
'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  type User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // Corrected import

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check if auth is properly initialized
    if (!auth || Object.keys(auth).length === 0) {
      console.warn("AuthContext: Firebase Auth is not initialized. Skipping onAuthStateChanged listener.");
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    // Check if auth is properly initialized before attempting sign-in
    if (!auth || Object.keys(auth).length === 0) {
      toast({
        title: "Authentication Error",
        description: "Firebase is not properly configured. Please check environment variables.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({ title: "Signed In", description: "Successfully signed in with Google." });
      router.push('/'); // Redirect to home or dashboard after login
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      toast({
        title: "Sign In Failed",
        description: error.message || "An unexpected error occurred during sign-in.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    // Check if auth is properly initialized
     if (!auth || Object.keys(auth).length === 0) {
      toast({
        title: "Authentication Error",
        description: "Firebase is not properly configured. Sign out cannot proceed.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    try {
      await firebaseSignOut(auth);
      toast({ title: "Signed Out", description: "Successfully signed out." });
      router.push('/'); // Redirect to home after logout
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign Out Failed",
        description: error.message || "An unexpected error occurred during sign-out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
