// User types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

// Organization types
export interface Organization {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  region?: string;
  created_at: string;
  updated_at: string;
}

// OrganizationUser types
export interface OrganizationUser {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// User roles
export type UserRole = 'admin' | 'member' | 'viewer';

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
} 