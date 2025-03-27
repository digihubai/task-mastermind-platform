
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PlusCircle, Smartphone, MessageSquare, ShoppingCart } from "lucide-react";

interface ChatbotConfigStepProps {
  step: number;
  newChatbotInfo: {
    title: string;
    bubbleMessage: string;
    welcomeMessage: string;
    instructions: string;
    language: string;
  };
  setNewChatbotInfo: (info: any) => void;
}

export const ChatbotConfigStep: React.FC<ChatbotConfigStepProps> = ({
  step,
  newChatbotInfo,
  setNewChatbotInfo,
}) => {
  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Configure</h2>
          <p className="text-muted-foreground">
            Create and configure a chatbot that interacts with your users, ensuring it delivers accurate information.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="chatbot-title">Chatbot Title</Label>
              <Input 
                id="chatbot-title" 
                value={newChatbotInfo.title || "digibot"} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, title: e.target.value})}
                placeholder="Enter a name for your chatbot"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bubble-message">Bubble Message</Label>
              <Input 
                id="bubble-message" 
                value={newChatbotInfo.bubbleMessage} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, bubbleMessage: e.target.value})}
                placeholder="Hey there, how can I help you?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Input 
                id="welcome-message" 
                value={newChatbotInfo.welcomeMessage} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, welcomeMessage: e.target.value})}
                placeholder="Hi, how can I help you?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chatbot-instructions">Chatbot Instructions</Label>
              <Textarea 
                id="chatbot-instructions" 
                value={newChatbotInfo.instructions} 
                onChange={(e) => setNewChatbotInfo({...newChatbotInfo, instructions: e.target.value})}
                placeholder="Explain chatbot role"
                rows={5}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="go-beyond">Do Not Go Beyond Instructions</Label>
                <Switch id="go-beyond" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={newChatbotInfo.language}
                onValueChange={(value) => setNewChatbotInfo({...newChatbotInfo, language: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Customize</h2>
          <p className="text-muted-foreground">
            Customize the appearance and behavior of your chatbot.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Theme Color</Label>
              <div className="flex gap-2">
                {["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-red-500", "bg-yellow-500"].map((color) => (
                  <div 
                    key={color} 
                    className={`h-8 w-8 rounded-full ${color} cursor-pointer border-2 ${color === "bg-blue-500" ? "border-black dark:border-white" : "border-transparent"}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Chatbot Icon</Label>
              <div className="flex gap-2">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <MessageSquare className="text-white" />
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  Upload Custom
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Chat Window Position</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Left</Button>
                <Button variant="default" className="flex-1">Right</Button>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Train</h2>
          <p className="text-muted-foreground">
            Train your chatbot by providing knowledge or connecting data sources.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Knowledge Base</h3>
              <p className="text-sm text-muted-foreground mb-2">Add documents, FAQs, or other text-based knowledge</p>
              <Button variant="outline" className="w-full">
                <PlusCircle size={16} className="mr-2" />
                Add Knowledge Source
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Website Integration</h3>
              <p className="text-sm text-muted-foreground mb-2">Let the chatbot crawl your website for knowledge</p>
              <Button variant="outline" className="w-full">
                <PlusCircle size={16} className="mr-2" />
                Add Website URL
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">API Connections</h3>
              <p className="text-sm text-muted-foreground mb-2">Connect to external APIs for dynamic data</p>
              <Button variant="outline" className="w-full">
                <PlusCircle size={16} className="mr-2" />
                Configure API
              </Button>
            </div>
          </div>
        </div>
      );
    case 4:
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
                  <MessageSquare size={16} className="mr-2" />
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
    default:
      return null;
  }
};
