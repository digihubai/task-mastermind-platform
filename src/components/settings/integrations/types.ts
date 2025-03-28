
export interface ApiIntegration {
  id: string;
  name: string;
  description: string; 
  icon: React.ReactNode;
  category: 'ai' | 'communication' | 'ecommerce' | 'tools' | 'analytics';
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
