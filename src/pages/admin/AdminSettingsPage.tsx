import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Puzzle, 
  Bot, 
  Shield, 
  Database, 
  Users,
  Image
} from "lucide-react";

// Import the VisionAI component we just created
import VisionAIIntegrations from "@/components/settings/integrations/VisionAIIntegrations";

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <AppLayout>
      <div className="container py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Admin Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage administrator-only settings and configurations
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
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Security</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span>User Management</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="database"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Database className="mr-2 h-4 w-4" />
                    <span>Database</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="vision-ai"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Image className="mr-2 h-4 w-4" />
                    <span>Vision AI</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="integrations"
                    className="w-full justify-start px-3 py-3"
                  >
                    <Puzzle className="mr-2 h-4 w-4" />
                    <span>Other Integrations</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>
          </div>

          <div className="w-full md:w-3/4">
            <TabsContent value="general" className="m-0">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">General Admin Settings</h2>
                <p className="text-muted-foreground">
                  Configure global platform settings
                </p>
              </Card>
            </TabsContent>
            
            <TabsContent value="vision-ai" className="m-0">
              <VisionAIIntegrations />
            </TabsContent>
            
            {/* Other tabs content would go here */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminSettingsPage;
