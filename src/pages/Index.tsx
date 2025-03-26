
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, Bot, MessageSquare, Users, ArrowRight, BarChart3, 
  Briefcase, Settings, FileText, PenTool, Search, FileSpreadsheet, 
  Image, RefreshCw, Globe, Mail, DollarSign, Zap,
  CheckCircle, AlertCircle, Clock, ArrowUp, ArrowDown, 
  Edit, ArrowUpRight, Target, CalendarClock
} from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuGroup } from "@/components/ui/navigation-menu";

import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState("today");
  
  // KPI data
  const kpiData = {
    customerSatisfaction: {
      value: "92%",
      change: "+3%",
      trend: "up"
    },
    salesPipeline: {
      value: "$243,578",
      change: "+12%",
      trend: "up"
    },
    activeProjects: {
      value: "24",
      change: "+5",
      trend: "up"
    },
    taskCompletion: {
      value: "87%",
      change: "-2%",
      trend: "down"
    },
    leadConversion: {
      value: "32%",
      change: "+5%",
      trend: "up"
    },
    averageResolutionTime: {
      value: "2.4h",
      change: "-15%",
      trend: "up" // down is good for resolution time
    }
  };
  
  // Recent activities
  const recentActivities = [
    {
      type: "new_customer",
      title: "New customer registered",
      description: "John Smith signed up for a Pro plan",
      time: "10 minutes ago",
      icon: <Users size={18} />
    },
    {
      type: "task_completed",
      title: "Task completed",
      description: "SEO optimization for client website",
      time: "32 minutes ago",
      icon: <CheckCircle size={18} />
    },
    {
      type: "message",
      title: "New message received",
      description: "Sales inquiry from Acme Corp",
      time: "1 hour ago",
      icon: <MessageSquare size={18} />
    },
    {
      type: "alert",
      title: "Project deadline approaching",
      description: "Website redesign due in 2 days",
      time: "2 hours ago",
      icon: <AlertCircle size={18} />
    },
    {
      type: "payment",
      title: "Payment received",
      description: "$2,500 from XYZ Industries",
      time: "3 hours ago",
      icon: <DollarSign size={18} />
    }
  ];
  
  // Active tasks
  const activeTasks = [
    {
      title: "Complete client proposal",
      priority: "High",
      dueDate: "Today",
      assignee: "Alex Johnson",
      status: "In Progress"
    },
    {
      title: "Review marketing assets",
      priority: "Medium",
      dueDate: "Tomorrow",
      assignee: "Sarah Miller",
      status: "Pending"
    },
    {
      title: "Finalize Q2 financial report",
      priority: "High",
      dueDate: "Oct 12",
      assignee: "James Wilson",
      status: "In Progress"
    },
    {
      title: "Website security audit",
      priority: "Medium",
      dueDate: "Oct 15",
      assignee: "Emily Chen",
      status: "Not Started"
    }
  ];
  
  // Dashboard card configuration
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
      title: "Marketing",
      description: "Track your campaigns and performance",
      count: "6",
      icon: Mail,
      link: "/marketing",
      color: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
      percentChange: "New"
    }
  ];

  // Render a KPI card
  const renderKpiCard = (title, data, icon) => (
    <Card className="stat-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <p className="stat-value">{data.value}</p>
        <div className={data.trend === "up" ? "stat-indicator-up" : "stat-indicator-down"}>
          {data.trend === "up" ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
          {data.change}
        </div>
      </div>
    </Card>
  );
  
  return (
    <AppLayout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="rounded-2xl p-6 mb-4 bg-modern-gradient text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="mt-2 text-white/80">
                Welcome to your DigiHub AI command center
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button
                variant="secondary"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Clock size={18} className="mr-2" />
                <span>Activity</span>
              </Button>
              
              <Button
                className="bg-white text-indigo-700 hover:bg-white/90"
              >
                <Zap size={18} className="mr-2" />
                <span>Quick Actions</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 md:col-span-2 p-0 overflow-hidden border shadow-sm">
            <div className="p-6 border-b bg-card">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">KPI Dashboard</h3>
                <Tabs defaultValue={activePeriod} onValueChange={setActivePeriod} className="w-[300px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {renderKpiCard("Customer Satisfaction", kpiData.customerSatisfaction, <Users size={18} className="text-blue-600" />)}
                {renderKpiCard("Sales Pipeline", kpiData.salesPipeline, <DollarSign size={18} className="text-green-600" />)}
                {renderKpiCard("Active Projects", kpiData.activeProjects, <Briefcase size={18} className="text-purple-600" />)}
                {renderKpiCard("Task Completion", kpiData.taskCompletion, <CheckCircle size={18} className="text-emerald-600" />)}
                {renderKpiCard("Lead Conversion", kpiData.leadConversion, <Target size={18} className="text-amber-600" />)}
                {renderKpiCard("Avg. Resolution Time", kpiData.averageResolutionTime, <Clock size={18} className="text-rose-600" />)}
              </div>
            </div>
          </Card>
          
          <Card className="border shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-card">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
            </div>
            <div className="divide-y">
              {recentActivities.map((activity, i) => (
                <div key={i} className="p-4 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{activity.description}</p>
                    <p className="text-muted-foreground text-xs mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 md:col-span-2 p-0 overflow-hidden border shadow-sm">
            <div className="p-6 border-b bg-card">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Tasks</h3>
                <Button variant="outline" size="sm">
                  <PlusCircle size={16} className="mr-2" />
                  New Task
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="divide-y">
                {activeTasks.map((task, i) => (
                  <div key={i} className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-50 transition-colors rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          task.priority === "High" ? "bg-red-500" : 
                          task.priority === "Medium" ? "bg-yellow-500" : "bg-blue-500"
                        }`}></div>
                        <p className="font-medium">{task.title}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <CalendarClock size={12} />
                          Due: {task.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {task.assignee}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        task.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {task.status}
                      </span>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Clock size={16} />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-center">
                <Button variant="outline" size="sm">View All Tasks</Button>
              </div>
            </div>
          </Card>
          
          <Card className="border shadow-sm overflow-hidden p-0">
            <div className="p-6 border-b bg-card">
              <h3 className="font-semibold text-lg">System Status</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-border/40">
                  <p className="text-sm flex items-center gap-2">
                    <MessageSquare size={16} className="text-indigo-600" />
                    Chatbot Integration
                  </p>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                    Operational
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/40">
                  <p className="text-sm flex items-center gap-2">
                    <Briefcase size={16} className="text-purple-600" />
                    Project Management
                  </p>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                    Operational
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/40">
                  <p className="text-sm flex items-center gap-2">
                    <Mail size={16} className="text-blue-600" />
                    Marketing Automation
                  </p>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                    Operational
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/40">
                  <p className="text-sm flex items-center gap-2">
                    <Users size={16} className="text-green-600" />
                    CRM System
                  </p>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                    Operational
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm flex items-center gap-2">
                    <Bot size={16} className="text-amber-600" />
                    AI Agents
                  </p>
                  <span className="text-xs px-2 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-full">
                    Partial Outage
                  </span>
                </div>
              </div>
              <div className="pt-4 flex justify-center">
                <Button variant="outline" size="sm">View System Dashboard</Button>
              </div>
            </div>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold mt-2">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
      </div>
    </AppLayout>
  );
};

export default Index;
