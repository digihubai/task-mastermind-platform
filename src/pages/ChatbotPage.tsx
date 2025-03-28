
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Settings, Bot, History, Users, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ChatbotPage = () => {
  const navigate = useNavigate();

  const handleChatHistory = () => {
    navigate("/support/omnichannel");
    toast.success("Redirected to Omnichannel Support");
  };

  const handleCreateNewBot = () => {
    toast.info("Create new bot feature coming soon");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">AI Chatbots</h1>
        <p className="text-muted-foreground mt-1">
          Create and manage intelligent chatbots powered by AI
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={handleChatHistory}
        >
          <History size={16} />
          Chat History
        </Button>
        
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => toast.info("Bot settings feature coming soon")}
        >
          <Settings size={16} />
          Bot Settings
        </Button>
        
        <Button 
          className="gap-2 ml-auto"
          onClick={handleCreateNewBot}
        >
          <PlusCircle size={16} />
          Create New Bot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 cursor-pointer hover:bg-accent/50 transition-colors border-2 border-primary/30">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/20 rounded-full">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Customer Support Bot</h3>
                <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20">Active</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                Handles customer inquiries, product questions, and support requests
              </p>
              
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>2,453 conversations</span>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" size="sm" className="h-8" onClick={handleChatHistory}>
                  View History
                </Button>
                
                <Button size="sm" className="h-8">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-5 cursor-pointer hover:bg-accent/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/20 rounded-full">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Sales Assistant Bot</h3>
                <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20">Active</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                Qualifies leads, answers product questions, and assists with sales
              </p>
              
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>1,245 conversations</span>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" size="sm" className="h-8" onClick={handleChatHistory}>
                  View History
                </Button>
                
                <Button size="sm" className="h-8">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-5 cursor-pointer hover:bg-accent/50 transition-colors border border-dashed">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <PlusCircle className="h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">Create New Bot</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add a specialized chatbot for your needs
            </p>
            <Button size="sm" onClick={handleCreateNewBot}>
              Get Started
            </Button>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Conversations</h3>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer" onClick={handleChatHistory}>
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">John Smith</h4>
                  <Badge variant="outline" className="text-xs">Customer Support Bot</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  I'm having trouble with my recent order #12345. The product arrived damaged...
                </p>
                <p className="text-xs text-muted-foreground mt-2">Today, 2:34 PM</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer" onClick={handleChatHistory}>
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <Badge variant="outline" className="text-xs">Sales Assistant Bot</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  I'm interested in the premium plan. Can you tell me more about the features...
                </p>
                <p className="text-xs text-muted-foreground mt-2">Yesterday, 4:12 PM</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer" onClick={handleChatHistory}>
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Michael Brown</h4>
                  <Badge variant="outline" className="text-xs">Customer Support Bot</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  How do I reset my password? I've tried the forgot password option but...
                </p>
                <p className="text-xs text-muted-foreground mt-2">Yesterday, 10:45 AM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full" onClick={handleChatHistory}>
            View All Conversations
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatbotPage;
