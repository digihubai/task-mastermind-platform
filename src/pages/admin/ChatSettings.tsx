
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/Badge";
import { 
  MessageSquare, 
  Settings, 
  Bot, 
  Globe, 
  Check, 
  RefreshCw,
  Server,
  Database,
  Upload,
  HelpCircle,
  Save,
  PlusCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminChatSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Chat system settings have been updated successfully"
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Chat Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure system-wide chat settings and defaults
            </p>
          </div>
          
          <Button 
            onClick={handleSaveSettings}
            className="flex items-center gap-2"
          >
            <Save size={18} />
            <span>Save Settings</span>
          </Button>
        </div>
        
        <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ai">AI & Chatbots</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="general" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">General Chat Settings</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Chat Title</label>
                      <Input defaultValue="Customer Support" />
                      <p className="text-xs text-muted-foreground">Title shown in the chat header</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Welcome Message</label>
                      <Input defaultValue="Hi there! How can I help you today?" />
                      <p className="text-xs text-muted-foreground">First message sent to users</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Chat Behavior</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Enable Chat History</label>
                          <p className="text-xs text-muted-foreground">Save chat history for returning users</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">File Uploads</label>
                          <p className="text-xs text-muted-foreground">Allow users to upload files in chat</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Show Typing Indicator</label>
                          <p className="text-xs text-muted-foreground">Display when agents are typing</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Auto Response for Offline Hours</label>
                          <p className="text-xs text-muted-foreground">Send automated reply when agents are offline</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Offline Message</label>
                    <Input defaultValue="We're currently offline, but we'll get back to you as soon as possible." />
                    <p className="text-xs text-muted-foreground">Message shown when no agents are available</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Access Control</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Require Login for Chat</label>
                        <p className="text-xs text-muted-foreground">Users must be logged in to use chat</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Collect User Info</label>
                        <p className="text-xs text-muted-foreground">Ask for name and email before starting chat</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">AI Configuration</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default AI Model</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>GPT-4</option>
                        <option>GPT-3.5</option>
                        <option>Claude 2</option>
                        <option>Custom Model</option>
                      </select>
                      <p className="text-xs text-muted-foreground">AI model used for chatbot responses</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">API Key</label>
                      <Input type="password" defaultValue="sk-••••••••••••••••••••••••••••••" />
                      <p className="text-xs text-muted-foreground">API key for the selected AI service</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">AI Features</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">AI Translation</label>
                          <p className="text-xs text-muted-foreground">Automatically translate messages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">AI Smart Reply</label>
                          <p className="text-xs text-muted-foreground">Suggest responses for agents</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">AI Spelling Correction</label>
                          <p className="text-xs text-muted-foreground">Automatically correct spelling errors</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Knowledge Base</label>
                    <div className="flex gap-2">
                      <Input defaultValue="/documents/kb" className="flex-1" />
                      <Button variant="outline">Browse</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Path to knowledge base documents for AI training</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Chatbot Settings</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Enable Chatbot</label>
                        <p className="text-xs text-muted-foreground">Use AI chatbot for initial responses</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Human Handoff</label>
                        <p className="text-xs text-muted-foreground">Allow chatbot to transfer to human agent</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Handoff Threshold</label>
                    <Input type="number" defaultValue="3" min="1" max="10" />
                    <p className="text-xs text-muted-foreground">Number of failed responses before human handoff</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Chat Appearance</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Color</label>
                      <div className="flex gap-2">
                        <input type="color" defaultValue="#4f46e5" className="w-10 h-10 p-1 border rounded" />
                        <Input defaultValue="#4f46e5" />
                      </div>
                      <p className="text-xs text-muted-foreground">Main accent color for the chat</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Secondary Color</label>
                      <div className="flex gap-2">
                        <input type="color" defaultValue="#e2e8f0" className="w-10 h-10 p-1 border rounded" />
                        <Input defaultValue="#e2e8f0" />
                      </div>
                      <p className="text-xs text-muted-foreground">Secondary color for UI elements</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Font Family</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>System Default</option>
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                        <option>Custom...</option>
                      </select>
                      <p className="text-xs text-muted-foreground">Font used in the chat interface</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Chat Window</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chat Position</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Bottom Right</option>
                          <option>Bottom Left</option>
                          <option>Top Right</option>
                          <option>Top Left</option>
                        </select>
                        <p className="text-xs text-muted-foreground">Position of the chat widget on the page</p>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chat Icon</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Message Square</option>
                          <option>Message Circle</option>
                          <option>Help Circle</option>
                          <option>Custom...</option>
                        </select>
                        <p className="text-xs text-muted-foreground">Icon displayed in the chat button</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Round Corners</label>
                          <p className="text-xs text-muted-foreground">Use rounded corners for chat UI</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Show Branding</label>
                          <p className="text-xs text-muted-foreground">Display "Powered by" branding</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Custom CSS</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom CSS</label>
                    <textarea 
                      className="w-full h-32 p-2 border rounded-md font-mono text-sm"
                      placeholder="/* Add your custom CSS here */"
                    ></textarea>
                    <p className="text-xs text-muted-foreground">Custom CSS styles for the chat interface</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Email Notifications</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Admin Email</label>
                      <Input defaultValue="admin@example.com" />
                      <p className="text-xs text-muted-foreground">Email address for administrative notifications</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">From Email</label>
                      <Input defaultValue="no-reply@example.com" />
                      <p className="text-xs text-muted-foreground">Sender email address for notifications</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Notification Triggers</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">New Message Notification</label>
                          <p className="text-xs text-muted-foreground">Email agents when new messages arrive</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Offline Message Notification</label>
                          <p className="text-xs text-muted-foreground">Email when messages arrive during offline hours</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Chat Transcript</label>
                          <p className="text-xs text-muted-foreground">Send chat transcript to user by email</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Push Notifications</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Enable Push Notifications</label>
                        <p className="text-xs text-muted-foreground">Send browser push notifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Desktop Notifications</label>
                        <p className="text-xs text-muted-foreground">Show desktop notifications for agents</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Sound Notifications</label>
                        <p className="text-xs text-muted-foreground">Play sound when new messages arrive</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">System Settings</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cache Duration</label>
                      <Input type="number" defaultValue="1440" min="0" />
                      <p className="text-xs text-muted-foreground">Cache duration in minutes (0 to disable)</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Request Timeout</label>
                      <Input type="number" defaultValue="30" min="1" />
                      <p className="text-xs text-muted-foreground">API request timeout in seconds</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Data Management</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Store Chat Logs</label>
                          <p className="text-xs text-muted-foreground">Save chat conversation logs</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Auto-Delete Old Chats</label>
                          <p className="text-xs text-muted-foreground">Automatically delete chats older than specified days</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Delete Chats Older Than</label>
                      <Input type="number" defaultValue="90" min="1" />
                      <p className="text-xs text-muted-foreground">Days to keep chat logs</p>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="destructive" className="flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span>Purge All Chat Data</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Developer Mode</label>
                        <p className="text-xs text-muted-foreground">Enable additional debugging features</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-border/40">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Integrations</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook URL</label>
                    <Input defaultValue="https://example.com/webhook" />
                    <p className="text-xs text-muted-foreground">URL for webhook notifications</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">CRM Integration</label>
                        <p className="text-xs text-muted-foreground">Sync chat data with CRM</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Analytics Integration</label>
                        <p className="text-xs text-muted-foreground">Track chat metrics in analytics</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
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

export default AdminChatSettings;
