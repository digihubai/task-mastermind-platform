
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, getCurrentUser, getUserProfile } from '@/services/authService';

interface AuthContextType extends AuthState {
  refreshProfile: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true
  });

  const refreshProfile = async () => {
    try {
      if (authState.user) {
        const profile = await getUserProfile(authState.user.id);
        setAuthState(prev => ({ ...prev, profile }));
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const user = await getCurrentUser();
        
        if (user) {
          const profile = await getUserProfile(user.id);
          setAuthState({
            user,
            profile,
            loading: false
          });
        } else {
          setAuthState({
            user: null,
            profile: null,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching auth state:', error);
        setAuthState({
          user: null,
          profile: null,
          loading: false
        });
      }
    };

    fetchAuthState();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      if (event === 'SIGNED_IN' && session) {
        const user = session.user;
        const profile = await getUserProfile(user.id);
        setAuthState({
          user,
          profile,
          loading: false
        });
      } else if (event === 'SIGNED_OUT') {
        setAuthState({
          user: null,
          profile: null,
          loading: false
        });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
