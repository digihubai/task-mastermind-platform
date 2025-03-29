
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { getOpenAIApiKey } from "@/services/ai/contentGenerationAI";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";

const SEOIntegrations: React.FC = () => {
  const navigate = useNavigate();
  const { userRole } = useRoleBasedSettings();
  const isAdmin = userRole === "admin" || userRole === "super_admin";
  const hasOpenAiKey = !!getOpenAIApiKey();

  const handleNavigateToAISettings = () => {
    if (isAdmin) {
      navigate("/admin/ai-settings");
    } else {
      navigate("/settings/ai-configuration");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-500" />
            AI Content Generation
          </CardTitle>
          <CardDescription>
            {isAdmin 
              ? "Configure AI services for content generation across the platform"
              : "AI-powered content generation available to your account"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>OpenAI Integration Status</span>
              </div>
              <div>
                {hasOpenAiKey ? (
                  <span className="text-sm bg-green-100 text-green-800 rounded-full px-2 py-0.5 dark:bg-green-900/30 dark:text-green-400">
                    Configured
                  </span>
                ) : (
                  <span className="text-sm bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 dark:bg-amber-900/30 dark:text-amber-400">
                    Not Configured
                  </span>
                )}
              </div>
            </div>
            
            <Button 
              onClick={handleNavigateToAISettings}
              className={isAdmin ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {isAdmin ? "Configure AI Settings" : "View AI Settings"}
            </Button>
            
            {!hasOpenAiKey && isAdmin && (
              <p className="text-sm text-amber-600 mt-2">
                <span className="font-medium">Important:</span> You need to configure your OpenAI API key to use AI features.
              </p>
            )}
            
            {!isAdmin && !hasOpenAiKey && (
              <p className="text-sm text-muted-foreground mt-2">
                Contact your administrator to enable AI features.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOIntegrations;
