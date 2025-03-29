
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileCode, Key, Code, Webhook, Server, RefreshCw, Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRoleBasedSettings } from "@/hooks/use-role-based-settings";

const APIIntegration = () => {
  const { userRole } = useRoleBasedSettings();
  const isAdmin = userRole === "admin" || userRole === "super_admin";
  const [activeTab, setActiveTab] = useState("api-keys");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showWebhookKey, setShowWebhookKey] = useState(false);
  
  // Mock API keys for demonstration
  const apiKey = "sk_live_x1zP4qL8vN6tJ7rK9mD2sF3gH5bW8cY0";
  const testApiKey = "sk_test_7kR9tJ7rP4qL8vN6mD2sF3gH5bW8cY0x1z";
  const webhookSecret = "whsec_8cY0x1zP4qL8vN6tJ7rK9mD2sF3gH5bW";

  const handleCopyKey = (key: string, name: string) => {
    navigator.clipboard.writeText(key);
    toast.success(`${name} copied to clipboard`);
  };

  const handleRegenerateKey = (type: string) => {
    toast.success(`${type} key has been regenerated`);
    // In a real app, this would make an API call to regenerate the key
  };

  if (!isAdmin) {
    return (
      <AdminLayout 
        title="API Integration" 
        description="Manage API keys and webhooks"
      >
        <Card className="p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have permission to access API Integration settings.
            </p>
          </div>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="API Integration" 
      description="Manage API keys, webhooks, and third-party integrations"
    >
      <Tabs defaultValue="api-keys" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key size={20} />
                API Key Management
              </CardTitle>
              <CardDescription>
                Securely manage and rotate your API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">Production API Key</h3>
                      <p className="text-xs text-muted-foreground">Use for all production environments</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Live
                    </Badge>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input 
                        readOnly 
                        value={showApiKey ? apiKey : '••••••••••••••••••••••••••••••••'}
                        className="font-mono text-sm pr-20"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="h-6 w-6 p-0 rounded-full"
                        >
                          {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </Button>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleCopyKey(apiKey, "API Key")}>
                      <Copy size={14} className="mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRegenerateKey("Production")}>
                      <RefreshCw size={14} className="mr-1" />
                      Rotate
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-amber-600">
                    <strong>Important:</strong> Rotating this key will immediately revoke the previous key.
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">Test API Key</h3>
                      <p className="text-xs text-muted-foreground">Use for development and testing</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Test
                    </Badge>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <Input 
                      readOnly 
                      value={testApiKey} 
                      className="font-mono text-sm flex-1"
                    />
                    <Button size="sm" onClick={() => handleCopyKey(testApiKey, "Test API Key")}>
                      <Copy size={14} className="mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRegenerateKey("Test")}>
                      <RefreshCw size={14} className="mr-1" />
                      Rotate
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">API Access Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="restrict-ips" className="font-medium">IP Restrictions</Label>
                      <p className="text-xs text-muted-foreground">Limit API access to specific IP addresses</p>
                    </div>
                    <Switch id="restrict-ips" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="rate-limiting" className="font-medium">Enhanced Rate Limiting</Label>
                      <p className="text-xs text-muted-foreground">Apply stricter rate limits to prevent abuse</p>
                    </div>
                    <Switch id="rate-limiting" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="access-logs" className="font-medium">Detailed Access Logs</Label>
                      <p className="text-xs text-muted-foreground">Keep detailed logs of all API activities</p>
                    </div>
                    <Switch id="access-logs" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook size={20} />
                Webhook Configuration
              </CardTitle>
              <CardDescription>
                Manage webhook endpoints and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Webhook Secret</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input 
                        readOnly 
                        value={showWebhookKey ? webhookSecret : '••••••••••••••••••••••••••••••••'}
                        className="font-mono text-sm pr-20"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowWebhookKey(!showWebhookKey)}
                          className="h-6 w-6 p-0 rounded-full"
                        >
                          {showWebhookKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </Button>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleCopyKey(webhookSecret, "Webhook Secret")}>
                      <Copy size={14} className="mr-1" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRegenerateKey("Webhook")}>
                      <RefreshCw size={14} className="mr-1" />
                      Rotate
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Use this secret to validate webhook events from our servers.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Active Webhooks</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Notification Webhook</h4>
                          <p className="text-xs text-muted-foreground">https://example.com/webhooks/notifications</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Test</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">User Events Webhook</h4>
                          <p className="text-xs text-muted-foreground">https://example.com/webhooks/users</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Test</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  Add New Webhook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode size={20} />
                API Documentation
              </CardTitle>
              <CardDescription>
                References and guides for using Digihub APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">API References</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Button variant="outline" className="h-auto p-4 justify-start">
                      <div className="flex flex-col items-start text-left">
                        <div className="flex items-center">
                          <Server size={16} className="mr-2" />
                          <span className="font-medium">REST API</span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          Complete API reference for REST endpoints
                        </span>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 justify-start">
                      <div className="flex flex-col items-start text-left">
                        <div className="flex items-center">
                          <Code size={16} className="mr-2" />
                          <span className="font-medium">GraphQL API</span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          Query language for your API
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Developer Resources</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-left">
                      <FileCode size={16} className="mr-2" />
                      <div>
                        <span className="font-medium">Getting Started Guide</span>
                        <p className="text-xs text-muted-foreground">
                          Learn how to make your first API request
                        </p>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start text-left">
                      <FileCode size={16} className="mr-2" />
                      <div>
                        <span className="font-medium">Code Examples</span>
                        <p className="text-xs text-muted-foreground">
                          Sample code for common operations in various languages
                        </p>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start text-left">
                      <FileCode size={16} className="mr-2" />
                      <div>
                        <span className="font-medium">API Changelog</span>
                        <p className="text-xs text-muted-foreground">
                          Latest updates and changes to our API
                        </p>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default APIIntegration;
