
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { validateAPIKey, getOpenAIApiKey, setOpenAIApiKey } from "@/services/ai/contentGenerationAI";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, Key, Loader, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const APIIntegration = () => {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const storedKey = getOpenAIApiKey();
    if (storedKey) {
      setHasKey(true);
      // We don't show the full key for security
      setApiKey("••••••••••••••••••••••" + storedKey.slice(-5));
    }
  }, []);

  const handleValidateKey = async () => {
    if (!apiKey || apiKey.startsWith("••••")) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    setIsValidating(true);
    try {
      const isValid = await validateAPIKey(apiKey);
      if (isValid) {
        setHasKey(true);
        setIsEditing(false);
        toast.success("API key validated and saved successfully");
      }
    } catch (error) {
      console.error("Error validating API key:", error);
      toast.error("Failed to validate API key");
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    setHasKey(false);
    toast.success("API key removed successfully");
  };

  const handleEditKey = () => {
    setApiKey("");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    const storedKey = getOpenAIApiKey();
    if (storedKey) {
      setApiKey("••••••••••••••••••••••" + storedKey.slice(-5));
    } else {
      setApiKey("");
    }
    setIsEditing(false);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">API Integrations</h1>
        
        <div className="grid gap-6">
          {/* OpenAI API Key Integration */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>OpenAI API Integration</CardTitle>
                <CardDescription>
                  Connect your OpenAI account to enable AI-powered content generation features
                </CardDescription>
              </div>
              {hasKey ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Check size={14} className="mr-1" /> Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Not Connected
                </Badge>
              )}
            </CardHeader>
            
            <CardContent>
              {hasKey && !isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                    <div className="flex items-center">
                      <Key size={18} className="text-muted-foreground mr-2" />
                      <span>{apiKey}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleEditKey}>
                        Change Key
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleRemoveKey}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <X size={14} className="mr-1" /> Disconnect
                      </Button>
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Usage and Billing</AlertTitle>
                    <AlertDescription>
                      API usage is billed directly by OpenAI. We do not store or process your API key on our servers.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">OpenAI API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="sk-..."
                      value={apiKey.startsWith("••••") ? "" : apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter your OpenAI API key to enable AI content generation features.
                      Get your API key from <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">OpenAI dashboard</a>.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleValidateKey} disabled={isValidating}>
                      {isValidating ? (
                        <>
                          <Loader size={14} className="animate-spin mr-2" />
                          Validating...
                        </>
                      ) : (
                        "Save & Validate"
                      )}
                    </Button>
                    {isEditing && (
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default APIIntegration;
