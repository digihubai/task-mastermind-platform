
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Globe, 
  ArrowRight, 
  FileText,
  Settings,
  Check,
  X,
  Loader2,
  Link,
  Search,
  BarChart3,
  Code
} from "lucide-react";

interface SEOIntegrationsProps {
  useCmsConnections?: boolean;
}

const SEOIntegrations: React.FC<SEOIntegrationsProps> = ({ useCmsConnections = false }) => {
  const { toast } = useToast();
  
  const [seoTools, setSeoTools] = useState({
    googleSearchConsole: {
      connected: false,
      connecting: false,
      siteUrl: ""
    },
    semrush: {
      connected: false,
      connecting: false,
      apiKey: ""
    },
    ahrefs: {
      connected: false,
      connecting: false,
      apiKey: ""
    },
    screamingFrog: {
      connected: false,
      connecting: false,
      apiKey: ""
    }
  });

  const handleConnectSEOTool = (tool: keyof typeof seoTools) => {
    const toolConfig = seoTools[tool];
    
    // Validate input
    let validationField = tool === 'googleSearchConsole' ? 'siteUrl' : 'apiKey';
    if (!toolConfig[validationField as keyof typeof toolConfig]) {
      toast({
        title: "Input Required",
        description: `Please enter your ${tool === 'googleSearchConsole' ? 'site URL' : 'API key'}.`,
        variant: "destructive",
      });
      return;
    }

    // Set connecting state
    setSeoTools(prev => ({
      ...prev,
      [tool]: {
        ...prev[tool],
        connecting: true
      }
    }));

    // Simulate API connection
    setTimeout(() => {
      setSeoTools(prev => ({
        ...prev,
        [tool]: {
          ...prev[tool],
          connecting: false,
          connected: true
        }
      }));

      toast({
        title: "Connection Successful",
        description: `Your ${tool} integration is now active.`
      });
    }, 1500);
  };

  const handleDisconnectSEOTool = (tool: keyof typeof seoTools) => {
    setSeoTools(prev => ({
      ...prev,
      [tool]: {
        ...prev[tool],
        connected: false,
        siteUrl: "",
        apiKey: ""
      }
    }));

    toast({
      title: "Disconnected",
      description: `Your ${tool} integration has been removed.`
    });
  };

  const handleInputChange = (tool: keyof typeof seoTools, value: string) => {
    const field = tool === 'googleSearchConsole' ? 'siteUrl' : 'apiKey';
    
    setSeoTools(prev => ({
      ...prev,
      [tool]: {
        ...prev[tool],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">SEO Tools Integration</h2>
      <p className="text-sm text-muted-foreground">
        Connect SEO tools to analyze your website performance and optimize your content
      </p>

      {useCmsConnections && (
        <Card className="p-5 border mb-6 bg-muted/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Code className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">CMS Connections</h4>
              <p className="text-xs text-muted-foreground">
                Use your website connections from the Website & CMS tab for SEO optimization
              </p>
            </div>
          </div>
          <p className="text-sm">
            Any CMS platforms you've connected in the Website & CMS tab will automatically be available 
            for SEO optimization. No need to reconnect them here.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3"
            onClick={() => {
              document.querySelector('[data-value="cms"]')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
              );
            }}
          >
            <Globe className="mr-2 h-4 w-4" />
            Manage Website Connections
          </Button>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 border">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <Search className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-medium">Google Search Console</h4>
              <p className="text-xs text-muted-foreground">Connect for ranking data</p>
            </div>
          </div>
          
          {seoTools.googleSearchConsole.connected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Connected</span>
              </div>
              <p className="text-xs truncate">{seoTools.googleSearchConsole.siteUrl}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDisconnectSEOTool('googleSearchConsole')}
              >
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <>
              <Input
                placeholder="https://yourdomain.com"
                className="mb-3"
                value={seoTools.googleSearchConsole.siteUrl}
                onChange={(e) => handleInputChange('googleSearchConsole', e.target.value)}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnectSEOTool('googleSearchConsole')}
                disabled={seoTools.googleSearchConsole.connecting}
              >
                {seoTools.googleSearchConsole.connecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}
        </Card>
        
        <Card className="p-5 border">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">SEMrush</h4>
              <p className="text-xs text-muted-foreground">Connect for keyword research</p>
            </div>
          </div>
          
          {seoTools.semrush.connected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Connected</span>
              </div>
              <p className="text-xs truncate">API Key: ••••••{seoTools.semrush.apiKey.slice(-4)}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDisconnectSEOTool('semrush')}
              >
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <>
              <Input
                placeholder="Enter your SEMrush API key"
                className="mb-3"
                value={seoTools.semrush.apiKey}
                onChange={(e) => handleInputChange('semrush', e.target.value)}
                type="password"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnectSEOTool('semrush')}
                disabled={seoTools.semrush.connecting}
              >
                {seoTools.semrush.connecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}
        </Card>
        
        <Card className="p-5 border">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Link className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">Ahrefs</h4>
              <p className="text-xs text-muted-foreground">Connect for backlink data</p>
            </div>
          </div>
          
          {seoTools.ahrefs.connected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Connected</span>
              </div>
              <p className="text-xs truncate">API Key: ••••••{seoTools.ahrefs.apiKey.slice(-4)}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDisconnectSEOTool('ahrefs')}
              >
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <>
              <Input
                placeholder="Enter your Ahrefs API key"
                className="mb-3"
                value={seoTools.ahrefs.apiKey}
                onChange={(e) => handleInputChange('ahrefs', e.target.value)}
                type="password"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnectSEOTool('ahrefs')}
                disabled={seoTools.ahrefs.connecting}
              >
                {seoTools.ahrefs.connecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}
        </Card>

        <Card className="p-5 border">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <Globe className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">Screaming Frog</h4>
              <p className="text-xs text-muted-foreground">Connect for site audits</p>
            </div>
          </div>
          
          {seoTools.screamingFrog.connected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Connected</span>
              </div>
              <p className="text-xs truncate">API Key: ••••••{seoTools.screamingFrog.apiKey.slice(-4)}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDisconnectSEOTool('screamingFrog')}
              >
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <>
              <Input
                placeholder="Enter your Screaming Frog API key"
                className="mb-3"
                value={seoTools.screamingFrog.apiKey}
                onChange={(e) => handleInputChange('screamingFrog', e.target.value)}
                type="password"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnectSEOTool('screamingFrog')}
                disabled={seoTools.screamingFrog.connecting}
              >
                {seoTools.screamingFrog.connecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}
        </Card>
      </div>
      
      <Card className="p-5 border mt-6">
        <h3 className="text-lg font-medium mb-4">SEO Integration Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">SEO Content Options</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <input type="checkbox" id="auto-publish" className="mr-2" />
                <label htmlFor="auto-publish">Auto-publish SEO optimizations</label>
              </li>
              <li className="flex items-center text-sm">
                <input type="checkbox" id="schedule" className="mr-2" />
                <label htmlFor="schedule">Schedule SEO updates</label>
              </li>
              <li className="flex items-center text-sm">
                <input type="checkbox" id="version" className="mr-2" />
                <label htmlFor="version">Keep optimization history</label>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">SEO Data Sync</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <input type="checkbox" id="analytics" className="mr-2" />
                <label htmlFor="analytics">Sync SEO analytics data</label>
              </li>
              <li className="flex items-center text-sm">
                <input type="checkbox" id="keywords" className="mr-2" />
                <label htmlFor="keywords">Import keyword rankings</label>
              </li>
              <li className="flex items-center text-sm">
                <input type="checkbox" id="meta" className="mr-2" />
                <label htmlFor="meta">Optimize meta descriptions</label>
              </li>
            </ul>
          </div>
        </div>
        
        <Button className="mt-6">
          <Settings className="mr-2 h-4 w-4" />
          Save SEO Integration Settings
        </Button>
      </Card>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <Link className="h-4 w-4" />
        <span>Need help with SEO integrations? <a href="#" className="text-primary hover:underline">View our SEO integration docs</a></span>
      </div>
    </div>
  );
};

export default SEOIntegrations;
