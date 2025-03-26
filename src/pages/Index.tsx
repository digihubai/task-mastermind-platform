
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, Bot, MessageSquare, Users, ArrowRight, BarChart3, 
  Briefcase, Settings, FileText, PenTool, Search, FileSpreadsheet, 
  Image, RefreshCw, Globe, Mail, DollarSign, Zap,
  CheckCircle, AlertCircle, Clock, ArrowUp, ArrowDown, 
  Edit, ArrowUpRight, Target, CalendarClock
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import KpiCard from "@/components/dashboard/KpiCard";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import TaskItem from "@/components/dashboard/TaskItem";
import SystemStatus from "@/components/dashboard/SystemStatus";

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
                <KpiCard title="Customer Satisfaction" data={kpiData.customerSatisfaction} icon={<Users size={18} className="text-blue-600" />} />
                <KpiCard title="Sales Pipeline" data={kpiData.salesPipeline} icon={<DollarSign size={18} className="text-green-600" />} />
                <KpiCard title="Active Projects" data={kpiData.activeProjects} icon={<Briefcase size={18} className="text-purple-600" />} />
                <KpiCard title="Task Completion" data={kpiData.taskCompletion} icon={<CheckCircle size={18} className="text-emerald-600" />} />
                <KpiCard title="Lead Conversion" data={kpiData.leadConversion} icon={<Target size={18} className="text-amber-600" />} />
                <KpiCard title="Avg. Resolution Time" data={kpiData.averageResolutionTime} icon={<Clock size={18} className="text-rose-600" />} />
              </div>
            </div>
          </Card>
          
          <Card className="border shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-card">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
            </div>
            <div className="divide-y">
              {recentActivities.map((activity, i) => (
                <ActivityItem 
                  key={i}
                  type={activity.type}
                  title={activity.title}
                  description={activity.description}
                  time={activity.time}
                  icon={activity.icon}
                />
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
                  <TaskItem 
                    key={i}
                    title={task.title}
                    priority={task.priority as "High" | "Medium" | "Low"}
                    dueDate={task.dueDate}
                    assignee={task.assignee}
                    status={task.status}
                  />
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
              <SystemStatus />
              <div className="pt-4 flex justify-center">
                <Button variant="outline" size="sm">View System Dashboard</Button>
              </div>
            </div>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold mt-2">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {dashboardCards.map((card, index) => (
            <DashboardCard 
              key={index}
              title={card.title}
              description={card.description}
              count={card.count}
              icon={card.icon}
              link={card.link}
              color={card.color}
              percentChange={card.percentChange}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
