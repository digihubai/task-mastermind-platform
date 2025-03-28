
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, MessageCircle, ArrowRight, Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const EmbedStep: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const copyCode = () => {
    const code = `<script src="https://digihub.ai/widget/digibot.js" id="digihub-widget" data-chatbot-id="12345"></script>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Code copied!",
      description: "The embed code has been copied to your clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const navigateToIntegration = (platform: string) => {
    // Navigate to the integrations page with the messaging tab selected
    navigate("/settings/integrations", { 
      state: { 
        activeTab: "messaging",
        activePlatform: platform 
      } 
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Embed Your Chatbot</h2>
      <p className="text-muted-foreground">
        Add your chatbot to your website or other platforms.
      </p>
      
      <div className="space-y-4 mt-6">
        <div className="border rounded-lg p-5 bg-card transition-all hover:shadow-md">
          <h3 className="font-medium text-lg mb-3">Website Embed</h3>
          <p className="text-sm text-muted-foreground mb-3">Add this code to your website</p>
          <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto relative">
            &lt;script src="https://digihub.ai/widget/digibot.js" id="digihub-widget" data-chatbot-id="12345"&gt;&lt;/script&gt;
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 flex items-center gap-1.5"
            onClick={copyCode}
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Code</span>
              </>
            )}
          </Button>
        </div>
        
        <div className="border rounded-lg p-5 bg-card transition-all hover:shadow-md">
          <h3 className="font-medium text-lg mb-3">Other Integrations</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Connect your chatbot to other platforms and services
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
            <Button 
              variant="outline" 
              className="h-12 justify-start gap-2 hover:bg-secondary transition-colors"
              onClick={() => navigateToIntegration("whatsapp")}
            >
              <Smartphone size={18} className="text-green-500" />
              <span>WhatsApp</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-12 justify-start gap-2 hover:bg-secondary transition-colors"
              onClick={() => navigateToIntegration("messenger")}
            >
              <MessageCircle size={18} className="text-blue-500" />
              <span>Messenger</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-12 justify-start gap-2 hover:bg-secondary transition-colors"
              onClick={() => navigateToIntegration("other")}
            >
              <ExternalLink size={18} className="text-purple-500" />
              <span>Other</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
