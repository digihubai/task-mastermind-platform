
import { useState } from 'react';
import { PricingPlan, FeatureCategory } from '@/types/settings';
import { useToast } from '@/hooks/use-toast';

// Initial feature categories data
const initialFeatureCategories: FeatureCategory[] = [
  {
    name: "Project Management",
    features: [
      { id: "pm1", name: "Project Creation", description: "Ability to create new projects", included: true },
      { id: "pm2", name: "Task Management", description: "Create and assign tasks to team members", included: true },
      { id: "pm3", name: "File Sharing", description: "Share files and documents within projects", included: true },
      { id: "pm4", name: "Progress Tracking", description: "Track project progress and milestones", included: true },
      { id: "pm5", name: "AI Task Reassignment", description: "Automatic task reassignment based on availability", included: false },
    ]
  },
  {
    name: "Communication",
    features: [
      { id: "comm1", name: "Team Chat", description: "Real-time messaging between team members", included: true },
      { id: "comm2", name: "Client Communication", description: "Communicate with clients through the platform", included: true },
      { id: "comm3", name: "Video Meetings", description: "Host video meetings and screen sharing", included: false },
      { id: "comm4", name: "AI Meeting Summaries", description: "Automatic summarization of meetings", included: false },
    ]
  },
  {
    name: "Chatbot",
    features: [
      { id: "cb1", name: "Website Integration", description: "Embed chatbot on your website", included: true },
      { id: "cb2", name: "WhatsApp Integration", description: "Connect chatbot to WhatsApp Business", included: false },
      { id: "cb3", name: "Facebook Messenger", description: "Integrate with Facebook Messenger", included: false },
      { id: "cb4", name: "Email Integration", description: "Integrate with email systems", included: false },
      { id: "cb5", name: "E-commerce Integration", description: "Connect to Shopify and WooCommerce", included: false },
    ]
  },
  {
    name: "CRM",
    features: [
      { id: "crm1", name: "Contact Management", description: "Manage and organize customer contacts", included: true },
      { id: "crm2", name: "Lead Tracking", description: "Track and manage sales leads", included: true },
      { id: "crm3", name: "Sales Pipeline", description: "Visualize and manage sales pipeline", included: false },
      { id: "crm4", name: "AI Lead Scoring", description: "Automatic lead scoring and prioritization", included: false },
    ]
  },
  {
    name: "Marketing",
    features: [
      { id: "mkt1", name: "Email Campaigns", description: "Create and send email marketing campaigns", included: false },
      { id: "mkt2", name: "Social Media Integration", description: "Post and schedule on social media", included: false },
      { id: "mkt3", name: "Landing Page Builder", description: "Create and publish landing pages", included: false },
      { id: "mkt4", name: "AI Content Generation", description: "Generate marketing content with AI", included: false },
    ]
  },
  {
    name: "Analytics",
    features: [
      { id: "an1", name: "Basic Reporting", description: "View basic usage and performance reports", included: true },
      { id: "an2", name: "Advanced Analytics", description: "Detailed analytics and custom reports", included: false },
      { id: "an3", name: "AI Insights", description: "AI-powered insights and recommendations", included: false },
      { id: "an4", name: "Export Data", description: "Export data and reports", included: false },
    ]
  },
];

// Initial pricing plans data
const initialPricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses and startups",
    price: 29,
    billingPeriod: "monthly",
    isPopular: false,
    features: [
      { id: "pm1", name: "Project Creation", description: "Ability to create new projects", included: true, 
        limits: { type: 'count', value: 5, unit: 'projects' }},
      { id: "pm2", name: "Task Management", description: "Create and assign tasks to team members", included: true },
      { id: "comm1", name: "Team Chat", description: "Real-time messaging between team members", included: true, 
        limits: { type: 'count', value: 3, unit: 'users' }},
      { id: "cb1", name: "Website Integration", description: "Embed chatbot on your website", included: true, 
        limits: { type: 'count', value: 1, unit: 'chatbot' }},
      { id: "crm1", name: "Contact Management", description: "Manage and organize customer contacts", included: true, 
        limits: { type: 'count', value: 100, unit: 'contacts' }},
      { id: "an1", name: "Basic Reporting", description: "View basic usage and performance reports", included: true }
    ]
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing teams and businesses",
    price: 79,
    billingPeriod: "monthly",
    isPopular: true,
    features: [
      { id: "pm1", name: "Project Creation", description: "Ability to create new projects", included: true, 
        limits: { type: 'count', value: 20, unit: 'projects' }},
      { id: "pm2", name: "Task Management", description: "Create and assign tasks to team members", included: true },
      { id: "pm3", name: "File Sharing", description: "Share files and documents within projects", included: true },
      { id: "pm4", name: "Progress Tracking", description: "Track project progress and milestones", included: true },
      { id: "comm1", name: "Team Chat", description: "Real-time messaging between team members", included: true, 
        limits: { type: 'count', value: 10, unit: 'users' }},
      { id: "comm2", name: "Client Communication", description: "Communicate with clients through the platform", included: true },
      { id: "cb1", name: "Website Integration", description: "Embed chatbot on your website", included: true, 
        limits: { type: 'count', value: 1, unit: 'chatbot' }},
      { id: "cb2", name: "WhatsApp Integration", description: "Connect chatbot to WhatsApp Business", included: true },
      { id: "crm1", name: "Contact Management", description: "Manage and organize customer contacts", included: true, 
        limits: { type: 'count', value: 1000, unit: 'contacts' }},
      { id: "crm2", name: "Lead Tracking", description: "Track and manage sales leads", included: true },
      { id: "an1", name: "Basic Reporting", description: "View basic usage and performance reports", included: true },
      { id: "an2", name: "Advanced Analytics", description: "Detailed analytics and custom reports", included: true }
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Advanced features for large organizations",
    price: 199,
    billingPeriod: "monthly",
    isPopular: false,
    features: [
      { id: "pm1", name: "Project Creation", description: "Ability to create new projects", included: true, 
        limits: { type: 'unlimited' }},
      { id: "pm2", name: "Task Management", description: "Create and assign tasks to team members", included: true },
      { id: "pm3", name: "File Sharing", description: "Share files and documents within projects", included: true },
      { id: "pm4", name: "Progress Tracking", description: "Track project progress and milestones", included: true },
      { id: "pm5", name: "AI Task Reassignment", description: "Automatic task reassignment based on availability", included: true },
      { id: "comm1", name: "Team Chat", description: "Real-time messaging between team members", included: true, 
        limits: { type: 'unlimited' }},
      { id: "comm2", name: "Client Communication", description: "Communicate with clients through the platform", included: true },
      { id: "comm3", name: "Video Meetings", description: "Host video meetings and screen sharing", included: true },
      { id: "comm4", name: "AI Meeting Summaries", description: "Automatic summarization of meetings", included: true },
      { id: "cb1", name: "Website Integration", description: "Embed chatbot on your website", included: true, 
        limits: { type: 'count', value: 5, unit: 'chatbots' }},
      { id: "cb2", name: "WhatsApp Integration", description: "Connect chatbot to WhatsApp Business", included: true },
      { id: "cb3", name: "Facebook Messenger", description: "Integrate with Facebook Messenger", included: true },
      { id: "cb4", name: "Email Integration", description: "Integrate with email systems", included: true },
      { id: "cb5", name: "E-commerce Integration", description: "Connect to Shopify and WooCommerce", included: true },
      { id: "crm1", name: "Contact Management", description: "Manage and organize customer contacts", included: true, 
        limits: { type: 'unlimited' }},
      { id: "crm2", name: "Lead Tracking", description: "Track and manage sales leads", included: true },
      { id: "crm3", name: "Sales Pipeline", description: "Visualize and manage sales pipeline", included: true },
      { id: "crm4", name: "AI Lead Scoring", description: "Automatic lead scoring and prioritization", included: true },
      { id: "mkt1", name: "Email Campaigns", description: "Create and send email marketing campaigns", included: true },
      { id: "mkt2", name: "Social Media Integration", description: "Post and schedule on social media", included: true },
      { id: "an1", name: "Basic Reporting", description: "View basic usage and performance reports", included: true },
      { id: "an2", name: "Advanced Analytics", description: "Detailed analytics and custom reports", included: true },
      { id: "an3", name: "AI Insights", description: "AI-powered insights and recommendations", included: true },
      { id: "an4", name: "Export Data", description: "Export data and reports", included: true }
    ]
  }
];

export function useSettings() {
  const { toast } = useToast();
  const [featureCategories, setFeatureCategories] = useState<FeatureCategory[]>(initialFeatureCategories);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(initialPricingPlans);

  const handleToggleFeature = (categoryIndex: number, featureIndex: number) => {
    setFeatureCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const feature = newCategories[categoryIndex].features[featureIndex];
      newCategories[categoryIndex].features[featureIndex] = {
        ...feature,
        included: !feature.included
      };
      return newCategories;
    });
  };
  
  const handleDeleteFeature = (categoryIndex: number, featureIndex: number) => {
    setFeatureCategories(prevCategories => {
      const newCategories = [...prevCategories];
      newCategories[categoryIndex].features.splice(featureIndex, 1);
      return newCategories;
    });
    
    toast({
      title: "Feature deleted",
      description: "The feature has been removed",
    });
  };
  
  const handleAddFeature = (name: string, description: string, category: string) => {
    if (!name.trim()) {
      toast({
        title: "Feature name required",
        description: "Please enter a name for the feature",
        variant: "destructive",
      });
      return;
    }
    
    const featureId = `custom-${Date.now()}`;
    const newFeature = {
      id: featureId,
      name,
      description,
      included: false,
    };
    
    setFeatureCategories(prevCategories => {
      return prevCategories.map(categoryItem => {
        if (categoryItem.name === category) {
          return {
            ...categoryItem,
            features: [...categoryItem.features, newFeature]
          };
        }
        return categoryItem;
      });
    });
    
    toast({
      title: "Feature added",
      description: `${name} has been added to ${category}`,
    });
  };
  
  const handlePlanChange = (planId: string, field: keyof PricingPlan, value: any) => {
    setPricingPlans(prevPlans => {
      return prevPlans.map(plan => {
        if (plan.id === planId) {
          return {
            ...plan,
            [field]: value
          };
        }
        return plan;
      });
    });
  };
  
  const handlePlanFeatureToggle = (planId: string, featureId: string) => {
    setPricingPlans(prevPlans => {
      return prevPlans.map(plan => {
        if (plan.id === planId) {
          // Check if feature exists in plan
          const featureIndex = plan.features.findIndex(f => f.id === featureId);
          
          if (featureIndex >= 0) {
            // Toggle existing feature
            const updatedFeatures = [...plan.features];
            updatedFeatures[featureIndex] = {
              ...updatedFeatures[featureIndex],
              included: !updatedFeatures[featureIndex].included
            };
            return {
              ...plan,
              features: updatedFeatures
            };
          } else {
            // Add feature to plan
            // Find feature in categories
            let featureToAdd = null;
            
            for (const category of featureCategories) {
              const found = category.features.find(f => f.id === featureId);
              if (found) {
                featureToAdd = found;
                break;
              }
            }
            
            if (featureToAdd) {
              return {
                ...plan,
                features: [...plan.features, { ...featureToAdd, included: true }]
              };
            }
          }
        }
        return plan;
      });
    });
  };
  
  const handleAddPlan = () => {
    const newPlan: PricingPlan = {
      id: `plan-${Date.now()}`,
      name: "New Plan",
      description: "Description for the new plan",
      price: 0,
      billingPeriod: "monthly",
      isPopular: false,
      features: []
    };
    
    setPricingPlans([...pricingPlans, newPlan]);
    
    toast({
      title: "Plan added",
      description: "A new pricing plan has been added",
    });
  };
  
  const handleDeletePlan = (planId: string) => {
    setPricingPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));
    
    toast({
      title: "Plan deleted",
      description: "The pricing plan has been removed",
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your pricing and feature changes have been saved",
    });
  };

  return {
    featureCategories,
    pricingPlans,
    handleToggleFeature,
    handleDeleteFeature,
    handleAddFeature,
    handlePlanChange,
    handlePlanFeatureToggle,
    handleAddPlan,
    handleDeletePlan,
    handleSaveChanges
  };
}
