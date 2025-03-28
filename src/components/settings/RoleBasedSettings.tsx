
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Puzzle, 
  Bot, 
  Globe, 
  CreditCard, 
  ChevronRight,
  Database,
  Shield,
  Users,
  Code,
  List,
  ClipboardList
} from "lucide-react";
import GeneralTab from '@/components/settings/GeneralTab';
import IntegrationsTab from '@/components/settings/IntegrationsTab';
import FeaturesTab from '@/components/settings/FeaturesTab';
import LocalizationTab from '@/components/settings/LocalizationTab';
import PricingTab from '@/components/settings/PricingTab';
import { AIModelsTab } from '@/components/settings/AIModelsTab';
import useRoleBasedSettings from '@/hooks/use-role-based-settings';
import { useFeatureCategories, usePricingPlans } from '@/hooks/use-settings-data';

interface RoleBasedSettingsProps {
  defaultTab?: string;
}

const RoleBasedSettings: React.FC<RoleBasedSettingsProps> = ({ defaultTab = 'general' }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  const { userRole, hasAccess } = useRoleBasedSettings();
  
  // Get data for settings from our hooks
  const { featureCategories, handleToggleFeature, handleDeleteFeature, handleAddFeature } = useFeatureCategories();
  const { 
    pricingPlans, 
    handlePlanChange, 
    handlePlanFeatureToggle, 
    handleAddPlan, 
    handleDeletePlan 
  } = usePricingPlans();

  return (
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
                disabled={!hasAccess('general')}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>General</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </TabsTrigger>
              
              {hasAccess('integrations') && (
                <TabsTrigger
                  value="integrations"
                  className="w-full justify-start px-3 py-3"
                >
                  <Puzzle className="mr-2 h-4 w-4" />
                  <span>Integrations</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('features') && (
                <TabsTrigger
                  value="features"
                  className="w-full justify-start px-3 py-3"
                >
                  <List className="mr-2 h-4 w-4" />
                  <span>Features</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('localization') && (
                <TabsTrigger
                  value="localization"
                  className="w-full justify-start px-3 py-3"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Localization</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('ai_models') && (
                <TabsTrigger
                  value="ai-models"
                  className="w-full justify-start px-3 py-3"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  <span>AI Models</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('billing') && (
                <TabsTrigger
                  value="billing"
                  className="w-full justify-start px-3 py-3"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing & Plans</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('users') && (
                <TabsTrigger
                  value="users"
                  className="w-full justify-start px-3 py-3"
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>User Management</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('security') && (
                <TabsTrigger
                  value="security"
                  className="w-full justify-start px-3 py-3"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Security</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('api') && (
                <TabsTrigger
                  value="api"
                  className="w-full justify-start px-3 py-3"
                >
                  <Code className="mr-2 h-4 w-4" />
                  <span>API Settings</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('database') && (
                <TabsTrigger
                  value="database"
                  className="w-full justify-start px-3 py-3"
                >
                  <Database className="mr-2 h-4 w-4" />
                  <span>Database</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
              
              {hasAccess('audit') && (
                <TabsTrigger
                  value="audit"
                  className="w-full justify-start px-3 py-3"
                >
                  <ClipboardList className="mr-2 h-4 w-4" />
                  <span>Audit Logs</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </TabsTrigger>
              )}
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
        
        <TabsContent value="users" className="m-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-muted-foreground">Manage users and permissions in your organization.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="m-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <p className="text-muted-foreground">Configure security settings and policies.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="m-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">API Settings</h2>
            <p className="text-muted-foreground">Manage API keys and access.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="m-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Database Settings</h2>
            <p className="text-muted-foreground">Configure database connections and settings.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="m-0">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Audit Logs</h2>
            <p className="text-muted-foreground">View system activity and audit logs.</p>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
};

export default RoleBasedSettings;
