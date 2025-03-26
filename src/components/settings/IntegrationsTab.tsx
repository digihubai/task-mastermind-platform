
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IntegrationsTab: React.FC = () => {
  const { toast } = useToast();

  return (
    <Card className="border border-border/40">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Integration Settings</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Asana</h3>
                  <p className="text-sm text-muted-foreground">Project management integration</p>
                </div>
                <Switch id="asana-integration" />
              </div>
              <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
            </div>
            
            <div className="flex flex-col p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Trello</h3>
                  <p className="text-sm text-muted-foreground">Project management integration</p>
                </div>
                <Switch id="trello-integration" />
              </div>
              <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
            </div>
            
            <div className="flex flex-col p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">ClickUp</h3>
                  <p className="text-sm text-muted-foreground">Project management integration</p>
                </div>
                <Switch id="clickup-integration" />
              </div>
              <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
            </div>
            
            <div className="flex flex-col p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Monday</h3>
                  <p className="text-sm text-muted-foreground">Project management integration</p>
                </div>
                <Switch id="monday-integration" />
              </div>
              <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
            </div>
            
            <div className="flex flex-col p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Notion</h3>
                  <p className="text-sm text-muted-foreground">Project management integration</p>
                </div>
                <Switch id="notion-integration" />
              </div>
              <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
            </div>
            
            <div className="flex flex-col p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">WhatsApp Business</h3>
                  <p className="text-sm text-muted-foreground">Messaging integration</p>
                </div>
                <Switch id="whatsapp-integration" checked />
              </div>
              <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
            </div>
            
            <div className="flex flex-col p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Shopify</h3>
                  <p className="text-sm text-muted-foreground">E-commerce integration</p>
                </div>
                <Switch id="shopify-integration" checked />
              </div>
              <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
            </div>
            
            <div className="flex flex-col p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">WooCommerce</h3>
                  <p className="text-sm text-muted-foreground">E-commerce integration</p>
                </div>
                <Switch id="woocommerce-integration" />
              </div>
              <Button variant="outline" size="sm" className="self-end mt-4">Configure</Button>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Add integration",
                  description: "Integration wizard will be available soon",
                });
              }}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              <span>Add New Integration</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IntegrationsTab;
