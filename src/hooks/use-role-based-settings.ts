
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

// Define permission levels for different settings features
interface PermissionMap {
  [key: string]: {
    [feature: string]: boolean;
  };
}

const permissionMap: PermissionMap = {
  super_admin: {
    general: true,
    integrations: true,
    features: true,
    localization: true,
    ai_models: true,
    billing: true,
    security: true,
    users: true,
    api: true,
    database: true,
    system: true,
    audit: true
  },
  admin: {
    general: true,
    integrations: true,
    features: true,
    localization: true,
    ai_models: true,
    billing: false,
    security: false,
    users: true,
    api: false,
    database: false,
    system: false,
    audit: false
  },
  user: {
    general: true, // But will show limited options
    integrations: false,
    features: false,
    localization: true,
    ai_models: false,
    billing: false,
    security: false,
    users: false,
    api: false,
    database: false,
    system: false,
    audit: false
  }
};

export const useRoleBasedSettings = () => {
  const { user, profile } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [availableSettings, setAvailableSettings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // For demo purposes, assign role based on email domain
  useEffect(() => {
    if (user) {
      let role: UserRole = 'user';
      
      // For demo, detect role from email
      if (user.email) {
        if (user.email.includes('superadmin')) {
          role = 'super_admin';
        } else if (user.email.includes('admin')) {
          role = 'admin';
        }
      }
      
      setUserRole(role);
      
      // Get available settings for this role
      const availableFeatures = Object.entries(permissionMap[role] || {})
        .filter(([_, hasAccess]) => hasAccess)
        .map(([feature]) => feature);
      
      setAvailableSettings(availableFeatures);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  /**
   * Check if the current user has access to a specific setting
   */
  const hasAccess = (setting: string): boolean => {
    if (!user) return false;
    return permissionMap[userRole]?.[setting] || false;
  };

  return {
    userRole,
    availableSettings,
    hasAccess,
    loading
  };
};

export default useRoleBasedSettings;
