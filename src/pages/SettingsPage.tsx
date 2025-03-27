
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import GeneralTab from '@/components/settings/GeneralTab';
import IntegrationsTab from '@/components/settings/IntegrationsTab';
import FeaturesTab from '@/components/settings/FeaturesTab';
import LocalizationTab from '@/components/settings/LocalizationTab';
import PricingTab from '@/components/settings/PricingTab';
import { AIModelsTab } from '@/components/settings/AIModelsTab';
import { 
  Settings,
  Puzzle,
  Globe,
  CreditCard,
  Bot,
  ChevronRight
} from 'lucide-react';
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

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [featureCategories, setFeatureCategories] = useState<FeatureCategory[]>(mockFeatureCategories);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(mockPricingPlans);
  const { toast } = useToast();

  // Feature management handlers
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

  // Pricing plan handlers
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
      features: featureCategories.flatMap(category => 
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

  return (
    <AppLayout>
      <div className="container py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <Card className="p-4">
              <Tabs
                orientation="vertical"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 space-y-1">
                  <TabsTrigger
                    value="general"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>General</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="integrations"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Puzzle className="mr-2 h-4 w-4" />
                    <span>Integrations</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    <span>Features</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="localization"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Localization</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-models"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    <span>AI Models</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="w-full justify-start px-3 py-3"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing & Plans</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>
          </div>

          <div className="w-full md:w-3/4">
            <TabsContent value="general" className="m-0">
              <GeneralTab />
            </TabsContent>
            <TabsContent value="integrations" className="m-0">
              <IntegrationsTab />
            </TabsContent>
            <TabsContent value="features" className="m-0">
              <FeaturesTab 
                featureCategories={featureCategories}
                onToggleFeature={handleToggleFeature}
                onDeleteFeature={handleDeleteFeature}
                onAddFeature={handleAddFeature}
              />
            </TabsContent>
            <TabsContent value="localization" className="m-0">
              <LocalizationTab />
            </TabsContent>
            <TabsContent value="ai-models" className="m-0">
              <AIModelsTab />
            </TabsContent>
            <TabsContent value="billing" className="m-0">
              <PricingTab 
                pricingPlans={pricingPlans}
                featureCategories={featureCategories}
                onPlanChange={handlePlanChange}
                onPlanFeatureToggle={handlePlanFeatureToggle}
                onAddPlan={handleAddPlan}
                onDeletePlan={handleDeletePlan}
              />
            </TabsContent>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
