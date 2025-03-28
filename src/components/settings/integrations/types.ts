
export interface ApiIntegration {
  id: string;
  name: string;
  description: string; 
  icon: React.ReactNode;
  category: 'ai' | 'communication' | 'ecommerce' | 'tools' | 'analytics' | 'cms';
  isActive: boolean;
  apiKey?: string;
  credits?: number;
  usageLimit?: number;
  usageCount?: number;
}

export interface ApiCreditData {
  total: number;
  used: number;
  categories: {
    name: string; 
    used: number; 
    total: number
  }[];
}

export interface IntegrationProps {
  onIntegrationToggle?: (id: string, category: ApiIntegration['category']) => void;
  onApiKeyUpdate?: (id: string, value: string) => void;
  onConnect?: (id: string) => void;
}
