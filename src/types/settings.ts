
export interface Feature {
  id: string;
  name: string;
  description: string;
  included: boolean;
}

export interface PlanFeature extends Feature {
  limits?: {
    type: 'count' | 'storage' | 'unlimited';
    value?: number;
    unit?: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  isPopular: boolean;
  features: PlanFeature[];
}

export interface FeatureCategory {
  name: string;
  features: Feature[];
}
