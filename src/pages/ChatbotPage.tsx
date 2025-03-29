
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [activeChatbots, setActiveChatbots] = useState([
    {
      id: "1",
      name: "digibot",
      avatar: "/lovable-uploads/a61b541c-3a12-44eb-b261-3e4f9d6890cc.png",
      createdAt: "3 hours ago"
    },
    {
      id: "2",
      name: "digibot",
      avatar: "/lovable-uploads/43312f87-4a35-4053-a70d-db7e1ece3498.png",
      createdAt: "4 hours ago"
    },
    {
      id: "3",
      name: "digibot",
      avatar: "/lovable-uploads/e63cd7f0-808e-4ee8-882e-f37b4a7333b4.png",
      createdAt: "21 hours ago"
    },
    {
      id: "4",
      name: "digibot",
      avatar: "/lovable-uploads/a61b541c-3a12-44eb-b261-3e4f9d6890cc.png",
      createdAt: "23 hours ago"
    },
    {
      id: "5",
      name: "digibot",
      avatar: "/lovable-uploads/43312f87-4a35-4053-a70d-db7e1ece3498.png",
      createdAt: "1 day ago"
    },
    {
      id: "6",
      name: "digibot",
      avatar: "/lovable-uploads/e63cd7f0-808e-4ee8-882e-f37b4a7333b4.png",
      createdAt: "1 day ago"
    },
    {
      id: "7",
      name: "digibot",
      avatar: "/lovable-uploads/a61b541c-3a12-44eb-b261-3e4f9d6890cc.png",
      createdAt: "1 day ago"
    },
    {
      id: "8",
      name: "digibot",
      avatar: "/lovable-uploads/43312f87-4a35-4053-a70d-db7e1ece3498.png",
      createdAt: "5 days ago"
    },
    {
      id: "9",
      name: "digibot",
      avatar: "/lovable-uploads/e63cd7f0-808e-4ee8-882e-f37b4a7333b4.png",
      createdAt: "5 days ago"
    },
    {
      id: "10",
      name: "digibot",
      avatar: "/lovable-uploads/a61b541c-3a12-44eb-b261-3e4f9d6890cc.png",
      createdAt: "5 days ago"
    }
  ]);

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
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">digi</h1>
          <p className="text-muted-foreground">
            View and manage external chatbots
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleChatHistory}
          >
            Chat History
          </Button>
          
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleAddNewChatbot}
          >
            <Plus size={16} className="mr-2" />
            Add New Chatbot
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-4 bg-purple-100 rounded-full flex items-center justify-center">
            <img src="/lovable-uploads/a61b541c-3a12-44eb-b261-3e4f9d6890cc.png" alt="Create chatbot" className="w-16 h-16 object-contain" />
          </div>
          <h3 className="text-xl font-medium mb-2">Create and configure a chatbot that interacts with your users.</h3>
          <Button 
            variant="outline"
            className="mt-4 flex items-center"
            onClick={handleAddNewChatbot}
          >
            <Plus size={16} className="mr-2" />
            Add New Chatbot
          </Button>
        </Card>
        
        <Card className="p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-4 bg-purple-100 rounded-full flex items-center justify-center">
            <img src="/lovable-uploads/43312f87-4a35-4053-a70d-db7e1ece3498.png" alt="Recent conversations" className="w-16 h-16 object-contain" />
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
                  <img src={bot.avatar} alt={bot.name} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium">{bot.name}</h3>
                  <p className="text-xs text-muted-foreground">Created {bot.createdAt}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3.33334C8.73333 3.33334 9.33333 2.73334 9.33333 2.00001C9.33333 1.26667 8.73333 0.666672 8 0.666672C7.26667 0.666672 6.66667 1.26667 6.66667 2.00001C6.66667 2.73334 7.26667 3.33334 8 3.33334ZM8 6.00001C7.26667 6.00001 6.66667 6.60001 6.66667 7.33334C6.66667 8.06668 7.26667 8.66668 8 8.66668C8.73333 8.66668 9.33333 8.06668 9.33333 7.33334C9.33333 6.60001 8.73333 6.00001 8 6.00001ZM8 11.3333C7.26667 11.3333 6.66667 11.9333 6.66667 12.6667C6.66667 13.4 7.26667 14 8 14C8.73333 14 9.33333 13.4 9.33333 12.6667C9.33333 11.9333 8.73333 11.3333 8 11.3333Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-center">
                <div className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                  Active
                </div>
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
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
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
