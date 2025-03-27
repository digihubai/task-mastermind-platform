
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  PlusCircle, Mail, BarChart2, FileText, MessageSquare, 
  ArrowRight, Edit, Copy, Trash2, Send, Calendar, Clock,
  CheckCircle, XCircle, Target, Search, Globe
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Campaign {
  id: string;
  name: string;
  type: "email" | "social" | "content" | "landing";
  status: "draft" | "scheduled" | "active" | "completed" | "paused";
  audience: string;
  scheduled: string | null;
  metrics: {
    sent?: number;
    opened?: number;
    clicked?: number;
    converted?: number;
    impressions?: number;
    engagement?: number;
    reach?: number;
    visitors?: number;
    bounceRate?: number;
  };
}

const MarketingPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  
  const mockCampaigns: Campaign[] = [
    {
      id: "c1",
      name: "Fall Product Launch",
      type: "email",
      status: "active",
      audience: "All customers",
      scheduled: "2023-11-15",
      metrics: {
        sent: 2450,
        opened: 1180,
        clicked: 356,
        converted: 28
      }
    },
    {
      id: "c2",
      name: "Cyber Monday Promotion",
      type: "email",
      status: "scheduled",
      audience: "Previous customers",
      scheduled: "2023-11-27",
      metrics: {}
    },
    {
      id: "c3",
      name: "Social Media Awareness",
      type: "social",
      status: "active",
      audience: "Followers",
      scheduled: "2023-11-10",
      metrics: {
        impressions: 5470,
        engagement: 432,
        reach: 3240
      }
    },
    {
      id: "c4",
      name: "Content Marketing - Industry Trends",
      type: "content",
      status: "completed",
      audience: "Blog subscribers",
      scheduled: "2023-10-25",
      metrics: {
        visitors: 1240,
        engagement: 320,
        bounceRate: 35
      }
    },
    {
      id: "c5",
      name: "Black Friday Landing Page",
      type: "landing",
      status: "draft",
      audience: "All traffic",
      scheduled: null,
      metrics: {}
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800";
      case "scheduled":
        return "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "active":
        return "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800";
      case "completed":
        return "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "paused":
        return "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800";
      default:
        return "bg-secondary text-foreground";
    }
  };
  
  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail size={18} />;
      case "social":
        return <MessageSquare size={18} />;
      case "content":
        return <FileText size={18} />;
      case "landing":
        return <Target size={18} />;
      default:
        return <BarChart2 size={18} />;
    }
  };
  
  const getCampaignTypeLabel = (type: string) => {
    switch (type) {
      case "email":
        return "Email Campaign";
      case "social":
        return "Social Media";
      case "content":
        return "Content Marketing";
      case "landing":
        return "Landing Page";
      default:
        return "Campaign";
    }
  };
  
  const handleCreateCampaign = () => {
    toast({
      title: "Create campaign",
      description: "Campaign wizard will be available soon",
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Marketing</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your marketing campaigns
            </p>
          </div>
          
          <div className="flex gap-2">
            <Link to="/marketing/seo">
              <Button variant="outline" className="flex items-center gap-2">
                <Search size={18} />
                <span>SEO Tools</span>
              </Button>
            </Link>
            
            <Button
              onClick={handleCreateCampaign}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              <span>Create Campaign</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="campaigns" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="campaigns" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Campaigns</p>
                      <h3 className="text-3xl font-semibold mt-1">{mockCampaigns.length}</h3>
                      <p className="text-xs text-green-500 mt-2">
                        +2 from last month
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <Target size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Active Campaigns</p>
                      <h3 className="text-3xl font-semibold mt-1">
                        {mockCampaigns.filter(c => c.status === "active").length}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        {mockCampaigns.filter(c => c.status === "scheduled").length} scheduled
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <BarChart2 size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Audience</p>
                      <h3 className="text-3xl font-semibold mt-1">12,450</h3>
                      <p className="text-xs text-green-500 mt-2">
                        +8% from last month
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h2 className="font-medium">All Campaigns</h2>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="landing">Landing Pages</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCampaigns.map(campaign => (
                    <Card key={campaign.id} className="hover-lift border border-border/40">
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 rounded-full p-2 text-primary">
                              {getCampaignTypeIcon(campaign.type)}
                            </div>
                            <div>
                              <Badge 
                                variant="outline"
                                className={getStatusColor(campaign.status)}
                              >
                                <span className="capitalize">{campaign.status}</span>
                              </Badge>
                              <h3 className="font-medium mt-1">{campaign.name}</h3>
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
                                  <circle cx="12" cy="12" r="1"></circle>
                                  <circle cx="12" cy="5" r="1"></circle>
                                  <circle cx="12" cy="19" r="1"></circle>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit size={16} />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Copy size={16} />
                                <span>Duplicate</span>
                              </DropdownMenuItem>
                              {campaign.status === "draft" && (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Send size={16} />
                                  <span>Deploy</span>
                                </DropdownMenuItem>
                              )}
                              {(campaign.status === "active" || campaign.status === "scheduled") && (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <XCircle size={16} />
                                  <span>Pause</span>
                                </DropdownMenuItem>
                              )}
                              {campaign.status === "paused" && (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <CheckCircle size={16} />
                                  <span>Resume</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash2 size={16} />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="mt-4 text-sm">
                          <p className="text-muted-foreground">Type: {getCampaignTypeLabel(campaign.type)}</p>
                          <p className="mt-1 text-muted-foreground">Audience: {campaign.audience}</p>
                        </div>
                        
                        {campaign.scheduled && (
                          <div className="mt-3 flex items-center gap-2 text-sm">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {campaign.status === "scheduled" ? "Scheduled for:" : "Started on:"}
                            </span>
                            <span>{new Date(campaign.scheduled).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        {campaign.status === "active" && campaign.type === "email" && (
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Delivery</span>
                              <span>{Math.round((campaign.metrics.opened || 0) / (campaign.metrics.sent || 1) * 100)}%</span>
                            </div>
                            <Progress value={(campaign.metrics.opened || 0) / (campaign.metrics.sent || 1) * 100} className="h-1" />
                            
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <div className="bg-secondary/50 p-2 rounded-md text-center">
                                <p className="text-xs text-muted-foreground">Opens</p>
                                <p className="text-sm font-medium">{campaign.metrics.opened || 0}</p>
                              </div>
                              <div className="bg-secondary/50 p-2 rounded-md text-center">
                                <p className="text-xs text-muted-foreground">Clicks</p>
                                <p className="text-sm font-medium">{campaign.metrics.clicked || 0}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {campaign.status === "active" && campaign.type === "social" && (
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Engagement</span>
                              <span>{Math.round((campaign.metrics.engagement || 0) / (campaign.metrics.impressions || 1) * 100)}%</span>
                            </div>
                            <Progress value={(campaign.metrics.engagement || 0) / (campaign.metrics.impressions || 1) * 100} className="h-1" />
                            
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <div className="bg-secondary/50 p-2 rounded-md text-center">
                                <p className="text-xs text-muted-foreground">Impressions</p>
                                <p className="text-sm font-medium">{campaign.metrics.impressions || 0}</p>
                              </div>
                              <div className="bg-secondary/50 p-2 rounded-md text-center">
                                <p className="text-xs text-muted-foreground">Reach</p>
                                <p className="text-sm font-medium">{campaign.metrics.reach || 0}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center justify-center gap-1"
                            onClick={() => {
                              toast({
                                title: "View details",
                                description: `Viewing details for ${campaign.name}`,
                              });
                            }}
                          >
                            <span>View details</span>
                            <ArrowRight size={14} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  <Card 
                    className="hover-lift border border-dashed border-border flex items-center justify-center cursor-pointer h-full"
                    onClick={handleCreateCampaign}
                  >
                    <div className="p-6 text-center">
                      <div className="bg-secondary rounded-full p-3 text-primary mx-auto">
                        <PlusCircle size={24} />
                      </div>
                      <h3 className="font-medium mt-4">Create New Campaign</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Start a new marketing campaign
                      </p>
                    </div>
                  </Card>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="automation" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Marketing Automation</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="hover-lift border border-border/40">
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary/10 rounded-full p-3 text-primary">
                              <Clock size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium">Welcome Series</h3>
                              <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800 mt-1">
                                Active
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            3-part email series for new subscribers
                          </p>
                          
                          <div className="bg-secondary/50 p-3 rounded-md text-sm mb-3">
                            <div className="flex justify-between mb-1">
                              <span>Subscribers</span>
                              <span className="font-medium">254</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Completion Rate</span>
                              <span className="font-medium">78%</span>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center justify-center gap-1"
                          >
                            <span>Edit workflow</span>
                            <ArrowRight size={14} />
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="hover-lift border border-border/40">
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary/10 rounded-full p-3 text-primary">
                              <Clock size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium">Abandoned Cart Recovery</h3>
                              <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800 mt-1">
                                Active
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            Follow-up emails for abandoned shopping carts
                          </p>
                          
                          <div className="bg-secondary/50 p-3 rounded-md text-sm mb-3">
                            <div className="flex justify-between mb-1">
                              <span>Triggered</span>
                              <span className="font-medium">78</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Recovery Rate</span>
                              <span className="font-medium">23%</span>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center justify-center gap-1"
                          >
                            <span>Edit workflow</span>
                            <ArrowRight size={14} />
                          </Button>
                        </div>
                      </Card>
                      
                      <Card className="hover-lift border border-border/40">
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary/10 rounded-full p-3 text-primary">
                              <Clock size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium">Re-engagement Campaign</h3>
                              <Badge variant="outline" className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800 mt-1">
                                Paused
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            Win back inactive customers and subscribers
                          </p>
                          
                          <div className="bg-secondary/50 p-3 rounded-md text-sm mb-3">
                            <div className="flex justify-between mb-1">
                              <span>Eligible Contacts</span>
                              <span className="font-medium">356</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Re-engagement Rate</span>
                              <span className="font-medium">12%</span>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center justify-center gap-1"
                          >
                            <span>Edit workflow</span>
                            <ArrowRight size={14} />
                          </Button>
                        </div>
                      </Card>
                      
                      <Card 
                        className="hover-lift border border-dashed border-border flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          toast({
                            title: "Create automation",
                            description: "Automation builder will be available soon",
                          });
                        }}
                      >
                        <div className="p-6 text-center">
                          <div className="bg-secondary rounded-full p-3 text-primary mx-auto">
                            <PlusCircle size={24} />
                          </div>
                          <h3 className="font-medium mt-4">Create New Automation</h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            Set up automated marketing workflows
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Marketing Analytics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Subscribers</p>
                      <p className="text-2xl font-bold mt-1">12,450</p>
                      <div className="text-xs text-green-500 mt-1 flex items-center gap-1">
                        <ArrowRight className="rotate-45" size={12} />
                        <span>+8.2% from last month</span>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Avg. Open Rate</p>
                      <p className="text-2xl font-bold mt-1">24.8%</p>
                      <div className="text-xs text-green-500 mt-1 flex items-center gap-1">
                        <ArrowRight className="rotate-45" size={12} />
                        <span>+2.1% from last month</span>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold mt-1">3.2%</p>
                      <div className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <ArrowRight className="rotate-[135deg]" size={12} />
                        <span>-0.5% from last month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Campaign Performance</h3>
                    <Select defaultValue="30days">
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                        <SelectItem value="year">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5 bg-secondary/50 p-3 text-sm font-medium border-b border-border">
                      <div>Campaign</div>
                      <div className="text-center">Sent</div>
                      <div className="text-center">Opens</div>
                      <div className="text-center">Clicks</div>
                      <div className="text-center">Conversions</div>
                    </div>
                    
                    <div className="divide-y divide-border">
                      {mockCampaigns
                        .filter(c => c.type === "email" && c.status !== "draft" && c.status !== "scheduled")
                        .map(campaign => (
                          <div key={campaign.id} className="grid grid-cols-5 p-3 text-sm items-center">
                            <div className="truncate">{campaign.name}</div>
                            <div className="text-center">{campaign.metrics.sent || 0}</div>
                            <div className="text-center">
                              {campaign.metrics.opened || 0}
                              <span className="text-xs text-muted-foreground ml-1">
                                ({Math.round((campaign.metrics.opened || 0) / (campaign.metrics.sent || 1) * 100)}%)
                              </span>
                            </div>
                            <div className="text-center">
                              {campaign.metrics.clicked || 0}
                              <span className="text-xs text-muted-foreground ml-1">
                                ({Math.round((campaign.metrics.clicked || 0) / (campaign.metrics.opened || 1) * 100)}%)
                              </span>
                            </div>
                            <div className="text-center">
                              {campaign.metrics.converted || 0}
                              <span className="text-xs text-muted-foreground ml-1">
                                ({Math.round((campaign.metrics.converted || 0) / (campaign.metrics.clicked || 1) * 100)}%)
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText size={18} />
                      <span>Generate Detailed Report</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MarketingPage;
