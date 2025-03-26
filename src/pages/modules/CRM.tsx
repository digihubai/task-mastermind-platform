
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Users, PlusCircle, ChevronRight, Phone, Mail, Calendar,
  BarChart2, DollarSign, CheckCircle, MessageSquare
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/Badge";

const CRM = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contacts");
  
  const mockContacts = [
    {
      id: 1,
      name: "John Smith",
      company: "Acme Corp",
      email: "john.smith@acmecorp.com",
      phone: "+1 (555) 123-4567",
      status: "customer",
      lastContact: "2023-11-24",
      value: 12500,
      notes: "Long-term client, interested in expanding services"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "TechStart Inc",
      email: "sarah.j@techstart.io",
      phone: "+1 (555) 987-6543",
      status: "lead",
      lastContact: "2023-11-27",
      value: 5000,
      notes: "Requesting proposal for new website"
    },
    {
      id: 3,
      name: "Michael Brown",
      company: "Global Retail",
      email: "m.brown@globalretail.com",
      phone: "+1 (555) 456-7890",
      status: "opportunity",
      lastContact: "2023-11-20",
      value: 20000,
      notes: "In negotiations for annual contract"
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "Innovate Solutions",
      email: "emily@innovatesol.com",
      phone: "+1 (555) 234-5678",
      status: "customer",
      lastContact: "2023-11-15",
      value: 8000,
      notes: "Renewal coming up in January"
    }
  ];
  
  const mockDeals = [
    {
      id: 1,
      title: "Annual Service Contract",
      company: "Acme Corp",
      contact: "John Smith",
      stage: "proposal",
      value: 12500,
      closeDate: "2023-12-15",
      probability: 75
    },
    {
      id: 2,
      title: "Website Redesign",
      company: "TechStart Inc",
      contact: "Sarah Johnson",
      stage: "discovery",
      value: 5000,
      closeDate: "2024-01-10",
      probability: 50
    },
    {
      id: 3,
      title: "Enterprise Package",
      company: "Global Retail",
      contact: "Michael Brown",
      stage: "negotiation",
      value: 20000,
      closeDate: "2023-12-05",
      probability: 90
    },
    {
      id: 4,
      title: "Support Renewal",
      company: "Innovate Solutions",
      contact: "Emily Davis",
      stage: "closing",
      value: 8000,
      closeDate: "2024-01-01",
      probability: 95
    }
  ];
  
  const getStatusBadge = (status) => {
    const statusMap = {
      "lead": { variant: "outline", className: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800", label: "Lead" },
      "opportunity": { variant: "outline", className: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800", label: "Opportunity" },
      "customer": { variant: "outline", className: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800", label: "Customer" },
      "discovery": { variant: "outline", className: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800", label: "Discovery" },
      "proposal": { variant: "outline", className: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800", label: "Proposal" },
      "negotiation": { variant: "outline", className: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800", label: "Negotiation" },
      "closing": { variant: "outline", className: "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400 border-teal-200 dark:border-teal-800", label: "Closing" }
    };
    
    const config = statusMap[status] || statusMap["lead"];
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };
  
  const handleNewContact = () => {
    toast({
      title: "Create new contact",
      description: "Contact creation form will be available soon",
    });
  };
  
  const handleNewDeal = () => {
    toast({
      title: "Create new deal",
      description: "Deal creation form will be available soon",
    });
  };
  
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">CRM</h1>
            <p className="text-muted-foreground mt-1">
              Manage your contacts, deals, and customer relationships
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "CRM analytics",
                  description: "Analytics dashboard will be available soon",
                });
              }}
              className="flex items-center gap-2"
            >
              <BarChart2 size={18} />
              <span>Analytics</span>
            </Button>
            
            <Button
              onClick={handleNewContact}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              <span>New Contact</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="contacts" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="contacts" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Contacts</p>
                      <h3 className="text-3xl font-semibold mt-1">{mockContacts.length}</h3>
                      <p className="text-xs text-green-500 mt-2">
                        +2 from last month
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Customers</p>
                      <h3 className="text-3xl font-semibold mt-1">
                        {mockContacts.filter(c => c.status === "customer").length}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        Out of {mockContacts.length} total
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Value</p>
                      <h3 className="text-3xl font-semibold mt-1">
                        {currencyFormatter.format(mockContacts.reduce((sum, contact) => sum + contact.value, 0))}
                      </h3>
                      <p className="text-xs text-green-500 mt-2">
                        +15% from last month
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="lead">Leads</SelectItem>
                        <SelectItem value="opportunity">Opportunities</SelectItem>
                        <SelectItem value="customer">Customers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                    <Button onClick={handleNewContact} className="flex items-center gap-2" size="sm">
                      <PlusCircle size={16} />
                      <span>Add Contact</span>
                    </Button>
                  </div>
                </div>
                
                <div className="p-0">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left">
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Company</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockContacts.map(contact => (
                        <tr key={contact.id} className="border-t border-border">
                          <td className="py-3 px-4">{contact.name}</td>
                          <td className="py-3 px-4">{contact.company}</td>
                          <td className="py-3 px-4">
                            <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                              {contact.email}
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                              {contact.phone}
                            </a>
                          </td>
                          <td className="py-3 px-4">{getStatusBadge(contact.status)}</td>
                          <td className="py-3 px-4">{currencyFormatter.format(contact.value)}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Mail size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Phone size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="deals" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Pipeline Value</p>
                      <h3 className="text-3xl font-semibold mt-1">
                        {currencyFormatter.format(mockDeals.reduce((sum, deal) => sum + deal.value, 0))}
                      </h3>
                      <p className="text-xs text-green-500 mt-2">
                        +8% from last month
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Closing Soon</p>
                      <h3 className="text-3xl font-semibold mt-1">
                        {mockDeals.filter(d => new Date(d.closeDate) < new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)).length}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        Closing in next 14 days
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 border border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 text-primary">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Weighted Revenue</p>
                      <h3 className="text-3xl font-semibold mt-1">
                        {currencyFormatter.format(mockDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0))}
                      </h3>
                      <p className="text-xs text-green-500 mt-2">
                        Based on probability
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        <SelectItem value="discovery">Discovery</SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="negotiation">Negotiation</SelectItem>
                        <SelectItem value="closing">Closing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                    <Button onClick={handleNewDeal} className="flex items-center gap-2" size="sm">
                      <PlusCircle size={16} />
                      <span>Add Deal</span>
                    </Button>
                  </div>
                </div>
                
                <div className="p-0">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left">
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Company</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Stage</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Close Date</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Probability</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDeals.map(deal => (
                        <tr key={deal.id} className="border-t border-border">
                          <td className="py-3 px-4">{deal.title}</td>
                          <td className="py-3 px-4">{deal.company}</td>
                          <td className="py-3 px-4">{deal.contact}</td>
                          <td className="py-3 px-4">{getStatusBadge(deal.stage)}</td>
                          <td className="py-3 px-4">{currencyFormatter.format(deal.value)}</td>
                          <td className="py-3 px-4">{new Date(deal.closeDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-full max-w-24 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    deal.probability >= 70 
                                      ? "bg-green-500" 
                                      : deal.probability >= 40 
                                      ? "bg-yellow-500" 
                                      : "bg-red-500"
                                  }`}
                                  style={{ width: `${deal.probability}%` }}
                                ></div>
                              </div>
                              <span>{deal.probability}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="activities" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Recent Activities</h3>
                  <p className="text-sm text-muted-foreground">Track all activities with your contacts</p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span>Call</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>Email</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Meeting</span>
                  </Button>
                  <Button className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    <span>Activity</span>
                  </Button>
                </div>
              </div>
              
              <Card className="border border-border/40">
                <ScrollArea className="h-[500px]">
                  <div className="p-4 space-y-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="flex gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          i % 3 === 0 
                            ? "bg-blue-100 text-blue-600" 
                            : i % 3 === 1 
                            ? "bg-green-100 text-green-600" 
                            : "bg-purple-100 text-purple-600"
                        }`}>
                          {i % 3 === 0 
                            ? <Phone size={18} /> 
                            : i % 3 === 1 
                            ? <Mail size={18} /> 
                            : <Calendar size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">
                              {i % 3 === 0 
                                ? "Call with " 
                                : i % 3 === 1 
                                ? "Email to " 
                                : "Meeting with "}
                              {mockContacts[i % mockContacts.length].name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(Date.now() - (i * 86400000 / 2)).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {i % 3 === 0 
                              ? "Discussed project requirements and timeline. Follow-up needed." 
                              : i % 3 === 1 
                              ? "Sent proposal and pricing information. Waiting for response." 
                              : "Reviewed contract terms and negotiated final details."}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                              {mockContacts[i % mockContacts.length].company}
                            </Badge>
                            {i % 2 === 0 && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                                {mockDeals[i % mockDeals.length].title}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>
            
            <TabsContent value="emails" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Email Campaigns</h3>
                  <p className="text-sm text-muted-foreground">Manage your email marketing campaigns</p>
                </div>
                
                <Button className="flex items-center gap-2">
                  <PlusCircle size={16} />
                  <span>New Campaign</span>
                </Button>
              </div>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Recent Campaigns</h3>
                </div>
                
                <div className="p-0">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left">
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Campaign Name</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Recipients</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Open Rate</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Click Rate</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Sent Date</th>
                        <th className="py-3 px-4 text-sm font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="py-3 px-4">
                            {["Monthly Newsletter", "Product Announcement", "Special Promotion", "Follow-up Campaign", "Welcome Series"][i]}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={`${
                              i === 0 
                                ? "bg-green-50 text-green-600 border-green-200" 
                                : i === 1 
                                ? "bg-blue-50 text-blue-600 border-blue-200" 
                                : i === 2 
                                ? "bg-purple-50 text-purple-600 border-purple-200"
                                : i === 3
                                ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                                : "bg-gray-50 text-gray-600 border-gray-200"
                            }`}>
                              {["Sent", "Scheduled", "Draft", "In Progress", "Automated"][i]}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{(i + 2) * 250}</td>
                          <td className="py-3 px-4">{(25 - i * 2).toFixed(1)}%</td>
                          <td className="py-3 px-4">{(12 - i).toFixed(1)}%</td>
                          <td className="py-3 px-4">
                            {i === 0 || i === 3 || i === 4 
                              ? new Date(Date.now() - (i * 86400000 * 7)).toLocaleDateString() 
                              : i === 1 
                              ? new Date(Date.now() + 86400000 * 3).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CRM;
