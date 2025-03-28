
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { cmsPlatforms } from './cms-platforms-data';

export const useCMSConnections = (onConnect?: (platform: string) => void) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  
  // Generate initial URLs state from platforms
  const initialUrls: Record<string, string> = {};
  cmsPlatforms.forEach(platform => {
    initialUrls[platform.id] = "";
  });
  
  // Generate initial connected state from platforms
  const initialConnected: Record<string, boolean> = {};
  cmsPlatforms.forEach(platform => {
    initialConnected[platform.id] = false;
  });
  
  const [urls, setUrls] = useState<Record<string, string>>(initialUrls);
  const [connected, setConnected] = useState<Record<string, boolean>>(initialConnected);

  const handleInputChange = (platform: string, value: string) => {
    setUrls(prev => ({ ...prev, [platform]: value }));
  };

  const handleConnect = (platform: string) => {
    if (connected[platform]) {
      toast({
        title: "Already Connected",
        description: `Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site is already connected.`,
      });
      return;
    }

    // Validate URL
    const url = urls[platform];
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
      
      if (onConnect) {
        onConnect(platform);
      }
    }, 1500);
  };

  const handleDisconnect = (platform: string) => {
    setConnected({...connected, [platform]: false});
    setUrls(prev => ({ ...prev, [platform]: "" }));
    toast({
      title: "Disconnected",
      description: `Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} site has been disconnected.`,
    });
  };

  return {
    urls,
    connected,
    connecting,
    handleInputChange,
    handleConnect,
    handleDisconnect
  };
};
