
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, Bot, Workflow, Settings, Zap, 
  Phone, MessageSquare, Calendar, Users, BarChart
} from "lucide-react";

const AutomationPage = () => {
  const navigate = useNavigate();
  
  const automationTools = [
    {
      title: "Workflows",
      description: "Create and manage automated workflows",
      icon: <Workflow className="h-8 w-8 text-violet-500" />,
      path: "/automation/workflows",
      color: "bg-violet-50 dark:bg-violet-900/20"
    },
    {
      title: "AI Tools",
      description: "AI-powered tools to enhance productivity",
      icon: <Bot className="h-8 w-8 text-blue-500" />,
      path: "/ai-tools",
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "IVR System",
      description: "Interactive voice response for calls",
      icon: <Phone className="h-8 w-8 text-orange-500" />,
      path: "/team-chat", // This will open the IVR tab in team chat
      color: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Outbound Calls",
      description: "Manage outbound call campaigns",
      icon: <Phone className="h-8 w-8 text-green-500" />,
      path: "/outbound/calls",
      color: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "CRM Integration",
      description: "Connect with your CRM systems",
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      path: "/crm",
      color: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      title: "Chatbot Builder",
      description: "Create custom chatbots for your website",
      icon: <MessageSquare className="h-8 w-8 text-cyan-500" />,
      path: "/chatbot",
      color: "bg-cyan-50 dark:bg-cyan-900/20"
    },
    {
      title: "Calendar Automation",
      description: "Automate scheduling and reminders",
      icon: <Calendar className="h-8 w-8 text-amber-500" />,
      path: "/calendar",
      color: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Analytics Integration",
      description: "Connect analytics tools for tracking",
      icon: <BarChart className="h-8 w-8 text-fuchsia-500" />,
      path: "/analytics",
      color: "bg-fuchsia-50 dark:bg-fuchsia-900/20"
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Automation Hub</h1>
          <p className="text-muted-foreground mt-1">
            Connect and automate your tools and workflows
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {automationTools.map((tool, index) => (
            <Card 
              key={index}
              className="hover:shadow-md transition-all cursor-pointer border border-border/40"
              onClick={() => navigate(tool.path)}
            >
              <CardContent className="p-6">
                <div className={`${tool.color} p-3 rounded-full w-fit mb-4`}>
                  {tool.icon}
                </div>
                <h3 className="font-medium text-lg mb-1">{tool.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
                <Button variant="ghost" className="flex items-center p-0 h-auto">
                  <span className="text-sm">Open</span>
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8">
          <Card className="border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-violet-100 dark:bg-violet-800 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-violet-600 dark:text-violet-300" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Connect External Tools</h3>
                  <p className="text-muted-foreground">Integrate with tools like n8n, Zapier, Make, and more</p>
                </div>
                <div className="ml-auto">
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AutomationPage;
