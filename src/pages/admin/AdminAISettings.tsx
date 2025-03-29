
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Bot, AlertCircle, BarChart3, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AIKeyConfig } from "@/components/seo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getOpenAIApiKey } from "@/services/ai/contentGenerationAI";

const AdminAISettings = () => {
  const { userRole, hasAccess } = useRoleBasedSettings();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("apikeys");
  const [hasConfiguredKey, setHasConfiguredKey] = useState(!!getOpenAIApiKey());
  
  // Redirect non-admin users
  useEffect(() => {
    if (!hasAccess("ai_models")) {
      toast.error("You don't have permission to access this page");
      navigate("/dashboard");
    }
  }, [hasAccess, navigate]);

  const handleValidKeySet = () => {
    setHasConfiguredKey(true);
    toast.success("AI configuration has been updated");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Settings Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Configure AI models and API keys for your organization
            </p>
          </div>
          
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        {(userRole === "admin" || userRole === "super_admin") ? (
          <div className="space-y-6">
            {!hasConfiguredKey && (
              <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle>API Key Required</AlertTitle>
                <AlertDescription>
                  To enable AI-powered features, you need to configure at least one API key. We recommend starting with OpenAI.
                </AlertDescription>
              </Alert>
            )}
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="apikeys">AI Providers</TabsTrigger>
                <TabsTrigger value="usage">Usage & Analytics</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Configuration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="apikeys" className="space-y-6">
                <AIKeyConfig onValidKeySet={handleValidKeySet} />
              </TabsContent>
              
              <TabsContent value="usage" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Usage Analytics</h2>
                      <p className="text-muted-foreground text-sm">Monitor your AI API usage and costs</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-12 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Usage analytics will be available after you've used the AI services</p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/ai/seo')} 
                      className="mt-4"
                    >
                      <Bot className="mr-2 h-4 w-4" />
                      Try AI Features
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Advanced Configuration</h2>
                  <p className="text-muted-foreground mb-6">
                    Fine-tune AI behavior and set organization-wide defaults
                  </p>
                  
                  <div className="text-center py-12 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Advanced configuration options will be available in a future update</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access these settings. Please contact your administrator.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </AppLayout>
  );
};

export default AdminAISettings;
