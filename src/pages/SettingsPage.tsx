import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusCircle, Trash2, Save, DollarSign, Check, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Feature {
  id: string;
  name: string;
  description: string;
  included: boolean;
}

interface PlanFeature extends Feature {
  limits?: {
    type: 'count' | 'storage' | 'unlimited';
    value?: number;
    unit?: string;
  };
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  isPopular: boolean;
  features: PlanFeature[];
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pricing");
  
  // Initial feature categories
  const [featureCategories, setFeatureCategories] = useState([
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
  ]);
  
  // Initial pricing plans
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
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
  ]);
  
  const [newFeatureName, setNewFeatureName] = useState("");
  const [newFeatureDescription, setNewFeatureDescription] = useState("");
  const [newFeatureCategory, setNewFeatureCategory] = useState(featureCategories[0].name);
  
  const handleAddFeature = () => {
    if (!newFeatureName.trim()) {
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
      name: newFeatureName,
      description: newFeatureDescription,
      included: false,
    };
    
    setFeatureCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.name === newFeatureCategory) {
          return {
            ...category,
            features: [...category.features, newFeature]
          };
        }
        return category;
      });
    });
    
    setNewFeatureName("");
    setNewFeatureDescription("");
    
    toast({
      title: "Feature added",
      description: `${newFeatureName} has been added to ${newFeatureCategory}`,
    });
  };
  
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
            let featureToAdd: Feature | null = null;
            
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
  
  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your pricing and feature changes have been saved",
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
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your platform settings and configurations
            </p>
          </div>
          
          <Button
            onClick={handleSaveChanges}
            className="flex items-center gap-2"
          >
            <Save size={18} />
            <span>Save Changes</span>
          </Button>
        </div>
        
        <Tabs defaultValue="pricing" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="pricing" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Pricing Plans</h2>
                    <Button
                      onClick={handleAddPlan}
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <PlusCircle size={16} />
                      <span>Add Plan</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {pricingPlans.map(plan => (
                      <Card key={plan.id} className="border border-border/40">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Input
                                  value={plan.name}
                                  onChange={(e) => handlePlanChange(plan.id, 'name', e.target.value)}
                                  className="text-xl font-semibold h-10"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="shrink-0 text-destructive"
                                  onClick={() => handleDeletePlan(plan.id)}
                                >
                                  <Trash2 size={18} />
                                </Button>
                              </div>
                              
                              <Input
                                value={plan.description}
                                onChange={(e) => handlePlanChange(plan.id, 'description', e.target.value)}
                                className="text-muted-foreground mb-4"
                              />
                              
                              <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`plan-popular-${plan.id}`}>Popular</Label>
                                  <Switch
                                    id={`plan-popular-${plan.id}`}
                                    checked={plan.isPopular}
                                    onCheckedChange={(checked) => handlePlanChange(plan.id, 'isPopular', checked)}
                                  />
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`plan-period-${plan.id}`}>Annual Billing</Label>
                                  <Switch
                                    id={`plan-period-${plan.id}`}
                                    checked={plan.billingPeriod === 'yearly'}
                                    onCheckedChange={(checked) => handlePlanChange(plan.id, 'billingPeriod', checked ? 'yearly' : 'monthly')}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-end">
                              <div className="flex items-center gap-2">
                                <DollarSign size={20} className="text-muted-foreground" />
                                <Input
                                  type="number"
                                  value={plan.price}
                                  onChange={(e) => handlePlanChange(plan.id, 'price', parseFloat(e.target.value) || 0)}
                                  className="w-24 text-2xl font-bold h-10"
                                />
                                <span className="text-muted-foreground">/ {plan.billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Separator className="my-6" />
                          
                          <h3 className="font-medium mb-4">Plan Features</h3>
                          
                          <div className="space-y-6">
                            {featureCategories.map((category, categoryIndex) => (
                              <div key={categoryIndex}>
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{category.name}</h4>
                                <div className="space-y-2">
                                  {category.features.map((feature, featureIndex) => {
                                    const planFeature = plan.features.find(f => f.id === feature.id);
                                    const isIncluded = planFeature ? planFeature.included : false;
                                    
                                    return (
                                      <div key={feature.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
                                        <div className="flex-1">
                                          <p className="font-medium">{feature.name}</p>
                                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                          {planFeature && planFeature.limits && planFeature.limits.type !== 'unlimited' && (
                                            <div className="flex items-center gap-2">
                                              <Input
                                                type="number"
                                                value={planFeature.limits.value}
                                                onChange={(e) => {
                                                  const value = parseInt(e.target.value) || 0;
                                                  setPricingPlans(prevPlans => {
                                                    return prevPlans.map(p => {
                                                      if (p.id === plan.id) {
                                                        return {
                                                          ...p,
                                                          features: p.features.map(f => {
                                                            if (f.id === feature.id) {
                                                              return {
                                                                ...f,
                                                                limits: {
                                                                  ...f.limits,
                                                                  value
                                                                }
                                                              };
                                                            }
                                                            return f;
                                                          })
                                                        };
                                                      }
                                                      return p;
                                                    });
                                                  });
                                                }}
                                                className="w-20 h-8 text-sm"
                                              />
                                              <span className="text-xs text-muted-foreground">{planFeature.limits.unit}</span>
                                            </div>
                                          )}
                                          
                                          {planFeature && planFeature.limits && planFeature.limits.type === 'unlimited' ? (
                                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                              Unlimited
                                            </Badge>
                                          ) : (
                                            <div className="flex items-center gap-2">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`rounded-full h-6 w-6 p-0 ${isIncluded ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                                                onClick={() => handlePlanFeatureToggle(plan.id, feature.id)}
                                              >
                                                {isIncluded ? <Check size={14} /> : <Plus size={14} />}
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Feature Management</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="new-feature-name">Feature Name</Label>
                      <Input
                        id="new-feature-name"
                        value={newFeatureName}
                        onChange={(e) => setNewFeatureName(e.target.value)}
                        placeholder="Enter feature name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="new-feature-category">Category</Label>
                      <select
                        id="new-feature-category"
                        value={newFeatureCategory}
                        onChange={(e) => setNewFeatureCategory(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:border-primary/20 transition-colors"
                      >
                        {featureCategories.map((category, index) => (
                          <option key={index} value={category.name}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="new-feature-description">Description</Label>
                      <Input
                        id="new-feature-description"
                        value={newFeatureDescription}
                        onChange={(e) => setNewFeatureDescription(e.target.value)}
                        placeholder="Enter feature description"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddFeature}
                      className="flex items-center gap-2"
                    >
                      <PlusCircle size={16} />
                      <span>Add Feature</span>
                    </Button>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    {featureCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="border border-border/40 rounded-lg overflow-hidden">
                        <div className="bg-secondary/50 px-4 py-3 border-b border-border/40">
                          <h3 className="font-medium">{category.name}</h3>
                        </div>
                        
                        <div className="p-4 space-y-2">
                          {category.features.map((feature, featureIndex) => (
                            <div key={feature.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
                              <div className="flex-1">
                                <p className="font-medium">{feature.name}</p>
                                <p className="text-xs text-muted-foreground">{feature.description}</p>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Switch
                                  id={`feature-${feature.id}`}
                                  checked={feature.included}
                                  onCheckedChange={() => handleToggleFeature(categoryIndex, featureIndex)}
                                />
                                
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive"
                                  onClick={() => handleDeleteFeature(categoryIndex, featureIndex)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          {category.features.length === 0 && (
                            <p className="text-sm text-muted-foreground py-2">No features in this category</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="general" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">General Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-medium">Company Information</h3>
                          <p className="text-sm text-muted-foreground">Update your company details and branding</p>
                        </div>
                        <Button variant="outline">Edit</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-medium">User Management</h3>
                          <p className="text-sm text-muted-foreground">Manage users, roles and permissions</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-medium">Email Templates</h3>
                          <p className="text-sm text-muted-foreground">Customize notification and marketing emails</p>
                        </div>
                        <Button variant="outline">Customize</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-medium">Security Settings</h3>
                          <p className="text-sm text-muted-foreground">Configure security options and access controls</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-medium">Billing & Subscription</h3>
                          <p className="text-sm text-muted-foreground">Manage payment methods and subscription details</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Integration Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">Asana</h3>
                            <p className="text-sm text-muted-foreground">Project management integration</p>
                          </div>
                          <Switch id="asana-integration" />
                        </div>
                        <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
                      </div>
                      
                      <div className="flex flex-col p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">Trello</h3>
                            <p className="text-sm text-muted-foreground">Project management integration</p>
                          </div>
                          <Switch id="trello-integration" />
                        </div>
                        <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
                      </div>
                      
                      <div className="flex flex-col p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">ClickUp</h3>
                            <p className="text-sm text-muted-foreground">Project management integration</p>
                          </div>
                          <Switch id="clickup-integration" />
                        </div>
                        <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
                      </div>
                      
                      <div className="flex flex-col p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">Monday</h3>
                            <p className="text-sm text-muted-foreground">Project management integration</p>
                          </div>
                          <Switch id="monday-integration" />
                        </div>
                        <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
                      </div>
                      
                      <div className="flex flex-col p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">Notion</h3>
                            <p className="text-sm text-muted-foreground">Project management integration</p>
                          </div>
                          <Switch id="notion-integration" />
                        </div>
                        <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
                      </div>
                      
                      <div className="flex flex-col p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">WhatsApp Business</h3>
                            <p className="text-sm text-muted-foreground">Messaging integration</p>
                          </div>
                          <Switch id="whatsapp-integration" checked />
                        </div>
                        <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
                      </div>
                      
                      <div className="flex flex-col p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">Shopify</h3>
                            <p className="text-sm text-muted-foreground">E-commerce integration</p>
                          </div>
                          <Switch id="shopify-integration" checked />
                        </div>
                        <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
                      </div>
                      
                      <div className="flex flex-col p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">WooCommerce</h3>
                            <p className="text-sm text-muted-foreground">E-commerce integration</p>
                          </div>
                          <Switch id="woocommerce-integration" />
                        </div>
                        <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Add integration",
                            description: "Integration wizard will be available soon",
                          });
                        }}
                        className="flex items-center gap-2"
                      >
                        <PlusCircle size={16} />
                        <span>Add New Integration</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
