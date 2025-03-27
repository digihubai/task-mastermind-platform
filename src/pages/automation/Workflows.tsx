
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Filter, Plus, MessageSquare, Mail, FileText, Phone,
  Sparkles
} from "lucide-react";

const Workflows = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
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
      </div>
    </AppLayout>
  );
};

export default Workflows;
