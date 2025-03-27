
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { GeneralTab } from '@/components/settings/GeneralTab';
import { IntegrationsTab } from '@/components/settings/IntegrationsTab';
import { FeaturesTab } from '@/components/settings/FeaturesTab';
import { LocalizationTab } from '@/components/settings/LocalizationTab';
import { PricingTab } from '@/components/settings/PricingTab';
// Import as a named import, not a default import
import { AIModelsTab } from '@/components/settings/AIModelsTab';
import { 
  Settings,
  Puzzle,
  Globe,
  CreditCard,
  Bot,
  ChevronRight
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

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
              <FeaturesTab />
            </TabsContent>
            <TabsContent value="localization" className="m-0">
              <LocalizationTab />
            </TabsContent>
            <TabsContent value="ai-models" className="m-0">
              <AIModelsTab />
            </TabsContent>
            <TabsContent value="billing" className="m-0">
              <PricingTab />
            </TabsContent>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
