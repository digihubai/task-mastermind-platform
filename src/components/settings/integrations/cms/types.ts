
import { ReactNode } from 'react';

export interface CMSPlatform {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  type: 'cms' | 'ecommerce';
}

export interface CMSCardProps {
  platform: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  url: string;
  connected: boolean;
  connecting: boolean;
  onInputChange: (value: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export interface CMSFilterProps {
  filter: 'all' | 'cms' | 'ecommerce';
  searchQuery: string;
  onFilterChange: (filter: 'all' | 'cms' | 'ecommerce') => void;
  onSearchChange: (query: string) => void;
}

export interface CMSGridProps {
  urls: Record<string, string>;
  connected: Record<string, boolean>;
  connecting: string | null;
  onInputChange: (platform: string, value: string) => void;
  onConnect: (platform: string) => void;
  onDisconnect: (platform: string) => void;
  filter?: 'all' | 'cms' | 'ecommerce';
  searchQuery?: string;
}
