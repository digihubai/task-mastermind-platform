
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowAutomation from "@/components/workflow/WorkflowAutomation";
import { 
  Search, Filter, Plus, MessageSquare, Mail, FileText, Phone,
  Sparkles, Bot, Calendar, Users, Database, Settings
} from "lucide-react";

const Workflows = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("workflows");
  
  // Sample workflow data
  const workflows = [
    {
      id: 1,
      name: "Customer Support Chat Flow",
      description: "Handles incoming WhatsApp and web chat messages",
      icon: <MessageSquare size={24} className="text-blue-500" />,
      tags: ["messaging", "support"],
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      name: "Email Ticket Processor",
      description: "Routes incoming support emails to proper departments",
      icon: <Mail size={24} className="text-indigo-500" />,
      tags: ["email", "tickets"],
      status: "active",
      lastUpdated: "Yesterday"
    },
    {
      id: 3,
      name: "CSAT Survey Workflow",
      description: "Sends satisfaction surveys after ticket resolution",
      icon: <FileText size={24} className="text-violet-500" />,
      tags: ["surveys", "feedback"],
      status: "paused",
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      name: "Call Center IVR Flow",
      description: "Interactive voice response system for inbound calls",
      icon: <Phone size={24} className="text-orange-500" />,
      tags: ["calls", "ivr"],
      status: "draft",
      lastUpdated: "1 week ago"
    }
  ];

  const filteredWorkflows = workflows.filter(workflow => 
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateWorkflow = () => {
    navigate('/automation/editor');
  };

  const handleCreateWithAI = () => {
    navigate('/automation/templates');
  };

  const handleWorkflowClick = (id: number) => {
    navigate(`/automation/editor/${id}`);
  };

  const integrations = [
    { name: "Salesforce CRM", icon: <Users size={24} className="text-blue-500" />, status: "connected", type: "crm" },
    { name: "HubSpot", icon: <Database size={24} className="text-orange-500" />, status: "connected", type: "crm" },
    { name: "Zendesk", icon: <MessageSquare size={24} className="text-green-500" />, status: "connected", type: "support" },
    { name: "Marketo", icon: <Mail size={24} className="text-purple-500" />, status: "connected", type: "marketing" },
    { name: "Twilio", icon: <Phone size={24} className="text-red-500" />, status: "connected", type: "communication" },
    { name: "Google Calendar", icon: <Calendar size={24} className="text-blue-500" />, status: "disconnected", type: "productivity" },
    { name: "ChatGPT", icon: <Bot size={24} className="text-teal-500" />, status: "connected", type: "ai" },
    { name: "N8N", icon: <Settings size={24} className="text-slate-500" />, status: "connected", type: "automation" }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">Workflows</h1>
            <p className="text-muted-foreground mt-1">Create and manage your automation workflows</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2 border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-900/30"
              onClick={handleCreateWithAI}
            >
              <Sparkles size={16} /> AI Generate
            </Button>
            <Button onClick={handleCreateWorkflow} className="gap-2 bg-violet-600 hover:bg-violet-700">
              <Plus size={16} /> Create
            </Button>
          </div>
        </div>

        <Tabs defaultValue="workflows" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="workflows">My Workflows</TabsTrigger>
            <TabsTrigger value="n8n">N8N Integration</TabsTrigger>
            <TabsTrigger value="integrations">Connected Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="workflows" className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search workflows..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-medium mb-2">My Workflows</h2>
              
              {filteredWorkflows.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border border-dashed rounded-lg bg-muted/10">
                  <p className="text-muted-foreground mb-4">No workflows match your search criteria</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredWorkflows.map(workflow => (
                    <Card 
                      key={workflow.id} 
                      className="overflow-hidden hover:border-violet-300 transition-all cursor-pointer"
                      onClick={() => handleWorkflowClick(workflow.id)}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center p-4">
                          <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center mr-4">
                            {workflow.icon}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="min-w-0">
                                <h3 className="font-medium truncate">{workflow.name}</h3>
                                <p className="text-sm text-muted-foreground truncate">{workflow.description}</p>
                              </div>
                              <Badge 
                                className={`ml-2 ${
                                  workflow.status === 'active' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                    : workflow.status === 'paused'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                                }`}
                              >
                                {workflow.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center mt-2">
                              <div className="flex gap-1">
                                {workflow.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-auto">{workflow.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {filteredWorkflows.length > 0 && (
              <div className="flex justify-center">
                <Button variant="ghost" className="text-violet-600">
                  View All
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="n8n" className="space-y-4">
            <WorkflowAutomation />
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration, idx) => (
                <Card key={idx} className="border border-border/40">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        {integration.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{integration.name}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">{integration.type}</Badge>
                          <Badge 
                            className={integration.status === 'connected' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }
                          >
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm">
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border border-dashed border-border/60 flex items-center justify-center h-[120px] cursor-pointer">
                <div className="text-center">
                  <Plus size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Add New Integration</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Workflows;
