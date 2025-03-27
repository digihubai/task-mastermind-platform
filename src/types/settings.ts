
export interface Feature {
  id: string;
  name: string;
  description?: string;
  included: boolean;
}

export interface FeatureCategory {
  name: string;
  features: Feature[];
}

export interface PlanFeature {
  id: string;
  included: boolean;
  limits?: {
    type: "limited" | "unlimited";
    value?: number;
    unit?: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  isPopular: boolean;
  features: PlanFeature[];
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: string;
  description: string;
  capabilities: string[];
  contextLength: number;
  enabled: boolean;
  isDefault: boolean;
  apiKey?: string;
}

export interface Integration {
  id: string;
  name: string;
  provider: string;
  description: string;
  enabled: boolean;
  connected: boolean;
  icon: string;
  lastSynced?: string;
  authType: "oauth" | "apiKey" | "appKey";
  credentials?: Record<string, string>;
}

export interface LocalizationSettings {
  language: string;
  dateFormat: string;
  timeFormat: string;
  timezone: string;
  currency: string;
}

export interface GeneralSettings {
  companyName: string;
  website: string;
  primaryEmail: string;
  primaryPhone: string;
  logoUrl: string;
  faviconUrl: string;
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
  };
}
