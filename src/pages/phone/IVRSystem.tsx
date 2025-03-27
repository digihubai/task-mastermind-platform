
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  PhoneCall, 
  MessageSquare, 
  Users, 
  Settings, 
  Activity, 
  FileText, 
  Play, 
  Pause, 
  Plus, 
  Save, 
  ArrowRight,
  ArrowDown, 
  Mic, 
  Upload, 
  Headphones, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlignJustify, 
  MoreHorizontal,
  ArrowUp,
  PhoneForwarded,
  MoveRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IVRSystem = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("flowBuilder");
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
            <h1 className="text-3xl font-semibold tracking-tight">IVR System</h1>
            <p className="text-muted-foreground mt-1">
              Build and manage interactive voice response flows
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Play size={16} />
              <span>Test Call</span>
            </Button>
            
            <Button className="gap-2">
              <Plus size={16} />
              <span>New Flow</span>
            </Button>
          </div>
        </div>
        
        {!twilioConnected ? (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Phone size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Connect Your Phone System</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                To start receiving and routing calls, connect your Twilio account or other VoIP service.
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
              <TabsList className="grid grid-cols-5 w-full md:w-[600px]">
                <TabsTrigger value="flowBuilder">Flow Builder</TabsTrigger>
                <TabsTrigger value="activeFlows">Active Flows</TabsTrigger>
                <TabsTrigger value="phoneNumbers">Phone Numbers</TabsTrigger>
                <TabsTrigger value="recordings">Recordings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="flowBuilder" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Flow Components</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              <PhoneCall size={16} />
                            </div>
                            <span className="text-sm font-medium">Greeting</span>
                          </div>
                          
                          <div className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                              <AlignJustify size={16} />
                            </div>
                            <span className="text-sm font-medium">Menu Options</span>
                          </div>
                          
                          <div className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                              <Users size={16} />
                            </div>
                            <span className="text-sm font-medium">Transfer to Agent</span>
                          </div>
                          
                          <div className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                              <MessageSquare size={16} />
                            </div>
                            <span className="text-sm font-medium">Voicemail</span>
                          </div>
                          
                          <div className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                              <ArrowRight size={16} />
                            </div>
                            <span className="text-sm font-medium">Conditional Logic</span>
                          </div>
                          
                          <div className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                              <FileText size={16} />
                            </div>
                            <span className="text-sm font-medium">Collect Input</span>
                          </div>
                          
                          <div className="p-3 border rounded-md flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                              <Settings size={16} />
                            </div>
                            <span className="text-sm font-medium">Custom Action</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Flow Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="flow-name">Flow Name</Label>
                            <Input id="flow-name" defaultValue="Main Customer Support" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="business-hours">Business Hours</Label>
                            <Select defaultValue="weekdays">
                              <SelectTrigger id="business-hours">
                                <SelectValue placeholder="Select business hours" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="weekdays">Weekdays (9AM-5PM)</SelectItem>
                                <SelectItem value="extended">Extended (8AM-8PM)</SelectItem>
                                <SelectItem value="247">24/7</SelectItem>
                                <SelectItem value="custom">Custom Schedule</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="fallback">After Hours Fallback</Label>
                            <Select defaultValue="voicemail">
                              <SelectTrigger id="fallback">
                                <SelectValue placeholder="Select fallback option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="voicemail">Voicemail</SelectItem>
                                <SelectItem value="message">Custom Message</SelectItem>
                                <SelectItem value="emergency">Emergency Contact</SelectItem>
                                <SelectItem value="alternative">Alternative Flow</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="record-calls">Record Calls</Label>
                            <Switch id="record-calls" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="transcribe">Transcribe Calls</Label>
                            <Switch id="transcribe" />
                          </div>
                          
                          <Button className="w-full mt-2">
                            <Save size={16} className="mr-2" />
                            Save Settings
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:col-span-3">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Main Customer Support Flow</CardTitle>
                            <CardDescription>Last edited: Today at 2:30 PM</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Pause size={14} className="mr-1.5" />
                              Pause Flow
                            </Button>
                            <Button size="sm">
                              <Save size={14} className="mr-1.5" />
                              Save Flow
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center gap-2 min-h-[500px]">
                          {/* Flow Builder Visual Representation */}
                          <div className="w-4/5 p-4 border border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <PhoneCall size={16} />
                              </div>
                              <div>
                                <h3 className="font-medium">Greeting</h3>
                                <p className="text-xs text-muted-foreground">Welcome to customer support</p>
                              </div>
                            </div>
                          </div>
                          
                          <ArrowDown className="h-6 w-6 text-muted-foreground" />
                          
                          <div className="w-4/5 p-4 border border-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                <AlignJustify size={16} />
                              </div>
                              <div>
                                <h3 className="font-medium">Main Menu</h3>
                                <p className="text-xs text-muted-foreground">Press 1 for sales, 2 for support...</p>
                              </div>
                            </div>
                          </div>
                          
                          <ArrowDown className="h-6 w-6 text-muted-foreground" />
                          
                          <div className="flex w-4/5 justify-between">
                            <div className="flex flex-col items-center">
                              <Badge>Option 1</Badge>
                              <ArrowDown className="h-6 w-6 text-muted-foreground" />
                              <div className="p-4 border border-green-400 bg-green-50 dark:bg-green-900/20 rounded-md">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Users size={16} />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Sales Team</h3>
                                    <p className="text-xs text-muted-foreground">Transfer to sales department</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center">
                              <Badge>Option 2</Badge>
                              <ArrowDown className="h-6 w-6 text-muted-foreground" />
                              <div className="p-4 border border-green-400 bg-green-50 dark:bg-green-900/20 rounded-md">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Users size={16} />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Support Team</h3>
                                    <p className="text-xs text-muted-foreground">Transfer to support agents</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 border rounded-md border-dashed w-4/5 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                            <Plus size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Add Flow Component</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="activeFlows" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Main Customer Support",
                      status: "Active",
                      calls: 432,
                      avgDuration: "2m 48s",
                      lastModified: "Today",
                      description: "Primary support line for customer inquiries"
                    },
                    {
                      name: "Sales Inquiries",
                      status: "Active",
                      calls: 284,
                      avgDuration: "3m 12s",
                      lastModified: "Yesterday",
                      description: "Dedicated line for sales and product inquiries"
                    },
                    {
                      name: "After Hours Support",
                      status: "Scheduled",
                      calls: 86,
                      avgDuration: "1m 24s",
                      lastModified: "2 days ago",
                      description: "Evening and weekend support options"
                    },
                    {
                      name: "Technical Support",
                      status: "Active",
                      calls: 157,
                      avgDuration: "4m 32s",
                      lastModified: "3 days ago",
                      description: "Specialized support for technical issues"
                    },
                    {
                      name: "Billing Inquiries",
                      status: "Paused",
                      calls: 94,
                      avgDuration: "2m 08s",
                      lastModified: "1 week ago",
                      description: "Support for billing and payment questions"
                    },
                    {
                      name: "New Customer Onboarding",
                      status: "Draft",
                      calls: 0,
                      avgDuration: "0m 00s",
                      lastModified: "2 days ago",
                      description: "Guided setup process for new customers"
                    }
                  ].map((flow, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardHeader className="bg-muted/40 pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{flow.name}</CardTitle>
                            <Badge 
                              variant={
                                flow.status === "Active" ? "default" : 
                                flow.status === "Paused" ? "outline" : 
                                flow.status === "Draft" ? "secondary" :
                                "outline"
                              }
                              className="mt-1"
                            >
                              {flow.status}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={18} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-4">{flow.description}</p>
                        
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total Calls</p>
                            <p className="font-medium">{flow.calls}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg Duration</p>
                            <p className="font-medium">{flow.avgDuration}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Modified</p>
                            <p className="font-medium">{flow.lastModified}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Components</p>
                            <p className="font-medium">{flow.status !== "Draft" ? "4" : "0"}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings size={14} className="mr-1.5" /> Edit
                          </Button>
                          {flow.status === "Active" ? (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Pause size={14} className="mr-1.5" /> Pause
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Play size={14} className="mr-1.5" /> Activate
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="phoneNumbers" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Assigned Phone Numbers</CardTitle>
                      <Button size="sm">
                        <Plus size={14} className="mr-1.5" />
                        Add Number
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { 
                          number: "+1 (555) 123-4567", 
                          flow: "Main Customer Support", 
                          status: "Active",
                          monthlyFee: "$1.00",
                          location: "United States"
                        },
                        { 
                          number: "+1 (555) 234-5678", 
                          flow: "Sales Inquiries", 
                          status: "Active",
                          monthlyFee: "$1.00",
                          location: "United States"
                        },
                        { 
                          number: "+1 (555) 345-6789", 
                          flow: "Technical Support", 
                          status: "Active",
                          monthlyFee: "$1.00",
                          location: "United States"
                        },
                        { 
                          number: "+1 (555) 456-7890", 
                          flow: "After Hours Support", 
                          status: "Scheduled",
                          monthlyFee: "$1.00",
                          location: "United States"
                        }
                      ].map((phone, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md">
                          <div>
                            <h4 className="font-medium">{phone.number}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <span>{phone.location}</span>
                              <span>•</span>
                              <span>${phone.monthlyFee}/month</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="text-right sm:text-left">
                              <p className="text-sm text-muted-foreground">Assigned Flow</p>
                              <div className="flex items-center gap-1 font-medium">
                                <PhoneForwarded size={14} className="text-primary" />
                                {phone.flow}
                              </div>
                            </div>
                            
                            <Badge 
                              variant={phone.status === "Active" ? "default" : "outline"}
                            >
                              {phone.status}
                            </Badge>
                            
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal size={18} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 border rounded-md border-dashed flex flex-col items-center justify-center text-center">
                      <Phone className="h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="font-medium mb-1">Need More Numbers?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Purchase additional phone numbers for different departments or locations
                      </p>
                      <Button>
                        Purchase Numbers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recordings" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Voice Recordings</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Upload size={14} />
                          Upload
                        </Button>
                        <Button size="sm" className="gap-1">
                          <Mic size={14} />
                          Record New
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { 
                          name: "Welcome Greeting", 
                          duration: "0:12", 
                          flow: "Main Customer Support",
                          date: "Oct 15, 2023",
                          type: "Uploaded"
                        },
                        { 
                          name: "Sales Team Introduction", 
                          duration: "0:18", 
                          flow: "Sales Inquiries",
                          date: "Oct 14, 2023",
                          type: "Text-to-Speech"
                        },
                        { 
                          name: "Technical Support Menu", 
                          duration: "0:24", 
                          flow: "Technical Support",
                          date: "Oct 12, 2023",
                          type: "Recorded"
                        },
                        { 
                          name: "After Hours Message", 
                          duration: "0:32", 
                          flow: "After Hours Support",
                          date: "Oct 10, 2023",
                          type: "Text-to-Speech"
                        },
                        { 
                          name: "Voicemail Prompt", 
                          duration: "0:08", 
                          flow: "Multiple Flows",
                          date: "Oct 8, 2023",
                          type: "Uploaded"
                        }
                      ].map((recording, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Headphones size={18} />
                            </div>
                            <div>
                              <h4 className="font-medium">{recording.name}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <span>{recording.duration}</span>
                                <span>•</span>
                                <span>{recording.date}</span>
                                <span>•</span>
                                <span>{recording.type}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <p className="text-sm text-muted-foreground">
                              Used in: <span className="font-medium">{recording.flow}</span>
                            </p>
                            
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Play size={14} className="mr-1.5" />
                                Play
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={18} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Text-to-Speech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tts-text">Message Text</Label>
                        <Textarea 
                          id="tts-text" 
                          placeholder="Enter the text you want to convert to speech..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="voice">Voice</Label>
                          <Select defaultValue="en-US-Neural2-F">
                            <SelectTrigger id="voice">
                              <SelectValue placeholder="Select voice" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en-US-Neural2-F">Female (US)</SelectItem>
                              <SelectItem value="en-US-Neural2-M">Male (US)</SelectItem>
                              <SelectItem value="en-GB-Neural2-F">Female (UK)</SelectItem>
                              <SelectItem value="en-GB-Neural2-M">Male (UK)</SelectItem>
                              <SelectItem value="en-AU-Neural2-F">Female (AU)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="speed">Speaking Rate</Label>
                          <Select defaultValue="1.0">
                            <SelectTrigger id="speed">
                              <SelectValue placeholder="Speaking rate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.75">Slow (0.75x)</SelectItem>
                              <SelectItem value="1.0">Normal (1.0x)</SelectItem>
                              <SelectItem value="1.25">Fast (1.25x)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-2">
                        Generate Audio
                      </Button>
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
                        <p className="text-3xl font-semibold mt-1">1,053</p>
                        <div className="flex items-center text-green-600 text-sm mt-2">
                          <ArrowUp size={14} className="mr-1" />
                          <span>8% from last month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Avg. Call Duration</p>
                        <p className="text-3xl font-semibold mt-1">2m 36s</p>
                        <div className="flex items-center text-red-600 text-sm mt-2">
                          <ArrowDown size={14} className="mr-1" />
                          <span>12s from last month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Transfer Rate</p>
                        <p className="text-3xl font-semibold mt-1">48%</p>
                        <div className="flex items-center text-green-600 text-sm mt-2">
                          <ArrowUp size={14} className="mr-1" />
                          <span>5% from last month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">Abandoned Calls</p>
                        <p className="text-3xl font-semibold mt-1">12%</p>
                        <div className="flex items-center text-red-600 text-sm mt-2">
                          <ArrowDown size={14} className="mr-1" />
                          <span>2% from last month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Call Volume by Flow</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Main Customer Support</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">432</span>
                            <span className="text-sm text-muted-foreground">41%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-blue-500 rounded-full h-2" style={{ width: '41%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Sales Inquiries</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">284</span>
                            <span className="text-sm text-muted-foreground">27%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: '27%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            <span className="text-sm">Technical Support</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">157</span>
                            <span className="text-sm text-muted-foreground">15%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-purple-500 rounded-full h-2" style={{ width: '15%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <span className="text-sm">Billing Inquiries</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">94</span>
                            <span className="text-sm text-muted-foreground">9%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-amber-500 rounded-full h-2" style={{ width: '9%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">After Hours Support</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">86</span>
                            <span className="text-sm text-muted-foreground">8%</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div className="bg-red-500 rounded-full h-2" style={{ width: '8%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Menu Selection Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Option 1: Sales</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">32%</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: '32%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Option 2: Support</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">45%</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-blue-500 rounded-full h-2" style={{ width: '45%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Option 3: Billing</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">18%</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-amber-500 rounded-full h-2" style={{ width: '18%' }} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Option 0: Operator</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">5%</span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-purple-500 rounded-full h-2" style={{ width: '5%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t">
                        <h4 className="text-sm font-medium mb-3">Key Insights</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={14} className="text-green-500" />
                            Support option is most frequently selected
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={14} className="text-green-500" />
                            Low operator requests indicates clear menu options
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={14} className="text-green-500" />
                            Menu completion rate is 94% (industry avg: 85%)
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Call Volume by Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">9:00 AM - 10:00 AM</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">132 calls</span>
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: '75%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">10:00 AM - 11:00 AM</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">176 calls</span>
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: '100%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">11:00 AM - 12:00 PM</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">143 calls</span>
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: '81%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">1:00 PM - 2:00 PM</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">98 calls</span>
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: '56%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">2:00 PM - 3:00 PM</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">124 calls</span>
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: '70%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">3:00 PM - 4:00 PM</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">156 calls</span>
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: '89%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">4:00 PM - 5:00 PM</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">134 calls</span>
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: '76%' }} />
                          </div>
                        </div>
                      </div>
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
                    "Patient Appointment Line",
                    "Prescription Refill System",
                    "Medical Office Hours"
                  ],
                  icon: <CheckCircle2 size={18} className="text-blue-500" />
                },
                {
                  industry: "Retail",
                  templates: [
                    "Store Location & Hours",
                    "Order Status Checker",
                    "Customer Service Router"
                  ],
                  icon: <CheckCircle2 size={18} className="text-green-500" />
                },
                {
                  industry: "Financial Services",
                  templates: [
                    "Account Balance Checker",
                    "Card Activation System",
                    "Loan Application Status"
                  ],
                  icon: <CheckCircle2 size={18} className="text-amber-500" />
                },
                {
                  industry: "Hospitality",
                  templates: [
                    "Hotel Reservation System",
                    "Room Service Ordering",
                    "Concierge Services"
                  ],
                  icon: <CheckCircle2 size={18} className="text-indigo-500" />
                },
                {
                  industry: "Technology",
                  templates: [
                    "Technical Support Triage",
                    "Product Information",
                    "Software Activation"
                  ],
                  icon: <CheckCircle2 size={18} className="text-rose-500" />
                },
                {
                  industry: "Professional Services",
                  templates: [
                    "Appointment Scheduler",
                    "Client Intake System",
                    "Service Department Router"
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
                      <MoveRight size={14} />
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

export default IVRSystem;
