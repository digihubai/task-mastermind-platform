
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, BarChart2, Edit3, MoreVertical, Bot, User } from "lucide-react";

interface ChatbotDashboardProps {
  activeChatbots: Array<{
    id: string;
    name: string;
    avatar: React.ReactNode;
    avatarBg: string;
    status: string;
    createdAt: string;
  }>;
  onNewChatbot: () => void;
  onEditChatbot: (id: string) => void;
  onConfigureChatbot: (id: string) => void;
  onViewHistory: () => void;
}

export const ChatbotDashboard: React.FC<ChatbotDashboardProps> = ({
  activeChatbots,
  onNewChatbot,
  onEditChatbot,
  onConfigureChatbot,
  onViewHistory,
}) => {
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
            onClick={onViewHistory}
            className="flex items-center gap-2"
          >
            <MessageSquare size={18} />
            <span>Chat History</span>
          </Button>
          
          <Button
            onClick={onNewChatbot}
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
            onClick={onNewChatbot}
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
            onClick={onViewHistory}
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
                    onClick={() => onEditChatbot(bot.id)}
                  >
                    <Edit3 size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onConfigureChatbot(bot.id)}
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
