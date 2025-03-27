
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/Badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { ChatInterface } from "@/components/chatbot/ChatInterface";
import { 
  Bot, 
  Settings, 
  Plus, 
  MessageSquare, 
  BarChart2, 
  PlusCircle, 
  ChevronRight, 
  Edit3,
  Trash2,
  MoreVertical,
  User,
  Smartphone, 
  ShoppingCart, 
  Mail, 
  MessagesSquare,
  ArrowLeft
} from "lucide-react";

const ChatbotPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [chatbotView, setChatbotView] = useState<"list" | "create" | "edit" | "configure">("list");
  const [selectedChatbot, setSelectedChatbot] = useState<string | null>(null);
  const [configStep, setConfigStep] = useState(1);
  const [newChatbotInfo, setNewChatbotInfo] = useState({
    title: "",
    bubbleMessage: "Hey there, how can I help you?",
    welcomeMessage: "Hi, how can I help you?",
    instructions: "",
    language: "auto"
  });
  
  const platformIcons: {[key: string]: any} = {
    "website": <Bot />,
    "whatsapp": <Smartphone />,
    "messenger": <MessageSquare />,
    "shopify": <ShoppingCart />,
    "woocommerce": <ShoppingCart />,
    "email": <Mail />,
    "sms": <MessagesSquare />
  };
  
  const activeChatbots = [
    {
      id: "1",
      name: "digibot",
      avatar: <Bot className="text-white" />,
      avatarBg: "bg-blue-500",
      status: "active",
      createdAt: "3 days ago"
    },
    {
      id: "2",
      name: "digibot",
      avatar: <Bot className="text-white" />,
      avatarBg: "bg-purple-500",
      status: "active",
      createdAt: "3 days ago"
    },
    {
      id: "3",
      name: "digibot",
      avatar: <Bot className="text-white" />,
      avatarBg: "bg-green-500",
      status: "active",
      createdAt: "3 days ago"
    },
    {
      id: "4",
      name: "Digi",
      avatar: <User className="text-white" />,
      avatarBg: "bg-orange-500",
      status: "active",
      createdAt: "3 days ago"
    },
    {
      id: "5",
      name: "Digi",
      avatar: <User className="text-white" />,
      avatarBg: "bg-red-500",
      status: "active",
      createdAt: "3 days ago"
    }
  ];
  
  const handleNewChatbot = () => {
    setChatbotView("create");
  };
  
  const handleEditChatbot = (id: string) => {
    setSelectedChatbot(id);
    setChatbotView("edit");
  };
  
  const handleViewHistory = () => {
    toast.info("Chat history feature coming soon");
  };
  
  const handleConfigureChatbot = (id: string) => {
    setSelectedChatbot(id);
    setChatbotView("configure");
    setConfigStep(1);
  };
  
  const handleCreateChatbot = () => {
    toast.success("New chatbot created successfully!");
    setChatbotView("list");
  };
  
  const handleBackToDashboard = () => {
    setChatbotView("list");
    setSelectedChatbot(null);
    setConfigStep(1);
  };
  
  const handleNextStep = () => {
    if (configStep < 4) {
      setConfigStep(configStep + 1);
    } else {
      toast.success("Chatbot configuration completed!");
      setChatbotView("list");
    }
  };
  
  const renderConfigSteps = () => {
    switch (configStep) {
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
                    <Bot className="text-white" />
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
  
  const renderDashboard = () => {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">digi</h1>
            <p className="text-muted-foreground mt-1">
              View and manage external chatbots
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleViewHistory}
              className="flex items-center gap-2"
            >
              <MessageSquare size={18} />
              <span>Chat History</span>
            </Button>
            
            <Button
              onClick={handleNewChatbot}
              className="flex items-center gap-2 bg-primary text-primary-foreground"
            >
              <Plus size={18} />
              <span>Add New Chatbot</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-80 border border-border/40">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageSquare size={40} className="text-primary" />
            </div>
            <h2 className="text-xl font-medium">Create and configure a chatbot that interacts with your users.</h2>
            <Button 
              className="mt-4"
              onClick={handleNewChatbot}
            >
              <Plus size={16} className="mr-2" />
              Add New Chatbot
            </Button>
          </Card>
          
          <Card className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-80 border border-border/40">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
              <BarChart2 size={40} className="text-primary" />
            </div>
            <h2 className="text-xl font-medium">Explore recent conversations from your users.</h2>
            <Button 
              className="mt-4"
              onClick={handleViewHistory}
            >
              <MessageSquare size={16} className="mr-2" />
              View Chat History
            </Button>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Chatbots</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeChatbots.map((bot) => (
              <Card key={bot.id} className="border border-border/40">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${bot.avatarBg} flex items-center justify-center`}>
                      {bot.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium">{bot.name}</h3>
                      <p className="text-xs text-muted-foreground">Created {bot.createdAt}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditChatbot(bot.id)}
                    >
                      <Edit3 size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleConfigureChatbot(bot.id)}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderConfigureView = () => {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={handleBackToDashboard}
          >
            <ArrowLeft size={16} className="mr-1" />
            Close Customizer
          </Button>
          <span className="text-muted-foreground">Editing: {selectedChatbot ? "digibot" : "New Chatbot"}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`flex-1 text-center pb-2 border-b-2 ${
                    configStep === step ? 'border-primary text-primary' : 'border-muted text-muted-foreground'
                  }`}
                  onClick={() => setConfigStep(step)}
                >
                  <span className="mr-1">{step}</span>
                  <span className="hidden md:inline">
                    {step === 1 ? 'Configure' : step === 2 ? 'Customize' : step === 3 ? 'Train' : 'Embed'}
                  </span>
                </div>
              ))}
            </div>
            
            {renderConfigSteps()}
            
            <div className="mt-8 flex justify-end">
              <Button 
                variant="default" 
                onClick={handleNextStep}
                className="px-6"
              >
                {configStep < 4 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-muted/50 rounded-lg h-full flex items-center justify-center p-6">
              <ChatInterface 
                title={newChatbotInfo.title || "digibot"}
                config={{
                  initialMessage: newChatbotInfo.welcomeMessage,
                  modelName: "gpt-4",
                  maxTokens: 150,
                  temperature: 0.7
                }}
                variant="embedded"
                showBranding={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <AppLayout>
      <div className="p-6 animate-fade-in">
        {chatbotView === "list" && renderDashboard()}
        {(chatbotView === "configure" || chatbotView === "create") && renderConfigureView()}
        {chatbotView === "edit" && (
          <div>
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Chatbots
            </Button>
            
            <h1 className="text-2xl font-semibold mb-4">Edit Chatbot</h1>
            {/* Edit form would go here */}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ChatbotPage;
