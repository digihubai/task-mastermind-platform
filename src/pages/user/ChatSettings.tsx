
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, MessageSquare, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ChatSettings = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Chat Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your AI chat assistants
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Chat Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Chat Name</label>
                  <Input defaultValue="Customer Support Bot" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Welcome Message</label>
                  <Input defaultValue="Hi there! How can I help you today?" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">AI Model</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>GPT-4</option>
                    <option>GPT-3.5</option>
                    <option>Claude 2</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Knowledge Base</label>
                  <div className="flex gap-2">
                    <Input defaultValue="Company FAQ" className="flex-1" />
                    <Button variant="outline">Browse</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Advanced Settings</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable Chat History</span>
                      <button className="w-10 h-5 bg-primary rounded-full flex items-center p-1">
                        <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Allow File Uploads</span>
                      <button className="w-10 h-5 bg-primary rounded-full flex items-center p-1">
                        <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Transcript</span>
                      <button className="w-10 h-5 bg-muted rounded-full flex items-center p-1">
                        <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Check size={18} />
                    <span>Save Settings</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="p-6 border border-border/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare size={20} className="text-primary" />
                </div>
                <h3 className="font-medium">Chat Preview</h3>
              </div>
              
              <div className="border rounded-md p-3 bg-background h-[300px]">
                <div className="bg-muted p-2 rounded-md mb-3 max-w-[80%]">
                  <p className="text-sm">Hi there! How can I help you today?</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Settings size={20} className="text-primary" />
                </div>
                <h3 className="font-medium">Quick Settings</h3>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <span>Reset to Default</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <span>Import Configuration</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <span>Export Configuration</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatSettings;
