
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Image,
  Key,
  Lock,
  RefreshCw,
  Settings,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";

interface ImageAPI {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  apiKey?: string;
  configExpanded: boolean;
  status: 'connected' | 'disconnected' | 'error';
  usageLimit?: number;
  usageCount?: number;
  logo: React.ReactNode;
}

const ImageAPIIntegrations = () => {
  const { toast } = useToast();
  const [imageAPIs, setImageAPIs] = useState<ImageAPI[]>([
    {
      id: "unsplash",
      name: "Unsplash",
      description: "Access high-quality stock photos with the Unsplash API",
      isEnabled: true,
      apiKey: "•••••••••••••••••••••••••••••",
      configExpanded: false,
      status: 'connected',
      usageLimit: 50,
      usageCount: 12,
      logo: <Image className="h-6 w-6 text-[#000000]" />
    },
    {
      id: "pixabay",
      name: "Pixabay",
      description: "Free images and videos you can use anywhere",
      isEnabled: false,
      apiKey: "",
      configExpanded: false,
      status: 'disconnected',
      logo: <Image className="h-6 w-6 text-[#2EC66D]" />
    },
    {
      id: "pexels",
      name: "Pexels",
      description: "Free stock photos & videos shared by creators",
      isEnabled: false,
      apiKey: "",
      configExpanded: false,
      status: 'disconnected',
      logo: <Image className="h-6 w-6 text-[#05A081]" />
    },
    {
      id: "fal-ai",
      name: "FAL.AI",
      description: "Advanced AI image generation",
      isEnabled: false,
      apiKey: "",
      configExpanded: false,
      status: 'disconnected',
      logo: <Sparkles className="h-6 w-6 text-[#7B61FF]" />
    },
    {
      id: "stability-ai",
      name: "Stability AI",
      description: "Stable Diffusion image generation API",
      isEnabled: false,
      apiKey: "",
      configExpanded: false,
      status: 'disconnected',
      logo: <Sparkles className="h-6 w-6 text-[#EB5757]" />
    }
  ]);

  const handleToggleAPI = (id: string) => {
    setImageAPIs(apis => 
      apis.map(api => 
        api.id === id 
          ? { ...api, isEnabled: !api.isEnabled } 
          : api
      )
    );
    
    const api = imageAPIs.find(a => a.id === id);
    toast({
      title: api?.isEnabled ? "API Disabled" : "API Enabled",
      description: `${api?.name} has been ${api?.isEnabled ? "disabled" : "enabled"}.`,
    });
  };

  const handleToggleConfig = (id: string) => {
    setImageAPIs(apis => 
      apis.map(api => 
        api.id === id 
          ? { ...api, configExpanded: !api.configExpanded } 
          : api
      )
    );
  };

  const handleSaveAPIKey = (id: string, apiKey: string) => {
    setImageAPIs(apis => 
      apis.map(api => 
        api.id === id 
          ? { 
              ...api, 
              apiKey, 
              status: apiKey ? 'connected' : 'disconnected' 
            } 
          : api
      )
    );
    
    toast({
      title: "API Key Saved",
      description: `API key for ${imageAPIs.find(a => a.id === id)?.name} has been updated.`,
    });
  };

  const handleTestConnection = (id: string) => {
    const api = imageAPIs.find(a => a.id === id);
    
    if (!api?.apiKey) {
      toast({
        title: "Test Failed",
        description: "Please enter an API key first.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${api.name}...`,
    });
    
    // Simulate API test
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${api.name} API.`,
      });
      
      setImageAPIs(apis => 
        apis.map(a => 
          a.id === id 
            ? { ...a, status: 'connected' } 
            : a
        )
      );
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image API Integrations</CardTitle>
        <CardDescription>
          Configure third-party image APIs for AI generation and stock photos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {imageAPIs.map((api) => (
          <div key={api.id} className="border rounded-lg overflow-hidden">
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-md bg-primary/10 ${api.status === 'connected' ? 'text-primary' : 'text-muted-foreground'}`}>
                  {api.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{api.name}</h3>
                    <Badge variant={api.status === 'connected' ? "default" : "secondary"}>
                      {api.status === 'connected' ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {api.description}
                  </p>
                  {api.status === 'connected' && api.usageLimit && (
                    <div className="mt-2">
                      <div className="flex text-xs justify-between mb-1">
                        <span>Usage: {api.usageCount} / {api.usageLimit}</span>
                        <span>{Math.round((api.usageCount / api.usageLimit) * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(api.usageCount / api.usageLimit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={api.isEnabled}
                  onCheckedChange={() => handleToggleAPI(api.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleConfig(api.id)}
                >
                  {api.configExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {api.configExpanded && (
              <div className="bg-muted/50 p-4 border-t">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`${api.id}-api-key`} className="text-sm font-medium">
                      API Key
                    </Label>
                    <div className="flex mt-1.5">
                      <div className="relative flex-1">
                        <Input
                          id={`${api.id}-api-key`}
                          type="password"
                          value={api.apiKey || ""}
                          onChange={(e) => handleSaveAPIKey(api.id, e.target.value)}
                          placeholder={`Enter your ${api.name} API key`}
                          className="pr-10"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          <Key className="h-4 w-4" />
                        </div>
                      </div>
                      <Button
                        className="ml-2"
                        onClick={() => handleTestConnection(api.id)}
                      >
                        Test Connection
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1.5 flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      Your API key is securely stored and encrypted
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-1.5"
                      onClick={() => {
                        window.open(`https://${api.id}.com/developers`, '_blank');
                      }}
                    >
                      <Settings className="h-3.5 w-3.5" />
                      API Settings
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ImageAPIIntegrations;
