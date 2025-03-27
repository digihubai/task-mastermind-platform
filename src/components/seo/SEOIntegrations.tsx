
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
  Link
} from "lucide-react";

const SEOIntegrations = () => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [wordpressUrl, setWordpressUrl] = useState("");
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [wixUrl, setWixUrl] = useState("");
  
  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    wordpress: false,
    shopify: false,
    wix: false
  });

  const handleConnect = (platform: string) => {
    if (connected[platform]) {
      toast({
        title: "Already Connected",
        description: `Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} account is already connected.`,
      });
      return;
    }

    // Validate URL
    let url = "";
    switch (platform) {
      case "wordpress":
        url = wordpressUrl;
        break;
      case "shopify":
        url = shopifyUrl;
        break;
      case "wix":
        url = wixUrl;
        break;
    }

    if (!url) {
      toast({
        title: "URL Required",
        description: `Please enter your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site URL.`,
        variant: "destructive",
      });
      return;
    }

    setConnecting(platform);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(null);
      setConnected({...connected, [platform]: true});
      toast({
        title: "Connection Successful",
        description: `Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site has been connected successfully.`,
      });
    }, 2000);
  };

  const handleDisconnect = (platform: string) => {
    setConnected({...connected, [platform]: false});
    toast({
      title: "Disconnected",
      description: `Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site has been disconnected.`,
    });

    // Reset URL
    switch (platform) {
      case "wordpress":
        setWordpressUrl("");
        break;
      case "shopify":
        setShopifyUrl("");
        break;
      case "wix":
        setWixUrl("");
        break;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Content Management Integrations</h2>
      <p className="text-sm text-muted-foreground">
        Connect your preferred CMS platforms to seamlessly push optimized content and get real-time SEO insights
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">WordPress</h4>
              <p className="text-xs text-muted-foreground">Connect your WordPress site</p>
            </div>
          </div>
          
          {connected.wordpress ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Connected</span>
              </div>
              <p className="text-xs truncate">{wordpressUrl}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDisconnect("wordpress")}
              >
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <>
              <Input
                placeholder="https://your-wordpress-site.com"
                className="mb-3"
                value={wordpressUrl}
                onChange={(e) => setWordpressUrl(e.target.value)}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnect("wordpress")}
                disabled={connecting === "wordpress"}
              >
                {connecting === "wordpress" ? (
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
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Shopify</h4>
              <p className="text-xs text-muted-foreground">Connect your Shopify store</p>
            </div>
          </div>
          
          {connected.shopify ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Connected</span>
              </div>
              <p className="text-xs truncate">{shopifyUrl}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDisconnect("shopify")}
              >
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <>
              <Input
                placeholder="https://your-store.myshopify.com"
                className="mb-3"
                value={shopifyUrl}
                onChange={(e) => setShopifyUrl(e.target.value)}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnect("shopify")}
                disabled={connecting === "shopify"}
              >
                {connecting === "shopify" ? (
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
              <Settings className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">Wix</h4>
              <p className="text-xs text-muted-foreground">Connect your Wix site</p>
            </div>
          </div>
          
          {connected.wix ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Connected</span>
              </div>
              <p className="text-xs truncate">{wixUrl}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDisconnect("wix")}
              >
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <>
              <Input
                placeholder="https://your-username.wixsite.com"
                className="mb-3"
                value={wixUrl}
                onChange={(e) => setWixUrl(e.target.value)}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleConnect("wix")}
                disabled={connecting === "wix"}
              >
                {connecting === "wix" ? (
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
        <h3 className="text-lg font-medium mb-4">Advanced Integration Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Content Publishing Options</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <input type="checkbox" id="auto-publish" className="mr-2" />
                <label htmlFor="auto-publish">Auto-publish optimized content</label>
              </li>
              <li className="flex items-center text-sm">
                <input type="checkbox" id="schedule" className="mr-2" />
                <label htmlFor="schedule">Schedule content publishing</label>
              </li>
              <li className="flex items-center text-sm">
                <input type="checkbox" id="version" className="mr-2" />
                <label htmlFor="version">Keep version history</label>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">SEO Data Sync</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <input type="checkbox" id="analytics" className="mr-2" />
                <label htmlFor="analytics">Sync analytics data</label>
              </li>
              <li className="flex items-center text-sm">
                <input type="checkbox" id="keywords" className="mr-2" />
                <label htmlFor="keywords">Import existing keywords</label>
              </li>
              <li className="flex items-center text-sm">
                <input type="checkbox" id="meta" className="mr-2" />
                <label htmlFor="meta">Sync meta descriptions</label>
              </li>
            </ul>
          </div>
        </div>
        
        <Button className="mt-6">
          <Settings className="mr-2 h-4 w-4" />
          Save Integration Settings
        </Button>
      </Card>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <Link className="h-4 w-4" />
        <span>Need help with integrations? <a href="#" className="text-primary hover:underline">View our integration docs</a></span>
      </div>
    </div>
  );
};

export default SEOIntegrations;
