
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { TeamChat } from "@/components/teamchat/TeamChat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Hash, Users, Settings, Info, Download } from "lucide-react";

const TeamChatPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Team Chat</h1>
            <p className="text-muted-foreground mt-1">
              Communicate with your team in real-time
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
              <span>Chat</span>
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
          
          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Team Chat Settings</h2>
              
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
                  <h3 className="text-lg font-medium mb-2">Data Management</h3>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download size={16} />
                      <span>Export Chat Data</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About Team Chat</h2>
              
              <div className="space-y-6">
                <p>
                  Team Chat is a powerful communication tool that enables real-time messaging, file sharing, 
                  and collaboration within your organization. With features like channels, direct messaging, 
                  and integrations, it provides a complete solution for team communication.
                </p>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Public and private channels</li>
                    <li>Direct and group messaging</li>
                    <li>File and media sharing</li>
                    <li>Message reactions and threading</li>
                    <li>Pinned messages and conversations</li>
                    <li>Message formatting and markdown support</li>
                    <li>Rich message editor with emoji support</li>
                    <li>Voice messaging capability</li>
                    <li>Search functionality across all conversations</li>
                    <li>Keyboard shortcuts for power users</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                  <p>
                    For support or questions about using Team Chat, please contact your administrator 
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
