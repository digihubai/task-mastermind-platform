
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
}

// Sign up a new user
export const signUp = async (email: string, password: string, metadata?: { first_name?: string; last_name?: string }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in signUp:", error);
    throw error;
  }
};

// Sign in a user
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in signIn:", error);
    throw error;
  }
};

// Sign out a user
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(error.message);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error in signOut:", error);
    throw error;
  }
};

// Get the current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Error getting current user:", error);
      return null;
    }
    
    return data.user;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        ...updates, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      toast.error(`Failed to update profile: ${error.message}`);
      throw error;
    }
    
    toast.success("Profile updated successfully");
    return data as UserProfile;
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
};

// Create an auth state hook
export const getAuthState = async (): Promise<AuthState> => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return { user: null, profile: null, loading: false };
    }
    
    const profile = await getUserProfile(user.id);
    
    return {
      user,
      profile,
      loading: false
    };
  } catch (error) {
    console.error("Error in getAuthState:", error);
    return { user: null, profile: null, loading: false };
  }
};
