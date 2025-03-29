
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, MessageCircle, ArrowRight, Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface EmbedStepProps {
  newChatbotInfo: any;
  setNewChatbotInfo: (info: any) => void;
}

export const EmbedStep: React.FC<EmbedStepProps> = ({ newChatbotInfo, setNewChatbotInfo }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // Initialize with existing values or defaults
  const [width, setWidth] = useState(newChatbotInfo.iframeWidth || 420);
  const [height, setHeight] = useState(newChatbotInfo.iframeHeight || 745);
  
  // Update parent component when width or height changes
  useEffect(() => {
    setNewChatbotInfo({ 
      ...newChatbotInfo, 
      iframeWidth: width, 
      iframeHeight: height 
    });
  }, [width, height]);
  
  const getEmbedCode = () => {
    return `<script defer src="https://digihub.ai/vendor/chatbot/js/external-chatbot.js" data-chatbot-uuid="89aa4a9c-1119-4eef-b0d0-52ff31a4c222" data-iframe-width="${width}" data-iframe-height="${height}" data-language="${newChatbotInfo.language || 'en'}" ></script>`;
  };
  
  const copyCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
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
  
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    setWidth(newWidth);
  };
  
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value);
    setHeight(newHeight);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Test and Embed</h2>
      <p className="text-muted-foreground">
        Your external AI chatbot has been successfully created! You can now integrate it into your website and start engaging with your audience.
      </p>
      
      <div className="space-y-4 mt-6">
        <div className="border rounded-lg p-5 bg-card transition-all hover:shadow-md">
          <h3 className="font-medium text-lg mb-3">Website Embed</h3>
          <p className="text-sm text-muted-foreground mb-3">Add this code to your website</p>
          <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto relative">
            {getEmbedCode()}
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
          <h3 className="font-medium text-lg mb-3">Width</h3>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="300"
              max="600"
              step="10"
              value={width}
              onChange={handleWidthChange}
              className="w-full"
            />
            <span className="font-mono text-sm">{width}px</span>
          </div>
        </div>
        
        <div className="border rounded-lg p-5 bg-card transition-all hover:shadow-md">
          <h3 className="font-medium text-lg mb-3">Height</h3>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="400"
              max="900"
              step="10"
              value={height}
              onChange={handleHeightChange}
              className="w-full"
            />
            <span className="font-mono text-sm">{height}px</span>
          </div>
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
      
      <div className="border-t mt-6 pt-4">
        <h4 className="font-medium mb-2">Need help?</h4>
        <p className="text-sm text-muted-foreground">
          Paste this code just before the closing &lt;/body&gt; tag in your HTML file, then save the changes. Refresh your site to ensure your chatbot works correctly.
        </p>
      </div>
    </div>
  );
};
