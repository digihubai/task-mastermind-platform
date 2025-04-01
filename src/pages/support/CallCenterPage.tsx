import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PhoneCall, PhoneIncoming, PhoneOutgoing, Plus, AlertTriangle, Clock, CheckCircle, Phone, UserCheck, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Call {
  id: string;
  name: string;
  number: string;
  time: string;
  duration: string;
  type: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'in-progress' | 'ai-handled';
  handledBy?: 'ai' | 'human';
  transcript?: string;
}

const CallCenterPage = () => {
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [aiTakeover, setAiTakeover] = useState(80); // percentage of calls handled by AI
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  
  const calls: Call[] = [
    {
      id: "1",
      name: "Michael Brown",
      number: "(555) 123-4567",
      time: "10:45 AM",
      duration: "5:32",
      type: "inbound",
      status: "completed",
      handledBy: "ai",
      transcript: "AI: Hello, how can I help you today?\nCaller: I'm having trouble with my account login.\nAI: I understand. Let me help you reset your password..."
    },
    {
      id: "2",
      name: "Sarah Johnson",
      number: "(555) 987-6543",
      time: "9:30 AM",
      duration: "3:15",
      type: "outbound",
      status: "completed",
      handledBy: "human"
    },
    {
      id: "3",
      name: "David Wilson",
      number: "(555) 456-7890",
      time: "Yesterday",
      duration: "1:45",
      type: "inbound",
      status: "missed"
    },
    {
      id: "4",
      name: "Jennifer Martinez",
      number: "(555) 789-0123",
      time: "Yesterday",
      duration: "7:22",
      type: "inbound",
      status: "completed",
      handledBy: "ai",
      transcript: "AI: Good morning, this is DigiHub support. How may I assist you?\nCaller: I need help with my subscription.\nAI: I'd be happy to help with that. Could you please verify your account email address?"
    },
    {
      id: "5",
      name: "Robert Davis",
      number: "(555) 234-5678",
      time: "2 days ago",
      duration: "2:10",
      type: "inbound",
      status: "completed",
      handledBy: "human"
    }
  ];
  
  const handleViewCallDetails = (call: Call) => {
    setSelectedCall(call);
    setShowCallDialog(true);
  };
  
  const handleTakeoverCall = () => {
    toast.success("Call successfully transferred to human agent");
    setShowCallDialog(false);
    
    // In a real app, this would initiate a transfer to a human agent
    // and update the call status in the database
  };
  
  const handleNewCall = () => {
    toast.success("New call initiated");
  };
  
  const handleToggleAI = (enabled: boolean) => {
    setIsAIEnabled(enabled);
    toast.info(enabled ? "AI call handling enabled" : "AI call handling disabled");
  };
  
  const handleAITakeoverChange = (value: number) => {
    setAiTakeover(value);
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Call Center</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSettingsDialog(true)}>
              <Bot className="mr-2 h-4 w-4" />
              AI Settings
            </Button>
            <Button onClick={handleNewCall}>
              <Plus className="mr-2 h-4 w-4" />
              New Call
            </Button>
          </div>
        </div>
        
        <div className="mb-6 p-4 border rounded-lg bg-muted/30 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${isAIEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="font-medium">{isAIEnabled ? 'AI Call Handling: Active' : 'AI Call Handling: Inactive'}</span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">AI handling {aiTakeover}% of incoming calls</p>
            <Switch checked={isAIEnabled} onCheckedChange={handleToggleAI} />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Calls</TabsTrigger>
            <TabsTrigger value="inbound">Inbound</TabsTrigger>
            <TabsTrigger value="outbound">Outbound</TabsTrigger>
            <TabsTrigger value="ai-handled">AI Handled</TabsTrigger>
            <TabsTrigger value="human-handled">Human Handled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <PhoneCall className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">247</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Handled</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Bot className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">183</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">74% of all calls</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Human Handled</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <UserCheck className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">64</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">26% of all calls</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full">
                  <Input
                    placeholder="Search calls..."
                    className="mb-4 pl-9"
                  />
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>

                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {calls.map((call) => (
                      <div 
                        key={call.id} 
                        className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition cursor-pointer"
                        onClick={() => handleViewCallDetails(call)}
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{call.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{call.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              {call.type === "inbound" ? (
                                <PhoneIncoming className="h-3 w-3 mr-1" />
                              ) : (
                                <PhoneOutgoing className="h-3 w-3 mr-1" />
                              )}
                              <span>{call.number}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{call.duration}</span>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <Badge 
                              variant={
                                call.status === "completed" ? "outline" : 
                                call.status === "missed" ? "destructive" :
                                "secondary"
                              } 
                              className="text-xs mr-2">
                              {call.status === "completed" ? (
                                <div className="flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </div>
                              ) : call.status === "missed" ? (
                                "Missed"
                              ) : (
                                "In Progress"
                              )}
                            </Badge>
                            
                            {call.handledBy && (
                              <Badge variant={call.handledBy === "ai" ? "secondary" : "outline"} className="text-xs mr-2">
                                {call.handledBy === "ai" ? (
                                  <div className="flex items-center">
                                    <Bot className="h-3 w-3 mr-1" />
                                    AI
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <UserCheck className="h-3 w-3 mr-1" />
                                    Human
                                  </div>
                                )}
                              </Badge>
                            )}
                            
                            <span className="text-xs text-muted-foreground">{call.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inbound">
            <Card>
              <CardHeader>
                <CardTitle>Inbound Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Inbound call management will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outbound">
            <Card>
              <CardHeader>
                <CardTitle>Outbound Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Outbound call management will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-handled">
            <Card>
              <CardHeader>
                <CardTitle>AI Handled Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Calls managed by AI will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="human-handled">
            <Card>
              <CardHeader>
                <CardTitle>Human Handled Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Calls managed by human agents will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
          </DialogHeader>
          
          {selectedCall && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{selectedCall.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedCall.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCall.number}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{selectedCall.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedCall.time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedCall.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{selectedCall.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Handled by</p>
                  <p className="font-medium capitalize">{selectedCall.handledBy || 'N/A'}</p>
                </div>
              </div>
              
              {selectedCall.transcript && (
                <div>
                  <p className="font-medium mb-2">Call Transcript</p>
                  <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-line max-h-[200px] overflow-y-auto">
                    {selectedCall.transcript}
                  </div>
                </div>
              )}
              
              {selectedCall.handledBy === 'ai' && selectedCall.status !== 'completed' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md flex items-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">This call is currently being handled by AI</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            {selectedCall?.handledBy === 'ai' && selectedCall.status !== 'completed' && (
              <Button onClick={handleTakeoverCall} className="bg-blue-600 hover:bg-blue-700">
                <UserCheck className="mr-2 h-4 w-4" />
                Take Over Call
              </Button>
            )}
            <Button variant="outline" onClick={() => setShowCallDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Call Center Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ai-enabled" className="font-medium">Enable AI Call Handling</Label>
                <p className="text-sm text-muted-foreground">Allow AI to automatically handle incoming calls</p>
              </div>
              <Switch id="ai-enabled" checked={isAIEnabled} onCheckedChange={handleToggleAI} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ai-takeover">AI Call Handling Percentage</Label>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={aiTakeover} 
                  onChange={(e) => handleAITakeoverChange(Number(e.target.value))}
                  className="flex-1 mr-4"
                />
                <span className="font-medium">{aiTakeover}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Percentage of incoming calls that will be handled by AI
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>AI Handoff Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="complex-issues" defaultChecked />
                  <label htmlFor="complex-issues" className="text-sm">Hand off complex issues to human agents</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sentiment" defaultChecked />
                  <label htmlFor="sentiment" className="text-sm">Hand off when detecting negative sentiment</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="request" defaultChecked />
                  <label htmlFor="request" className="text-sm">Hand off when caller explicitly requests human</label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)} className="mr-2">
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success("AI call settings saved");
              setShowSettingsDialog(false);
            }}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default CallCenterPage;
