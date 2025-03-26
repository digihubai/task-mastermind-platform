
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { TeamChat } from "@/components/teamchat/TeamChat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Hash, Users, Settings, Info, Download, HeadphonesIcon, PhoneOutgoing, Phone } from "lucide-react";

const TeamChatPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Team Communication Hub</h1>
            <p className="text-muted-foreground mt-1">
              Communicate with your team in real-time through chat, voice and video
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Hash size={16} />
              <span>New Channel</span>
            </Button>
            
            <Button 
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              <span>New Group</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Users size={16} />
              <span>Team Chat</span>
            </TabsTrigger>
            <TabsTrigger value="ivr" className="flex items-center gap-2">
              <HeadphonesIcon size={16} />
              <span>IVR System</span>
            </TabsTrigger>
            <TabsTrigger value="outbound" className="flex items-center gap-2">
              <PhoneOutgoing size={16} />
              <span>Outbound Calls</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info size={16} />
              <span>Info</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <TeamChat />
          </TabsContent>
          
          <TabsContent value="ivr" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Interactive Voice Response (IVR) System</h2>
              
              <div className="space-y-6">
                <p>
                  Configure your automated phone system to efficiently route calls and provide self-service options to your customers.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Phone size={18} /> Current IVR Flow
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your active call routing system with 5 decision points
                    </p>
                    <Button variant="outline" className="w-full">Edit Flow</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-medium">IVR Performance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average call duration</span>
                        <span className="font-medium">2m 34s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Calls handled by IVR</span>
                        <span className="font-medium">64%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Agent transfers</span>
                        <span className="font-medium">36%</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">View Reports</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Voice Prompts</h3>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Welcome Message</p>
                        <p className="text-xs text-muted-foreground">0:15 • Last updated 3 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Menu Options</p>
                        <p className="text-xs text-muted-foreground">0:42 • Last updated 7 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">After Hours</p>
                        <p className="text-xs text-muted-foreground">0:22 • Last updated 14 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="outbound" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Outbound Call Campaigns</h2>
              
              <div className="space-y-6">
                <p>
                  Set up and manage outbound call campaigns for sales, marketing, or customer follow-ups.
                </p>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Active Campaigns</h3>
                    <Button size="sm">New Campaign</Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Customer Feedback</p>
                        <p className="text-xs text-muted-foreground">Progress: 45% • 128/285 calls completed</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Pause</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Renewal Reminder</p>
                        <p className="text-xs text-muted-foreground">Progress: 72% • 65/90 calls completed</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Pause</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-medium">Call Scripts</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage and update your call scripts for different campaigns
                    </p>
                    <Button variant="outline" className="w-full">Manage Scripts</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-medium">Phone Number Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure caller IDs and phone numbers for outbound calls
                    </p>
                    <Button variant="outline" className="w-full">Manage Numbers</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Call Performance</h3>
                  <div className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-secondary/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Total Calls</p>
                        <p className="text-2xl font-bold">947</p>
                      </div>
                      <div className="p-3 bg-secondary/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Connected</p>
                        <p className="text-2xl font-bold">68%</p>
                      </div>
                      <div className="p-3 bg-secondary/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Avg. Duration</p>
                        <p className="text-2xl font-bold">3:24</p>
                      </div>
                      <div className="p-3 bg-secondary/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="text-2xl font-bold">23%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Communication Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Desktop notifications</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Email notifications</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Sound notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Privacy & Security</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Allow message formatting</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Show read receipts</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Auto-delete messages after 30 days</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Call Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Enable video calls</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Auto-record calls</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Call transcription</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Management</h3>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download size={16} />
                      <span>Export Communication Data</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About Team Communication Hub</h2>
              
              <div className="space-y-6">
                <p>
                  The Team Communication Hub provides comprehensive communication tools including team chat, IVR system, and outbound call management.
                  With features like channels, direct messaging, call routing, and campaign management, it offers a complete solution for all your communication needs.
                </p>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Public and private channels for team collaboration</li>
                    <li>Direct and group messaging</li>
                    <li>File and media sharing with GIF support</li>
                    <li>Message reactions and threading</li>
                    <li>Interactive Voice Response (IVR) system</li>
                    <li>Outbound call campaign management</li>
                    <li>Call scripting and recording</li>
                    <li>Performance analytics for all communication channels</li>
                    <li>Comprehensive security and privacy controls</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                  <p>
                    For support or questions about using the Team Communication Hub, please contact your administrator 
                    or submit a support ticket through the Support section.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default TeamChatPage;
