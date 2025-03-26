
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/hooks/use-settings";
import PricingTab from "@/components/settings/PricingTab";
import FeaturesTab from "@/components/settings/FeaturesTab";
import GeneralTab from "@/components/settings/GeneralTab";
import IntegrationsTab from "@/components/settings/IntegrationsTab";
import AIModelsTab from "@/components/settings/AIModelsTab";
import LocalizationTab from "@/components/settings/LocalizationTab";
import TwilioPhoneNumbers from "@/components/phone/TwilioPhoneNumbers";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pricing");
  const {
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
  } = useSettings();
  
  const handleSave = () => {
    handleSaveChanges();
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully saved.",
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
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <Save size={18} />
            <span>Save Changes</span>
          </Button>
        </div>
        
        <Tabs defaultValue="pricing" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full md:w-auto">
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="aimodels">AI Models</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="pricing" className="space-y-6">
              <PricingTab 
                pricingPlans={pricingPlans}
                featureCategories={featureCategories}
                onPlanChange={handlePlanChange}
                onPlanFeatureToggle={handlePlanFeatureToggle}
                onAddPlan={handleAddPlan}
                onDeletePlan={handleDeletePlan}
              />
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <FeaturesTab 
                featureCategories={featureCategories}
                onToggleFeature={handleToggleFeature}
                onDeleteFeature={handleDeleteFeature}
                onAddFeature={handleAddFeature}
              />
            </TabsContent>
            
            <TabsContent value="general" className="space-y-6">
              <GeneralTab />
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6">
              <IntegrationsTab />
            </TabsContent>
            
            <TabsContent value="aimodels" className="space-y-6">
              <AIModelsTab />
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-6">
              <TwilioPhoneNumbers />
            </TabsContent>
            
            <TabsContent value="localization" className="space-y-6">
              <LocalizationTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
