
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [selectedChatbot, setSelectedChatbot] = useState<string | null>(null);
  
  const activeChatbots = [
    {
      id: "1",
      name: "digibot",
      avatar: "👤",
      createdAt: "16 hours ago"
    },
    {
      id: "2",
      name: "digibot",
      avatar: "👩",
      createdAt: "18 hours ago"
    },
    {
      id: "3",
      name: "digibot",
      avatar: "👩",
      createdAt: "19 hours ago"
    },
    {
      id: "4",
      name: "digibot",
      avatar: "💬",
      createdAt: "20 hours ago"
    },
    {
      id: "5",
      name: "digibot",
      avatar: "💬",
      createdAt: "20 hours ago"
    },
    {
      id: "6",
      name: "digibot",
      avatar: "👤",
      createdAt: "4 days ago"
    }
  ];

  const handleChatHistory = () => {
    navigate("/support/omnichannel");
    toast.info("Viewing chat history in omnichannel support");
  };

  const handleAddNewChatbot = () => {
    navigate("/ai/chatbots/new");
    toast.info("Adding new chatbot");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleEditChatbot = (id: string) => {
    navigate(`/ai/chatbots/edit/${id}`);
    toast.info(`Editing chatbot ${id}`);
  };

  const handleConfigureChatbot = (id: string) => {
    navigate(`/ai/chatbots/configure/${id}`);
    toast.info(`Configuring chatbot ${id}`);
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center text-muted-foreground hover:text-foreground"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to dashboard
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">digi</h1>
          <p className="text-muted-foreground">
            View and manage external chatbots
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={handleChatHistory}
          >
            Chat History
          </Button>
          
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleAddNewChatbot}
          >
            <Plus size={16} className="mr-2" />
            Add New Chatbot
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-4">
            <img src="/lovable-uploads/08f90115-7958-43e2-b379-88702703af59.png" alt="Create chatbot" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-xl font-medium mb-2">Create and configure a chatbot that interacts with your users.</h3>
          <Button 
            className="mt-4"
            onClick={handleAddNewChatbot}
          >
            <Plus size={16} className="mr-2" />
            Add New Chatbot
          </Button>
        </Card>
        
        <Card className="p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-4">
            <img src="/lovable-uploads/a057c0b0-315a-4e15-9e99-c63a421be55a.png" alt="Recent conversations" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-xl font-medium mb-2">Explore recent conversations from your users.</h3>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={handleChatHistory}
          >
            View Chat History
          </Button>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Active Chatbots</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeChatbots.map(bot => (
          <Card key={bot.id} className="border">
            <div className="p-4 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <span className="text-lg">{bot.avatar}</span>
                </div>
                <div>
                  <h3 className="font-medium">{bot.name}</h3>
                  <p className="text-xs text-muted-foreground">Created {bot.createdAt}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical size={16} />
              </Button>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-center">
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 px-2 py-0.5 text-xs">
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                    Active
                  </span>
                </Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditChatbot(bot.id)}
                >
                  Edit
                </Button>
                <Button 
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
  );
};

export default ChatbotPage;
