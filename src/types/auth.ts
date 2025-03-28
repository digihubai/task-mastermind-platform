
export type UserRole = 'super_admin' | 'admin' | 'user';

export interface UserWithRoles {
  id: string;
  email: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

export interface DummyCredentials {
  super_admin: {
    email: string;
    password: string;
  };
  admin: {
    email: string;
    password: string;
  };
  user: {
    email: string;
    password: string;
  };
}
