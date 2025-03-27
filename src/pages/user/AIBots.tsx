
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Plus, 
  Settings, 
  Code, 
  MessageSquare, 
  BookOpen,
  Zap,
  Database,
  FileText
} from "lucide-react";
import { toast } from "sonner";

const AIBots = () => {
  const [activeTab, setActiveTab] = useState("my-bots");
  const [showNewBotForm, setShowNewBotForm] = useState(false);
  
  const botTemplates = [
    {
      id: "customer-support",
      name: "Customer Support Bot",
      description: "Handles customer inquiries and support tickets automatically",
      category: "Support",
      icon: <MessageSquare className="text-blue-500" />
    },
    {
      id: "sales-assistant",
      name: "Sales Assistant",
      description: "Qualifies leads and assists with sales processes",
      category: "Sales",
      icon: <Zap className="text-yellow-500" />
    },
    {
      id: "data-analyst",
      name: "Data Analyst",
      description: "Analyzes data and generates reports",
      category: "Analytics",
      icon: <Database className="text-green-500" />
    },
    {
      id: "knowledge-base",
      name: "Knowledge Base Bot",
      description: "Answers questions from your company's documentation",
      category: "Knowledge",
      icon: <BookOpen className="text-purple-500" />
    },
    {
      id: "document-processor",
      name: "Document Processor",
      description: "Extracts information from documents and forms",
      category: "Documents",
      icon: <FileText className="text-orange-500" />
    }
  ];
  
  const myBots = [
    {
      id: "bot-1",
      name: "Customer Support Bot",
      description: "Helps with customer service requests automatically",
      status: "active",
      lastUpdated: "2023-09-15T14:30:00Z"
    },
    {
      id: "bot-2",
      name: "Sales Qualification Bot",
      description: "Qualifies leads and schedules demos with sales reps",
      status: "inactive",
      lastUpdated: "2023-09-10T09:15:00Z"
    }
  ];
  
  const handleCreateBot = () => {
    setShowNewBotForm(false);
    toast.success("New bot created successfully!");
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Bots</h1>
            <p className="text-muted-foreground mt-1">
              Create, train, and manage your AI assistants
            </p>
          </div>
          
          <Button 
            className="gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
            onClick={() => setShowNewBotForm(true)}
          >
            <Plus size={18} />
            <span>Create Bot</span>
          </Button>
        </div>
        
        <Tabs defaultValue="my-bots" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="my-bots">My Bots</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-bots">
            {showNewBotForm ? (
              <Card className="p-6 border border-border/40">
                <h2 className="text-xl font-medium mb-4">Create New Bot</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Bot Name</label>
                    <Input placeholder="e.g. Customer Support Assistant" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Description</label>
                    <Input placeholder="What does this bot do?" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Base Model</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>GPT-4</option>
                      <option>Claude 2</option>
                      <option>Custom Model</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowNewBotForm(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateBot}>
                      Create Bot
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myBots.map((bot) => (
                  <Card key={bot.id} className="p-6 border border-border/40">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bot size={24} className="text-primary" />
                      </div>
                      <h3 className="font-medium text-lg">{bot.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{bot.description}</p>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        bot.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {bot.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary">Configure</Button>
                    </div>
                  </Card>
                ))}
                
                <Card className="p-6 border border-dashed border-border flex flex-col items-center justify-center text-center h-[200px] cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setShowNewBotForm(true)}
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Plus size={24} className="text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Create New Bot</h3>
                  <p className="text-muted-foreground mt-1">Build a custom AI assistant</p>
                </Card>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {botTemplates.map((template) => (
                <Card key={template.id} className="p-6 border border-border/40 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{template.name}</h3>
                      <span className="text-xs text-muted-foreground">{template.category}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{template.description}</p>
                  <Button className="w-full">Use Template</Button>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="p-6 border border-border/40">
              <h2 className="text-xl font-medium mb-4">Bot Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Default AI Model</h3>
                  <select className="w-full max-w-md p-2 border rounded-md">
                    <option>GPT-4</option>
                    <option>Claude 2</option>
                    <option>Custom Model</option>
                  </select>
                  <p className="text-sm text-muted-foreground mt-1">
                    This model will be used for new bots by default
                  </p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">API Integrations</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Code size={18} />
                        <span>OpenAI API</span>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Code size={18} />
                        <span>Anthropic API</span>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">Bot Training</h3>
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automatic training</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically train bots on new data
                        </p>
                      </div>
                      <div className="h-6 w-12 bg-primary rounded-full flex items-center p-1">
                        <div className="h-4 w-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AIBots;
