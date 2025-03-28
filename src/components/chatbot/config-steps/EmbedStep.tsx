
import React from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, MessageCircle, ShoppingCart } from "lucide-react";

export const EmbedStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Embed</h2>
      <p className="text-muted-foreground">
        Add your chatbot to your website or other platforms.
      </p>
      
      <div className="space-y-4 mt-6">
        <div className="border rounded-md p-4">
          <h3 className="font-medium">Website Embed</h3>
          <p className="text-sm text-muted-foreground mb-2">Add this code to your website</p>
          <div className="bg-muted p-3 rounded-md text-sm font-mono">
            &lt;script src="https://digihub.ai/widget/digibot.js" id="digihub-widget" data-chatbot-id="12345"&gt;&lt;/script&gt;
          </div>
          <Button variant="outline" size="sm" className="mt-2">
            Copy Code
          </Button>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="font-medium">Other Integrations</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button variant="outline" className="h-10">
              <Smartphone size={16} className="mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" className="h-10">
              <MessageCircle size={16} className="mr-2" />
              Messenger
            </Button>
            <Button variant="outline" className="h-10">
              <ShoppingCart size={16} className="mr-2" />
              Shopify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
