
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Bot, Briefcase, Mail, MessageSquare, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const dashboardCards = [
    {
      title: "Projects",
      description: "Manage your team projects and tasks",
      count: "12",
      icon: Briefcase,
      link: "/projects",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      percentChange: "+12%"
    },
    {
      title: "Customers",
      description: "View and manage your customer list",
      count: "348",
      icon: Users,
      link: "/customers",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      percentChange: "+5%"
    },
    {
      title: "Conversations",
      description: "All your customer messages in one place",
      count: "1,293",
      icon: MessageSquare,
      link: "/chat",
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      percentChange: "+24%"
    },
    {
      title: "Chatbot Integrations",
      description: "Manage your AI chatbot across channels",
      count: "8",
      icon: Bot,
      link: "/chatbot",
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
      percentChange: "+2"
    },
    {
      title: "Marketing Campaigns",
      description: "Track your campaigns and performance",
      count: "6",
      icon: Mail,
      link: "/marketing",
      color: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
      percentChange: "New"
    }
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your DigiHub AI command center
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index}
              className="hover-lift overflow-hidden border border-border/40"
              onClick={() => navigate(card.link)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{card.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{card.description}</p>
                  </div>
                  <div className={`rounded-full p-3 ${card.color}`}>
                    <card.icon size={20} />
                  </div>
                </div>
                
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold">{card.count}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <span className="text-green-500 mr-1">{card.percentChange}</span> 
                      from last month
                    </p>
                  </div>
                  
                  <div className="rounded-full bg-secondary p-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <Card className="p-6 border border-border/40">
            <h3 className="font-medium text-lg">Recent Activities</h3>
            <div className="mt-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 items-start pb-4 border-b border-border/40 last:border-0 last:pb-0">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">New customer registered</p>
                    <p className="text-muted-foreground text-xs mt-1">Customer #10{i} signed up for a demo</p>
                    <p className="text-muted-foreground text-xs mt-2">{i * 10} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <h3 className="font-medium text-lg">System Status</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <p className="text-sm">Chatbot Integration</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <p className="text-sm">Project Management</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <p className="text-sm">Marketing Automation</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <p className="text-sm">CRM System</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">AI Agents</p>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                  Operational
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
