
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { AIKeyConfig } from "@/components/seo";
import { Card } from "@/components/ui/card";
import { Bot, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminAISettings = () => {
  const { userRole, hasAccess } = useRoleBasedSettings();
  const navigate = useNavigate();
  
  // Redirect non-admin users
  useEffect(() => {
    if (!hasAccess("ai_models")) {
      navigate("/dashboard");
    }
  }, [hasAccess, navigate]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI Settings Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure AI models and API keys for your organization
          </p>
        </div>
        
        {(userRole === "admin" || userRole === "super_admin") ? (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Admin Only Settings</AlertTitle>
              <AlertDescription>
                These API keys will be used across your organization for all AI-powered features.
              </AlertDescription>
            </Alert>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bot size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">AI Model Configuration</h3>
                  <p className="text-xs text-muted-foreground">Configure API keys for content generation</p>
                </div>
              </div>
              
              <AIKeyConfig />
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-2">Usage Settings</h3>
                <p className="text-sm text-muted-foreground">
                  AI usage is tracked organization-wide. Set up appropriate rate limits and monitoring to control costs.
                </p>
              </div>
            </Card>
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
