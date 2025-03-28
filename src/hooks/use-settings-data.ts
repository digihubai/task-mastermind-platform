
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FeatureCategory, PricingPlan } from '@/types/settings';

// Mock data for feature categories
const mockFeatureCategories: FeatureCategory[] = [
  {
    name: "Core Features",
    features: [
      { id: "feature-1", name: "AI Assistance", description: "Get help from AI assistants", included: true },
      { id: "feature-2", name: "Document Management", description: "Store and manage documents", included: true },
      { id: "feature-3", name: "Team Collaboration", description: "Work together with your team", included: false }
    ]
  },
  {
    name: "Advanced Features",
    features: [
      { id: "feature-4", name: "API Access", description: "Integrate with external systems", included: false },
      { id: "feature-5", name: "Custom Workflows", description: "Create your own automation workflows", included: false }
    ]
  }
];

// Mock data for pricing plans
const mockPricingPlans: PricingPlan[] = [
  {
    id: "plan-1",
    name: "Basic",
    description: "For individuals and small teams",
    price: 9.99,
    billingPeriod: "monthly",
    isPopular: false,
    features: [
      { id: "feature-1", included: true, limits: { type: "limited", value: 100, unit: "uses/month" } },
      { id: "feature-2", included: true, limits: { type: "limited", value: 5, unit: "GB" } },
      { id: "feature-3", included: false },
      { id: "feature-4", included: false },
      { id: "feature-5", included: false }
    ]
  },
  {
    id: "plan-2",
    name: "Pro",
    description: "For professionals and growing businesses",
    price: 29.99,
    billingPeriod: "monthly",
    isPopular: true,
    features: [
      { id: "feature-1", included: true, limits: { type: "unlimited" } },
      { id: "feature-2", included: true, limits: { type: "limited", value: 20, unit: "GB" } },
      { id: "feature-3", included: true, limits: { type: "limited", value: 10, unit: "members" } },
      { id: "feature-4", included: true, limits: { type: "limited", value: 1000, unit: "requests/day" } },
      { id: "feature-5", included: false }
    ]
  }
];

export const useFeatureCategories = () => {
  const [featureCategories, setFeatureCategories] = useState<FeatureCategory[]>(mockFeatureCategories);
  const { toast } = useToast();

  const handleToggleFeature = (categoryIndex: number, featureIndex: number) => {
    const updatedCategories = [...featureCategories];
    const feature = updatedCategories[categoryIndex].features[featureIndex];
    feature.included = !feature.included;
    setFeatureCategories(updatedCategories);
    
    toast({
      title: `Feature ${feature.included ? 'enabled' : 'disabled'}`,
      description: `"${feature.name}" has been ${feature.included ? 'enabled' : 'disabled'}.`
    });
  };

  const handleDeleteFeature = (categoryIndex: number, featureIndex: number) => {
    const updatedCategories = [...featureCategories];
    const featureName = updatedCategories[categoryIndex].features[featureIndex].name;
    updatedCategories[categoryIndex].features.splice(featureIndex, 1);
    setFeatureCategories(updatedCategories);
    
    toast({
      title: "Feature deleted",
      description: `"${featureName}" has been removed.`
    });
  };

  const handleAddFeature = (name: string, description: string, categoryName: string) => {
    const updatedCategories = [...featureCategories];
    const categoryIndex = updatedCategories.findIndex(cat => cat.name === categoryName);
    
    if (categoryIndex > -1) {
      updatedCategories[categoryIndex].features.push({
        id: `feature-${Date.now()}`,
        name,
        description,
        included: false
      });
      setFeatureCategories(updatedCategories);
      
      toast({
        title: "Feature added",
        description: `"${name}" has been added to ${categoryName}.`
      });
    }
  };

  return {
    featureCategories,
    handleToggleFeature,
    handleDeleteFeature,
    handleAddFeature
  };
};

export const usePricingPlans = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(mockPricingPlans);
  const { toast } = useToast();

  const handlePlanChange = (planId: string, field: keyof PricingPlan, value: any) => {
    const updatedPlans = pricingPlans.map(plan => 
      plan.id === planId ? { ...plan, [field]: value } : plan
    );
    setPricingPlans(updatedPlans);
  };

  const handlePlanFeatureToggle = (planId: string, featureId: string) => {
    const updatedPlans = pricingPlans.map(plan => {
      if (plan.id === planId) {
        const features = plan.features.map(feature => {
          if (feature.id === featureId) {
            return { ...feature, included: !feature.included };
          }
          return feature;
        });
        return { ...plan, features };
      }
      return plan;
    });
    setPricingPlans(updatedPlans);
  };

  const handleAddPlan = () => {
    const newPlan: PricingPlan = {
      id: `plan-${Date.now()}`,
      name: "New Plan",
      description: "Description for the new plan",
      price: 0,
      billingPeriod: "monthly",
      isPopular: false,
      features: mockFeatureCategories.flatMap(category => 
        category.features.map(feature => ({
          id: feature.id,
          included: false
        }))
      )
    };
    
    setPricingPlans([...pricingPlans, newPlan]);
    
    toast({
      title: "Plan added",
      description: "A new pricing plan has been added."
    });
  };

  const handleDeletePlan = (planId: string) => {
    const planToDelete = pricingPlans.find(plan => plan.id === planId);
    const updatedPlans = pricingPlans.filter(plan => plan.id !== planId);
    setPricingPlans(updatedPlans);
    
    toast({
      title: "Plan deleted",
      description: `"${planToDelete?.name}" has been removed.`
    });
  };

  return {
    pricingPlans,
    handlePlanChange,
    handlePlanFeatureToggle,
    handleAddPlan,
    handleDeletePlan
  };
};
