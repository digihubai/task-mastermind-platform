
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Store, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EcommerceIntegrations: React.FC = () => {
  const { toast } = useToast();
  
  const handleConnect = (service: string) => {
    toast({
      title: "Connection initiated",
      description: `Connecting to ${service}...`,
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-full">
              <Store size={20} />
            </div>
            <div>
              <h3 className="font-medium">WooCommerce</h3>
              <p className="text-xs text-muted-foreground">Connect to WordPress & WooCommerce</p>
            </div>
          </div>
          <Switch />
        </div>
        <Input placeholder="WooCommerce Site URL" className="mb-2" />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input placeholder="Consumer Key" />
          <Input placeholder="Consumer Secret" type="password" />
        </div>
        <Button size="sm" className="mt-2" onClick={() => handleConnect("WooCommerce")}>Connect</Button>
      </div>
      
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
              <Store size={20} />
            </div>
            <div>
              <h3 className="font-medium">Shopify</h3>
              <p className="text-xs text-muted-foreground">Connect to Shopify store</p>
            </div>
          </div>
          <Switch />
        </div>
        <Input placeholder="Shopify Store URL" className="mb-2" />
        <Input placeholder="Shopify API Key" className="mb-2" />
        <Input placeholder="Shopify API Secret" type="password" className="mb-2" />
        <Button size="sm" className="mt-2" onClick={() => handleConnect("Shopify")}>Connect</Button>
      </div>
      
      <div className="flex flex-col p-4 border border-border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-full">
              <CreditCard size={20} />
            </div>
            <div>
              <h3 className="font-medium">Stripe</h3>
              <p className="text-xs text-muted-foreground">Connect payment gateway</p>
            </div>
          </div>
          <Switch />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input placeholder="Publishable Key" />
          <Input placeholder="Secret Key" type="password" />
        </div>
        <Button size="sm" className="mt-2" onClick={() => handleConnect("Stripe")}>Connect</Button>
      </div>
    </div>
  );
};

export default EcommerceIntegrations;
