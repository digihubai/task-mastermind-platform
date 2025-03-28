
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Search, 
  FileText, 
  BarChart3, 
  Settings,
  Check,
  Loader,
  Link
} from "lucide-react";
import { toast } from "sonner";

const SEOIntegrations = () => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [integrations, setIntegrations] = useState({
    googleSearchConsole: { connected: false, apiKey: "" },
    googleAnalytics: { connected: false, apiKey: "" },
    wordpress: { connected: true, apiKey: "wp_oauth_token" },
    ahrefs: { connected: false, apiKey: "" },
    semrush: { connected: false, apiKey: "" },
    moz: { connected: false, apiKey: "" }
  });

  const handleConnect = (integration: string) => {
    setConnecting(integration);
    
    // Simulate API connection
    setTimeout(() => {
      setIntegrations(prev => ({
        ...prev,
        [integration]: {
          ...prev[integration as keyof typeof prev],
          connected: true
        }
      }));
      setConnecting(null);
      toast.success(`Connected to ${integration} successfully`);
    }, 1500);
  };
  
  const handleDisconnect = (integration: string) => {
    setConnecting(integration);
    
    // Simulate API disconnection
    setTimeout(() => {
      setIntegrations(prev => ({
        ...prev,
        [integration]: {
          ...prev[integration as keyof typeof prev],
          connected: false
        }
      }));
      setConnecting(null);
      toast.success(`Disconnected from ${integration}`);
    }, 1000);
  };
  
  const handleApiKeyChange = (integration: string, value: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration as keyof typeof prev],
        apiKey: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">SEO Integrations</h2>
        <p className="text-muted-foreground mb-6">
          Connect your SEO tools and platforms to enable comprehensive analytics and seamless content publishing.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 border border-border/40">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Google Search Console</h3>
                <p className="text-xs text-muted-foreground mt-1">Track search performance</p>
                
                {integrations.googleSearchConsole.connected ? (
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20">
                      <Check size={12} className="mr-1" /> Connected
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleDisconnect('googleSearchConsole')}
                      disabled={connecting === 'googleSearchConsole'}
                    >
                      {connecting === 'googleSearchConsole' ? <Loader className="h-3 w-3 animate-spin" /> : 'Disconnect'}
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <Input 
                      placeholder="API Key" 
                      value={integrations.googleSearchConsole.apiKey}
                      onChange={(e) => handleApiKeyChange('googleSearchConsole', e.target.value)}
                      className="h-7 text-xs"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-7 text-xs"
                      onClick={() => handleConnect('googleSearchConsole')}
                      disabled={connecting === 'googleSearchConsole' || !integrations.googleSearchConsole.apiKey}
                    >
                      {connecting === 'googleSearchConsole' ? <Loader className="h-3 w-3 animate-spin mr-1" /> : null}
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-start gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Google Analytics</h3>
                <p className="text-xs text-muted-foreground mt-1">Track website traffic and conversions</p>
                
                {integrations.googleAnalytics.connected ? (
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20">
                      <Check size={12} className="mr-1" /> Connected
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleDisconnect('googleAnalytics')}
                      disabled={connecting === 'googleAnalytics'}
                    >
                      {connecting === 'googleAnalytics' ? <Loader className="h-3 w-3 animate-spin" /> : 'Disconnect'}
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <Input 
                      placeholder="API Key" 
                      value={integrations.googleAnalytics.apiKey}
                      onChange={(e) => handleApiKeyChange('googleAnalytics', e.target.value)}
                      className="h-7 text-xs"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-7 text-xs"
                      onClick={() => handleConnect('googleAnalytics')}
                      disabled={connecting === 'googleAnalytics' || !integrations.googleAnalytics.apiKey}
                    >
                      {connecting === 'googleAnalytics' ? <Loader className="h-3 w-3 animate-spin mr-1" /> : null}
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">WordPress</h3>
                <p className="text-xs text-muted-foreground mt-1">Publish content to WordPress</p>
                
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20">
                    <Check size={12} className="mr-1" /> Connected
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleDisconnect('wordpress')}
                    disabled={connecting === 'wordpress'}
                  >
                    {connecting === 'wordpress' ? <Loader className="h-3 w-3 animate-spin" /> : 'Disconnect'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-start gap-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
                <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Ahrefs</h3>
                <p className="text-xs text-muted-foreground mt-1">Comprehensive SEO research</p>
                
                {integrations.ahrefs.connected ? (
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20">
                      <Check size={12} className="mr-1" /> Connected
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleDisconnect('ahrefs')}
                      disabled={connecting === 'ahrefs'}
                    >
                      {connecting === 'ahrefs' ? <Loader className="h-3 w-3 animate-spin" /> : 'Disconnect'}
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <Input 
                      placeholder="API Key" 
                      value={integrations.ahrefs.apiKey}
                      onChange={(e) => handleApiKeyChange('ahrefs', e.target.value)}
                      className="h-7 text-xs"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-7 text-xs"
                      onClick={() => handleConnect('ahrefs')}
                      disabled={connecting === 'ahrefs' || !integrations.ahrefs.apiKey}
                    >
                      {connecting === 'ahrefs' ? <Loader className="h-3 w-3 animate-spin mr-1" /> : null}
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-start gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                <Settings className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">SEMrush</h3>
                <p className="text-xs text-muted-foreground mt-1">Keyword research and competitor analysis</p>
                
                {integrations.semrush.connected ? (
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20">
                      <Check size={12} className="mr-1" /> Connected
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleDisconnect('semrush')}
                      disabled={connecting === 'semrush'}
                    >
                      {connecting === 'semrush' ? <Loader className="h-3 w-3 animate-spin" /> : 'Disconnect'}
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <Input 
                      placeholder="API Key" 
                      value={integrations.semrush.apiKey}
                      onChange={(e) => handleApiKeyChange('semrush', e.target.value)}
                      className="h-7 text-xs"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-7 text-xs"
                      onClick={() => handleConnect('semrush')}
                      disabled={connecting === 'semrush' || !integrations.semrush.apiKey}
                    >
                      {connecting === 'semrush' ? <Loader className="h-3 w-3 animate-spin mr-1" /> : null}
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-start gap-3">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-full">
                <Link className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Moz</h3>
                <p className="text-xs text-muted-foreground mt-1">Link building and domain authority</p>
                
                {integrations.moz.connected ? (
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20">
                      <Check size={12} className="mr-1" /> Connected
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleDisconnect('moz')}
                      disabled={connecting === 'moz'}
                    >
                      {connecting === 'moz' ? <Loader className="h-3 w-3 animate-spin" /> : 'Disconnect'}
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <Input 
                      placeholder="API Key" 
                      value={integrations.moz.apiKey}
                      onChange={(e) => handleApiKeyChange('moz', e.target.value)}
                      className="h-7 text-xs"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-7 text-xs"
                      onClick={() => handleConnect('moz')}
                      disabled={connecting === 'moz' || !integrations.moz.apiKey}
                    >
                      {connecting === 'moz' ? <Loader className="h-3 w-3 animate-spin mr-1" /> : null}
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default SEOIntegrations;
