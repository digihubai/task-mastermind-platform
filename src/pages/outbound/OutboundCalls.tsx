
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Phone, 
  Users, 
  List, 
  Settings, 
  Plus, 
  Play, 
  PauseCircle, 
  Download, 
  MoreHorizontal, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight,
  FileText,
  VoicemailIcon,
  CalendarClock,
  MessageSquare,
  Upload,
  RefreshCw,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OutboundCalls = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [twilioConnected, setTwilioConnected] = useState(false);
  
  const connectTwilio = () => {
    setTwilioConnected(true);
    toast({
      title: "Twilio Connected",
      description: "Your Twilio account has been successfully connected.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Outbound Calls</h1>
            <p className="text-muted-foreground mt-1">
              Manage automated outbound call campaigns
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex gap-2">
              <Download size={16} />
              <span>Export</span>
            </Button>
            
            <Button className="flex gap-2">
              <Plus size={16} />
              <span>New Campaign</span>
            </Button>
          </div>
        </div>
        
        {!twilioConnected ? (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Phone size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Connect Your Phone System</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                To start making outbound calls, connect your Twilio account or other VoIP service.
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <Button onClick={connectTwilio} className="flex gap-2">
                  <Phone size={16} />
                  <span>Connect Twilio</span>
                </Button>
                <Button variant="outline">
                  Connect Other Provider
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="contacts">Contact Lists</TabsTrigger>
                <TabsTrigger value="scripts">Call Scripts</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="campaigns" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Lead Follow-up",
                      status: "Active",
                      calls: 248,
                      completed: 183,
                      answered: 76,
                      progress: 74,
                      scheduled: "Daily at 10:00 AM"
                    },
                    {
                      name: "Customer Feedback",
                      status: "Paused",
                      calls: 120,
                      completed: 85,
                      answered: 42,
                      progress: 71,
                      scheduled: "Mon, Wed, Fri at 2:00 PM"
                    },
                    {
                      name: "Appointment Reminders",
                      status: "Scheduled",
                      calls: 0,
                      completed: 0,
                      answered: 0,
                      progress: 0,
                      scheduled: "Starting tomorrow at 9:00 AM"
                    }
                  ].map((campaign, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardHeader className="bg-muted/40 pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{campaign.name}</CardTitle>
                            <Badge 
                              variant={campaign.status === "Active" ? "default" : campaign.status === "Paused" ? "outline" : "secondary"}
                              className="mt-1"
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={18} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-2xl font-semibold">{campaign.calls}</p>
                              <p className="text-xs text-muted-foreground">Total Calls</p>
                            </div>
                            <div>
                              <p className="text-2xl font-semibold">{campaign.completed}</p>
                              <p className="text-xs text-muted-foreground">Completed</p>
                            </div>
                            <div>
                              <p className="text-2xl font-semibold">{campaign.answered}</p>
                              <p className="text-xs text-muted-foreground">Answered</p>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{campaign.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: `${campaign.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock size={14} />
                            <span>{campaign.scheduled}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            {campaign.status === "Active" ? (
                              <Button variant="outline" size="sm" className="flex-1">
                                <PauseCircle size={14} className="mr-1.5" /> Pause
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" className="flex-1">
                                <Play size={14} className="mr-1.5" /> Start
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="flex-1">
                              <Settings size={14} className="mr-1.5" /> Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Call Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {[
                        { phone: "+1 (555) 123-4567", status: "Answered", duration: "2m 14s", time: "10 minutes ago", campaign: "Lead Follow-up" },
                        { phone: "+1 (555) 234-5678", status: "No Answer", duration: "0s", time: "12 minutes ago", campaign: "Lead Follow-up" },
                        { phone: "+1 (555) 345-6789", status: "Voicemail", duration: "32s", time: "15 minutes ago", campaign: "Lead Follow-up" },
                        { phone: "+1 (555) 456-7890", status: "Answered", duration: "4m 02s", time: "20 minutes ago", campaign: "Customer Feedback" },
                        { phone: "+1 (555) 567-8901", status: "Busy", duration: "0s", time: "25 minutes ago", campaign: "Customer Feedback" }
                      ].map((call, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              <Phone size={14} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{call.phone}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{call.time}</span>
                                <span>•</span>
                                <span>{call.campaign}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <Badge 
                                variant={
                                  call.status === "Answered" ? "default" : 
                                  call.status === "Voicemail" ? "secondary" : 
                                  "outline"
                                }
                              >
                                {call.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">{call.duration}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ArrowUpRight size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contacts" className="space-y-4 mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Contact Lists</CardTitle>
                    <Button size="sm" className="flex gap-1">
                      <Plus size={14} />
                      New List
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Recent Leads", count: 124, lastUpdated: "Today", status: "Active" },
                        { name: "Current Customers", count: 532, lastUpdated: "Yesterday", status: "Active" },
                        { name: "Event Attendees", count: 89, lastUpdated: "Oct 15, 2023", status: "Inactive" }
                      ].map((list, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Users size={18} />
                            </div>
                            <div>
                              <p className="font-medium">{list.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{list.count} contacts</span>
                                <span>•</span>
                                <span>Updated {list.lastUpdated}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={list.status === "Active" ? "default" : "outline"}>
                              {list.status}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal size={18} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 border rounded-md border-dashed flex flex-col items-center justify-center text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="font-medium mb-1">Import Contacts</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Upload a CSV file or import from CRM
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Upload CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          Connect CRM
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="scripts" className="space-y-4 mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Call Scripts</CardTitle>
                    <Button size="sm" className="flex gap-1">
                      <Plus size={14} />
                      New Script
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { 
                          name: "Lead Qualification", 
                          description: "Script to qualify new leads and schedule a follow-up call", 
                          lastEdited: "2 days ago",
                          type: "Interactive"
                        },
                        { 
                          name: "Product Introduction", 
                          description: "Introduction to our product features and benefits", 
                          lastEdited: "1 week ago",
                          type: "Text-to-Speech"
                        },
                        { 
                          name: "Appointment Reminder", 
                          description: "Reminder for upcoming appointments with confirmation", 
                          lastEdited: "2 weeks ago",
                          type: "Interactive"
                        }
                      ].map((script, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="font-medium">{script.name}</p>
                              <p className="text-sm text-muted-foreground">{script.description}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <span>Edited {script.lastEdited}</span>
                                <span>•</span>
                                <span>{script.type}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={18} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Script Templates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { name: "Lead Qualification", icon: <Users size={18} /> },
                          { name: "Appointment Setting", icon: <CalendarClock size={18} /> },
                          { name: "Feedback Collection", icon: <MessageSquare size={18} /> },
                          { name: "Event Invitation", icon: <FileText size={18} /> },
                          { name: "Voicemail Script", icon: <VoicemailIcon size={18} /> },
                          { name: "Custom Script", icon: <Plus size={18} /> }
                        ].map((template, i) => (
                          <div key={i} className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              {template.icon}
                            </div>
                            <span className="text-sm font-medium">{template.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Total Calls</p>
                        <p className="text-3xl font-semibold mt-1">1,248</p>
                        <div className="flex items-center text-green-600 text-sm mt-2">
                          <ArrowUp size={14} className="mr-1" />
                          <span>12% from last week</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Answer Rate</p>
                        <p className="text-3xl font-semibold mt-1">32%</p>
                        <div className="flex items-center text-green-600 text-sm mt-2">
                          <ArrowUp size={14} className="mr-1" />
                          <span>5% from last week</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Avg. Call Duration</p>
                        <p className="text-3xl font-semibold mt-1">2m 48s</p>
                        <div className="flex items-center text-green-600 text-sm mt-2">
                          <ArrowUp size={14} className="mr-1" />
                          <span>18s from last week</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <p className="text-3xl font-semibold mt-1">14%</p>
                        <div className="flex items-center text-red-600 text-sm mt-2">
                          <ArrowDown size={14} className="mr-1" />
                          <span>2% from last week</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Call Outcomes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-500" />
                            <span className="text-sm">Answered</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">398</span>
                            <span className="text-sm text-muted-foreground">32%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: '32%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <VoicemailIcon size={14} className="text-blue-500" />
                            <span className="text-sm">Voicemail</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">274</span>
                            <span className="text-sm text-muted-foreground">22%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-blue-500 rounded-full h-2" style={{ width: '22%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <XCircle size={14} className="text-amber-500" />
                            <span className="text-sm">No Answer</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">461</span>
                            <span className="text-sm text-muted-foreground">37%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-amber-500 rounded-full h-2" style={{ width: '37%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <XCircle size={14} className="text-red-500" />
                            <span className="text-sm">Busy/Failed</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">115</span>
                            <span className="text-sm text-muted-foreground">9%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-red-500 rounded-full h-2" style={{ width: '9%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Best Calling Times</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">10:00 AM - 12:00 PM</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">43% Answer Rate</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: '43%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">2:00 PM - 4:00 PM</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">38% Answer Rate</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: '38%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">4:00 PM - 6:00 PM</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">35% Answer Rate</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: '35%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">8:00 AM - 10:00 AM</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">28% Answer Rate</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: '28%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">6:00 PM - 8:00 PM</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">18% Answer Rate</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: '18%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { 
                          name: "Lead Follow-up", 
                          calls: 248, 
                          answered: 92, 
                          answerRate: 37, 
                          conversions: 28, 
                          conversionRate: 11,
                          trend: "up" 
                        },
                        { 
                          name: "Customer Feedback", 
                          calls: 120, 
                          answered: 45, 
                          answerRate: 38, 
                          conversions: 22, 
                          conversionRate: 18,
                          trend: "up" 
                        },
                        { 
                          name: "Product Announcement", 
                          calls: 215, 
                          answered: 58, 
                          answerRate: 27, 
                          conversions: 12, 
                          conversionRate: 6,
                          trend: "down" 
                        }
                      ].map((campaign, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-md">
                          <div>
                            <h4 className="font-medium">{campaign.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <span>{campaign.calls} calls</span>
                              <span>•</span>
                              <span>{campaign.answered} answered</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Answer Rate</p>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{campaign.answerRate}%</span>
                                <div className={`flex items-center text-xs ${campaign.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                  {campaign.trend === 'up' ? (
                                    <ArrowUp size={12} className="mr-0.5" />
                                  ) : (
                                    <ArrowDown size={12} className="mr-0.5" />
                                  )}
                                  <span>3%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground">Conversion Rate</p>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{campaign.conversionRate}%</span>
                                <div className={`flex items-center text-xs ${campaign.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                  {campaign.trend === 'up' ? (
                                    <ArrowUp size={12} className="mr-0.5" />
                                  ) : (
                                    <ArrowDown size={12} className="mr-0.5" />
                                  )}
                                  <span>2%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Industry Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  industry: "Healthcare",
                  templates: [
                    "Appointment Reminders",
                    "Medication Refill Alerts",
                    "Follow-up Consultations"
                  ],
                  icon: <CheckCircle2 size={18} className="text-blue-500" />
                },
                {
                  industry: "Real Estate",
                  templates: [
                    "Property Viewing Confirmation",
                    "New Listing Alerts",
                    "Client Follow-up Call"
                  ],
                  icon: <CheckCircle2 size={18} className="text-green-500" />
                },
                {
                  industry: "Financial Services",
                  templates: [
                    "Investment Opportunity Call",
                    "Account Review Scheduler",
                    "Service Renewal Notice"
                  ],
                  icon: <CheckCircle2 size={18} className="text-amber-500" />
                },
                {
                  industry: "Education",
                  templates: [
                    "Enrollment Follow-up",
                    "Course Registration Reminder",
                    "Alumni Engagement"
                  ],
                  icon: <CheckCircle2 size={18} className="text-indigo-500" />
                },
                {
                  industry: "Retail",
                  templates: [
                    "Order Status Updates",
                    "Special Promotion Call",
                    "Customer Satisfaction Survey"
                  ],
                  icon: <CheckCircle2 size={18} className="text-rose-500" />
                },
                {
                  industry: "Professional Services",
                  templates: [
                    "Consultation Scheduler",
                    "Service Follow-up",
                    "Client Check-in Call"
                  ],
                  icon: <CheckCircle2 size={18} className="text-violet-500" />
                }
              ].map((item, i) => (
                <Card key={i} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {item.icon}
                      <h3 className="font-medium">{item.industry}</h3>
                    </div>
                    <ul className="space-y-2">
                      {item.templates.map((template, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          {template}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="w-full mt-4 flex gap-1.5">
                      <RefreshCw size={14} />
                      Use Templates
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default OutboundCalls;
