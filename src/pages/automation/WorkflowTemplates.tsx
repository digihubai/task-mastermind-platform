
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Instagram, Database, Phone, Plus, Search, Filter, PhoneCall, FileText, BarChart3, RefreshCw } from "lucide-react";

const WorkflowTemplates = () => {
  const navigate = useNavigate();

  // Template categories
  const categories = [
    { id: "all", label: "All" },
    { id: "communication", label: "Communication" },
    { id: "customer-service", label: "Customer Service" },
    { id: "project-management", label: "Project Management" },
    { id: "sales-crm", label: "Sales & CRM" },
    { id: "finance", label: "Finance" }
  ];

  // Communication templates
  const communicationTemplates = [
    {
      id: 1,
      title: "Customer Support IVR",
      description: "Create an interactive voice response system to handle customer calls and route them to the right department.",
      icon: <PhoneCall className="text-violet-600" />,
      category: "Phone",
      popular: true
    },
    {
      id: 2,
      title: "Multi-Channel Chat Support",
      description: "Connect with customers through WhatsApp, Messenger, and web chat from a single interface.",
      icon: <MessageSquare className="text-blue-600" />,
      category: "Messaging",
      popular: true
    },
    {
      id: 3,
      title: "Email Response Automation",
      description: "Automatically categorize and respond to common customer email inquiries.",
      icon: <Mail className="text-indigo-600" />,
      category: "Email",
      popular: false
    },
    {
      id: 4,
      title: "Customer Feedback Survey",
      description: "Send automated surveys after customer interactions to collect CSAT and NPS data.",
      icon: <FileText className="text-green-600" />,
      category: "Forms",
      popular: false
    }
  ];

  // Customer service templates
  const customerServiceTemplates = [
    {
      id: 5,
      title: "CSAT Dashboard",
      description: "Monitor customer satisfaction scores across all touchpoints and track improvement over time.",
      icon: <BarChart3 className="text-violet-600" />,
      category: "Analytics",
      popular: true
    },
    {
      id: 6,
      title: "Ticket Resolution Timer",
      description: "Track and improve your team's response and resolution times with automated reports.",
      icon: <RefreshCw className="text-blue-600" />,
      category: "Performance",
      popular: false
    },
    {
      id: 7,
      title: "Refund Processing",
      description: "Streamline the refund approval process with proper documentation and authorization.",
      icon: <Database className="text-indigo-600" />,
      category: "Operations",
      popular: false
    },
    {
      id: 8,
      title: "Team Performance Tracker",
      description: "Monitor individual and team metrics for customer service representatives.",
      icon: <BarChart3 className="text-amber-600" />,
      category: "Team",
      popular: false
    }
  ];

  const handleUseTemplate = (templateId: number) => {
    navigate(`/automation/editor/${templateId}`);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">Workflow Templates</h1>
            <p className="text-muted-foreground mt-1">Start with pre-built workflows for your business needs</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-10 w-[250px]" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-muted/50">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">{category.label}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-violet-600">Communication Templates</h2>
              <p className="text-muted-foreground mb-6">Streamline your customer interactions across multiple channels</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {communicationTemplates.map(template => (
                  <Card key={template.id} className="overflow-hidden border border-border hover:border-violet-300 transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                          {template.icon}
                        </div>
                        {template.popular && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardContent>
                    <CardFooter className="pt-1 flex justify-between">
                      <Badge variant="outline">{template.category}</Badge>
                      <Button 
                        variant="ghost" 
                        className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-violet-600">Customer Service Workflows</h2>
              <p className="text-muted-foreground mb-6">Track metrics and streamline your customer service operations</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {customerServiceTemplates.map(template => (
                  <Card key={template.id} className="overflow-hidden border border-border hover:border-violet-300 transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                          {template.icon}
                        </div>
                        {template.popular && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardContent>
                    <CardFooter className="pt-1 flex justify-between">
                      <Badge variant="outline">{template.category}</Badge>
                      <Button 
                        variant="ghost" 
                        className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="communication">
            <h2 className="text-xl font-semibold mb-4 text-violet-600">Communication Templates</h2>
            <p className="text-muted-foreground mb-6">Streamline your customer interactions across multiple channels</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {communicationTemplates.map(template => (
                <Card key={template.id} className="overflow-hidden border border-border hover:border-violet-300 transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                        {template.icon}
                      </div>
                      {template.popular && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardContent>
                  <CardFooter className="pt-1 flex justify-between">
                    <Badge variant="outline">{template.category}</Badge>
                    <Button 
                      variant="ghost" 
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customer-service">
            <h2 className="text-xl font-semibold mb-4 text-violet-600">Customer Service Workflows</h2>
            <p className="text-muted-foreground mb-6">Track metrics and streamline your customer service operations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {customerServiceTemplates.map(template => (
                <Card key={template.id} className="overflow-hidden border border-border hover:border-violet-300 transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                        {template.icon}
                      </div>
                      {template.popular && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardContent>
                  <CardFooter className="pt-1 flex justify-between">
                    <Badge variant="outline">{template.category}</Badge>
                    <Button 
                      variant="ghost" 
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default WorkflowTemplates;
