
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, Settings, Bot, Sparkles, Globe, 
  FileText, ArrowUp, ArrowDown, BarChart3, 
  DollarSign, Activity, ExternalLink, Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const quickActions = [
    { title: "User Management", icon: <Users className="h-5 w-5" />, path: "/admin/user-management" },
    { title: "AI Settings", icon: <Bot className="h-5 w-5" />, path: "/admin/ai-settings", highlight: true },
    { title: "General Settings", icon: <Settings className="h-5 w-5" />, path: "/admin/settings" },
    { title: "Site Health", icon: <Activity className="h-5 w-5" />, path: "/admin/site-health" },
  ];

  const stats = [
    { label: "Total Users", value: "1,284", icon: <Users className="h-5 w-5" />, change: "+12%", up: true },
    { label: "Active Subscriptions", value: "842", icon: <DollarSign className="h-5 w-5" />, change: "+5%", up: true },
    { label: "AI Requests Today", value: "3,912", icon: <Bot className="h-5 w-5" />, change: "+28%", up: true },
    { label: "Content Generated", value: "284", icon: <FileText className="h-5 w-5" />, change: "-3%", up: false },
  ];

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Manage your Digihub platform"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link to={action.path} key={index}>
                <Card className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer h-full ${action.highlight ? 'border-purple-400 dark:border-purple-500' : ''}`}>
                  <div className="flex flex-col items-start gap-2 h-full">
                    <div className={`rounded-full p-2 ${action.highlight ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-primary/10 text-primary'}`}>
                      {action.icon}
                    </div>
                    <div className="mt-auto">
                      <h3 className="font-medium">{action.title}</h3>
                      {action.highlight && <Badge className="mt-1 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">Recommended</Badge>}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div>
          <h2 className="text-lg font-medium mb-3">Platform Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {stat.icon}
                  </div>
                  <div className={`flex items-center gap-1 ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                    <span className="text-xs font-medium">{stat.change}</span>
                    {stat.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Recent Activity & Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-muted-foreground">john.doe@example.com registered an account</p>
                  <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600 dark:text-purple-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">AI Settings updated</p>
                  <p className="text-sm text-muted-foreground">API key was updated by admin</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">New subscription</p>
                  <p className="text-sm text-muted-foreground">sarah.smith@example.com upgraded to Pro plan</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">System Status</h2>
              <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">All Systems Operational</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">API Uptime</span>
                  <span className="text-sm text-green-600 dark:text-green-400">99.99%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: "99.99%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Database Load</span>
                  <span className="text-sm">42%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm">68%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" size="sm">
                  <Activity className="mr-2 h-4 w-4" />
                  View Detailed Status
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Quick Links */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 justify-start" asChild>
              <Link to="/admin/user-management">
                <Users className="h-6 w-6 mb-1" />
                <span>User Management</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 justify-start bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800" asChild>
              <Link to="/admin/ai-settings">
                <Sparkles className="h-6 w-6 mb-1" />
                <span>AI Configuration</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 justify-start" asChild>
              <Link to="/admin/frontend">
                <Globe className="h-6 w-6 mb-1" />
                <span>Frontend</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 justify-start" asChild>
              <Link to="/admin/settings">
                <Settings className="h-6 w-6 mb-1" />
                <span>Settings</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 justify-start" asChild>
              <Link to="/admin/marketplace">
                <Plus className="h-6 w-6 mb-1" />
                <span>Add Extension</span>
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
