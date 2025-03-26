
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  PlusCircle, 
  Users, 
  User, 
  Building, 
  Mail, 
  Phone, 
  Calendar,
  FileText,
  MessageSquare,
  Clock,
  PenLine,
  Trash2,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
  ChevronDown
} from "lucide-react";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockContacts = [
  {
    id: "c1",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    company: "Acme Corporation",
    phone: "+1 (555) 123-4567",
    status: "lead",
    lastContact: "2023-04-12T10:30:00Z",
    avatar: null
  },
  {
    id: "c2",
    name: "Sarah Johnson",
    email: "sarah.j@techsolutions.com",
    company: "Tech Solutions Inc.",
    phone: "+1 (555) 987-6543",
    status: "customer",
    lastContact: "2023-04-15T14:45:00Z",
    avatar: null
  },
  {
    id: "c3",
    name: "Michael Wong",
    email: "m.wong@globalretail.com",
    company: "Global Retail",
    phone: "+1 (555) 456-7890",
    status: "prospect",
    lastContact: "2023-04-10T09:15:00Z",
    avatar: null
  },
  {
    id: "c4",
    name: "Emma Thompson",
    email: "emma.t@innovatesol.com",
    company: "Innovate Solutions",
    phone: "+1 (555) 321-6547",
    status: "customer",
    lastContact: "2023-04-14T11:20:00Z",
    avatar: null
  },
  {
    id: "c5",
    name: "Carlos Mendez",
    email: "carlos@startupxyz.com",
    company: "Startup XYZ",
    status: "lead",
    phone: "+1 (555) 789-0123",
    lastContact: "2023-04-11T16:30:00Z",
    avatar: null
  }
];

const mockDeals = [
  {
    id: "d1",
    name: "Enterprise Software Package",
    company: "Acme Corporation",
    value: 75000,
    stage: "proposal",
    probability: 60,
    expectedClose: "2023-06-15",
    owner: "Sarah Johnson"
  },
  {
    id: "d2",
    name: "Website Redesign",
    company: "Tech Solutions Inc.",
    value: 25000,
    stage: "discovery",
    probability: 30,
    expectedClose: "2023-07-20",
    owner: "Michael Wong"
  },
  {
    id: "d3",
    name: "Annual Support Contract",
    company: "Global Retail",
    value: 50000,
    stage: "negotiation",
    probability: 80,
    expectedClose: "2023-05-30",
    owner: "John Smith"
  },
  {
    id: "d4",
    name: "Mobile App Development",
    company: "Innovate Solutions",
    value: 120000,
    stage: "closed-won",
    probability: 100,
    expectedClose: "2023-04-10",
    owner: "Emma Thompson"
  },
  {
    id: "d5",
    name: "AI Chatbot Integration",
    company: "Startup XYZ",
    value: 30000,
    stage: "proposal",
    probability: 50,
    expectedClose: "2023-06-25",
    owner: "Carlos Mendez"
  }
];

const mockActivities = [
  {
    id: "a1",
    type: "call",
    contact: "John Smith",
    company: "Acme Corporation",
    description: "Discussed project requirements and timeline",
    date: "2023-04-15T10:30:00Z",
    user: "Sarah Johnson"
  },
  {
    id: "a2",
    type: "email",
    contact: "Sarah Johnson",
    company: "Tech Solutions Inc.",
    description: "Sent proposal for website redesign",
    date: "2023-04-14T15:45:00Z",
    user: "Michael Wong"
  },
  {
    id: "a3",
    type: "meeting",
    contact: "Michael Wong",
    company: "Global Retail",
    description: "Product demo and feature showcase",
    date: "2023-04-13T11:00:00Z",
    user: "Emma Thompson"
  },
  {
    id: "a4",
    type: "note",
    contact: "Emma Thompson",
    company: "Innovate Solutions",
    description: "Customer requested additional security features",
    date: "2023-04-12T14:20:00Z",
    user: "John Smith"
  },
  {
    id: "a5",
    type: "task",
    contact: "Carlos Mendez",
    company: "Startup XYZ",
    description: "Follow-up on chatbot requirements",
    date: "2023-04-16T09:00:00Z",
    user: "Carlos Mendez",
    status: "pending"
  }
];

const CRM = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      lead: { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", label: "Lead" },
      prospect: { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", label: "Prospect" },
      customer: { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", label: "Customer" },
      churned: { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", label: "Churned" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.lead;
    
    return (
      <span className={`text-xs px-2.5 py-0.5 rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };
  
  const getStageBadge = (stage: string) => {
    const stageConfig = {
      "discovery": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", label: "Discovery" },
      "proposal": { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", label: "Proposal" },
      "negotiation": { bg: "bg-amber-100 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", label: "Negotiation" },
      "closed-won": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", label: "Closed (Won)" },
      "closed-lost": { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", label: "Closed (Lost)" }
    };
    
    const config = stageConfig[stage as keyof typeof stageConfig] || stageConfig.discovery;
    
    return (
      <span className={`text-xs px-2.5 py-0.5 rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone size={18} />;
      case "email": return <Mail size={18} />;
      case "meeting": return <Calendar size={18} />;
      case "note": return <FileText size={18} />;
      case "task": return <Clock size={18} />;
      default: return <MessageSquare size={18} />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  const handleAddContact = () => {
    toast({
      title: "Create contact",
      description: "Contact creation form will be available soon",
    });
  };
  
  const handleAddDeal = () => {
    toast({
      title: "Create deal",
      description: "Deal creation form will be available soon",
    });
  };
  
  const handleAddActivity = () => {
    toast({
      title: "Log activity",
      description: "Activity logging form will be available soon",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">CRM</h1>
            <p className="text-muted-foreground mt-1">
              Manage your contacts, deals, and customer relationships
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download size={18} />
              <span>Export</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload size={18} />
              <span>Import</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="contacts" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder={`Search ${activeTab}...`} 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter size={18} />
                <span>Filter</span>
                <ChevronDown size={14} />
              </Button>
              
              {activeTab === "contacts" && (
                <Button
                  onClick={handleAddContact}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  <span>Add Contact</span>
                </Button>
              )}
              
              {activeTab === "deals" && (
                <Button
                  onClick={handleAddDeal}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  <span>Add Deal</span>
                </Button>
              )}
              
              {activeTab === "activities" && (
                <Button
                  onClick={handleAddActivity}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  <span>Log Activity</span>
                </Button>
              )}
            </div>
          </div>
          
          <TabsContent value="contacts" className="mt-6">
            <Card className="border border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Contact</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockContacts.map((contact) => (
                      <tr key={contact.id} className="border-b hover:bg-muted/40">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={contact.avatar || undefined} />
                              <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>{contact.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{contact.company}</td>
                        <td className="py-3 px-4">{contact.email}</td>
                        <td className="py-3 px-4">{contact.phone}</td>
                        <td className="py-3 px-4">{getStatusBadge(contact.status)}</td>
                        <td className="py-3 px-4">{formatDate(contact.lastContact)}</td>
                        <td className="py-3 px-4 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center">
                                <PenLine size={16} className="mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <Mail size={16} className="mr-2" /> Email
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <Phone size={16} className="mr-2" /> Call
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <Calendar size={16} className="mr-2" /> Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center text-red-500">
                                <Trash2 size={16} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="deals" className="mt-6">
            <Card className="border border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Deal Name</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Value</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stage</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Probability</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Expected Close</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Owner</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDeals.map((deal) => (
                      <tr key={deal.id} className="border-b hover:bg-muted/40">
                        <td className="py-3 px-4">{deal.name}</td>
                        <td className="py-3 px-4">{deal.company}</td>
                        <td className="py-3 px-4 font-medium">{formatCurrency(deal.value)}</td>
                        <td className="py-3 px-4">{getStageBadge(deal.stage)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-secondary rounded-full mr-2">
                              <div 
                                className={`h-full rounded-full ${deal.probability >= 70 ? "bg-green-500" : deal.probability >= 40 ? "bg-amber-500" : "bg-red-500"}`}
                                style={{ width: `${deal.probability}%` }}
                              ></div>
                            </div>
                            <span>{deal.probability}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{formatDate(deal.expectedClose)}</td>
                        <td className="py-3 px-4">{deal.owner}</td>
                        <td className="py-3 px-4 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center">
                                <PenLine size={16} className="mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <Calendar size={16} className="mr-2" /> Update Stage
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center text-red-500">
                                <Trash2 size={16} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="activities" className="mt-6">
            <Card className="border border-border/40">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockActivities.map((activity) => (
                      <tr key={activity.id} className="border-b hover:bg-muted/40">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              {getActivityIcon(activity.type)}
                            </div>
                            <span className="capitalize">{activity.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{activity.contact}</td>
                        <td className="py-3 px-4">{activity.company}</td>
                        <td className="py-3 px-4">{activity.description}</td>
                        <td className="py-3 px-4">{formatDate(activity.date)}</td>
                        <td className="py-3 px-4">{activity.user}</td>
                        <td className="py-3 px-4 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center">
                                <PenLine size={16} className="mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <FileText size={16} className="mr-2" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center text-red-500">
                                <Trash2 size={16} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CRM;
