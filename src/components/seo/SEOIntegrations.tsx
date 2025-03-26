
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { WordPress, Globe, ShoppingBag, FileText, Link2, Check, ExternalLink, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SEOIntegrations: React.FC = () => {
  const { toast } = useToast();
  const [wordpressConnected, setWordpressConnected] = useState(false);
  const [wordpressUrl, setWordpressUrl] = useState("");
  const [wordpressApiKey, setWordpressApiKey] = useState("");
  
  const handleConnectWordPress = () => {
    if (!wordpressUrl || !wordpressApiKey) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both WordPress URL and API key.",
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Connecting to WordPress",
      description: "Verifying your WordPress credentials...",
    });
    
    setTimeout(() => {
      setWordpressConnected(true);
      toast({
        title: "Connection successful",
        description: "Your WordPress site has been connected.",
      });
    }, 1500);
  };
  
  const handleDisconnectWordPress = () => {
    setWordpressConnected(false);
    toast({
      title: "WordPress disconnected",
      description: "Your WordPress site has been disconnected.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">CMS Integrations</h2>
        <Button variant="outline">
          <Plus size={16} className="mr-2" />
          Add Integration
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-border/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-[#21759b]/10 p-2 rounded-full mr-3">
                <WordPress size={24} className="text-[#21759b]" />
              </div>
              <div>
                <h3 className="font-medium">WordPress</h3>
                <p className="text-sm text-muted-foreground">Connect to publish directly to your WordPress site</p>
              </div>
            </div>
            <Badge className={wordpressConnected ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
              {wordpressConnected ? "Connected" : "Not Connected"}
            </Badge>
          </div>
          
          {!wordpressConnected ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">WordPress Site URL</label>
                <Input 
                  placeholder="https://example.com" 
                  value={wordpressUrl}
                  onChange={(e) => setWordpressUrl(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">WordPress API Key</label>
                <Input 
                  placeholder="Enter your WordPress API key" 
                  type="password"
                  value={wordpressApiKey}
                  onChange={(e) => setWordpressApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  <a href="https://wordpress.org/plugins/application-passwords/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    Get API key from Application Passwords plugin
                  </a>
                </p>
              </div>
              
              <Button onClick={handleConnectWordPress} className="w-full">Connect WordPress</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded">
                <div className="flex items-center mb-2">
                  <Globe size={16} className="text-muted-foreground mr-2" />
                  <span className="text-sm font-medium">Site URL:</span>
                  <span className="text-sm ml-2">{wordpressUrl}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <FileText size={16} className="text-muted-foreground mr-2" />
                  <span className="text-sm font-medium">Posts:</span>
                  <span className="text-sm ml-2">12 published, 3 drafts</span>
                </div>
                
                <div className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm font-medium">Status:</span>
                  <span className="text-sm ml-2">Connected</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <ExternalLink size={16} className="mr-2" />
                  Open Dashboard
                </Button>
                
                <Button variant="outline" className="flex-1" onClick={handleDisconnectWordPress}>
                  Disconnect
                </Button>
              </div>
            </div>
          )}
        </Card>
        
        <Card className="p-6 border border-border/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-[#f71963]/10 p-2 rounded-full mr-3">
                <ShoppingBag size={24} className="text-[#f71963]" />
              </div>
              <div>
                <h3 className="font-medium">Shopify</h3>
                <p className="text-sm text-muted-foreground">Connect to publish to Shopify blogs and product descriptions</p>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-800">Not Connected</Badge>
          </div>
          
          <Button variant="outline" className="w-full">Connect Shopify</Button>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-[#0069ff]/10 p-2 rounded-full mr-3">
                <Globe size={24} className="text-[#0069ff]" />
              </div>
              <div>
                <h3 className="font-medium">Wix</h3>
                <p className="text-sm text-muted-foreground">Connect to publish directly to your Wix blog</p>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-800">Not Connected</Badge>
          </div>
          
          <Button variant="outline" className="w-full">Connect Wix</Button>
        </Card>
        
        <Card className="p-6 border border-border/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-[#4353ff]/10 p-2 rounded-full mr-3">
                <Link2 size={24} className="text-[#4353ff]" />
              </div>
              <div>
                <h3 className="font-medium">Webflow</h3>
                <p className="text-sm text-muted-foreground">Connect to publish directly to your Webflow CMS</p>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-800">Not Connected</Badge>
          </div>
          
          <Button variant="outline" className="w-full">Connect Webflow</Button>
        </Card>
      </div>
    </div>
  );
};

export default SEOIntegrations;
