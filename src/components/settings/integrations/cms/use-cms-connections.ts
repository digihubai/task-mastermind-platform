
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useCmsConnections() {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'cms' | 'ecommerce'>('all');

  const [connected, setConnected] = useState<{[key: string]: boolean}>({
    wordpress: false,
    shopify: false,
    webflow: false,
    wix: false,
    wixecommerce: false,
    squarespace: false,
    drupal: false,
    joomla: false,
    magento: false,
    woocommerce: false,
    bigcommerce: false,
    hubspot: false,
    prestashop: false,
    ghost: false,
    contentful: false
  });
  
  const [websites, setWebsites] = useState<{[key: string]: string}>({
    wordpress: "",
    shopify: "",
    webflow: "",
    wix: "",
    wixecommerce: "",
    squarespace: "",
    drupal: "",
    joomla: "",
    magento: "",
    woocommerce: "",
    bigcommerce: "",
    hubspot: "",
    prestashop: "",
    ghost: "",
    contentful: ""
  });

  const handleInputChange = (platform: string, value: string) => {
    setWebsites(prev => ({ ...prev, [platform]: value }));
  };

  const getPlatformName = (platform: string): string => {
    const platformNames: {[key: string]: string} = {
      wordpress: "WordPress",
      shopify: "Shopify",
      webflow: "Webflow",
      wix: "Wix",
      wixecommerce: "Wix eCommerce",
      squarespace: "Squarespace",
      drupal: "Drupal",
      joomla: "Joomla",
      magento: "Magento",
      woocommerce: "WooCommerce",
      bigcommerce: "BigCommerce",
      hubspot: "HubSpot CMS",
      prestashop: "PrestaShop",
      ghost: "Ghost CMS",
      contentful: "Contentful"
    };
    return platformNames[platform] || platform;
  };

  const handleConnect = (platform: string) => {
    if (connected[platform]) {
      toast({
        title: "Already Connected",
        description: `Your ${getPlatformName(platform)} site is already connected.`,
      });
      return;
    }

    if (!websites[platform]) {
      toast({
        title: "Website URL Required",
        description: `Please enter your ${getPlatformName(platform)} website URL.`,
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
        description: `Your ${getPlatformName(platform)} site has been connected successfully.`,
      });
    }, 1500);
  };

  const handleDisconnect = (platform: string) => {
    setConnected({...connected, [platform]: false});
    setWebsites(prev => ({ ...prev, [platform]: "" }));
    toast({
      title: "Disconnected",
      description: `Your ${getPlatformName(platform)} site has been disconnected.`,
    });
  };

  return {
    connecting,
    searchQuery,
    filterType,
    connected,
    websites,
    handleInputChange,
    handleConnect,
    handleDisconnect,
    setSearchQuery,
    setFilterType
  };
}
