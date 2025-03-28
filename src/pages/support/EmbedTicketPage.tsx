
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EmbeddableTicketForm } from "@/components/support/EmbeddableTicketForm";
import { useToast } from "@/hooks/use-toast";
import { Copy, Code, ExternalLink } from "lucide-react";

const EmbedTicketPage = () => {
  const { toast } = useToast();
  const [formConfig, setFormConfig] = useState({
    title: "Support Request",
    description: "Submit a new support request and we'll get back to you as soon as possible.",
    compact: false,
    theme: 'auto',
    department: '',
  });
  
  const embedCode = `<div id="digihub-support-form"></div>
<script>
  (function(w,d,s,o,f,js,fjs){
    w['DigiHub-Widget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','dh','https://your-app-domain.com/embed.js'));
  dh('init', { 
    selector: '#digihub-support-form',
    title: "${formConfig.title}",
    description: "${formConfig.description}",
    compact: ${formConfig.compact},
    theme: "${formConfig.theme}",
    ${formConfig.department ? `department: "${formConfig.department}",` : ''}
  });
</script>`;

  const directLinkUrl = `https://your-app-domain.com/support/ticket-form?title=${encodeURIComponent(formConfig.title)}&description=${encodeURIComponent(formConfig.description)}&theme=${formConfig.theme}${formConfig.department ? `&department=${formConfig.department}` : ''}`;
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Embed code copied",
      description: "The embed code has been copied to your clipboard."
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(directLinkUrl);
    toast({
      title: "Direct link copied",
      description: "The direct link has been copied to your clipboard."
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Share Support Form</h1>
          <p className="text-muted-foreground mt-1">
            Create an embeddable support ticket form for your website or share a direct link
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Form</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Form Title</Label>
                  <Input 
                    id="title" 
                    value={formConfig.title} 
                    onChange={(e) => setFormConfig({...formConfig, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Form Description</Label>
                  <Textarea 
                    id="description" 
                    value={formConfig.description} 
                    onChange={(e) => setFormConfig({...formConfig, description: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="compact" 
                    checked={formConfig.compact} 
                    onCheckedChange={(checked) => setFormConfig({...formConfig, compact: checked})}
                  />
                  <Label htmlFor="compact">Compact Mode</Label>
                </div>
                
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <select 
                    id="theme" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formConfig.theme}
                    onChange={(e) => setFormConfig({...formConfig, theme: e.target.value as 'light' | 'dark' | 'auto'})}
                  >
                    <option value="auto">Auto (Use site's theme)</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="embed">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="embed">Embed Code</TabsTrigger>
                <TabsTrigger value="link">Direct Link</TabsTrigger>
              </TabsList>
              
              <TabsContent value="embed">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Embed Code</span>
                      <Button variant="outline" size="sm" onClick={handleCopyCode}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-md relative">
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-all">
                        {embedCode}
                      </pre>
                    </div>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Add this code to any HTML page where you want the support form to appear.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="link">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Direct Link</span>
                      <Button variant="outline" size="sm" onClick={handleCopyLink}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm break-all">{directLinkUrl}</p>
                    </div>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Share this link directly with your customers to access the support form.</p>
                    </div>
                    
                    <Button variant="outline" className="mt-4" asChild>
                      <a href={directLinkUrl} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in new tab
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddableTicketForm
                  customTitle={formConfig.title}
                  customDescription={formConfig.description}
                  compact={formConfig.compact}
                  theme={formConfig.theme as 'light' | 'dark' | 'auto'}
                  departmentId={formConfig.department || undefined}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calendly Integration Section */}
        <Card>
          <CardHeader>
            <CardTitle>Calendly Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Connect your Calendly account to allow customers to book meetings directly from the support system.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="rounded-full bg-primary/10 p-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-medium">Customer Booking</h3>
                    <p className="text-sm text-muted-foreground">Let customers book meetings directly from the support widget</p>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="rounded-full bg-primary/10 p-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-medium">Time-saving</h3>
                    <p className="text-sm text-muted-foreground">Save time with automatic calendar scheduling</p>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="rounded-full bg-primary/10 p-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-medium">Seamless Integration</h3>
                    <p className="text-sm text-muted-foreground">Works with your existing Calendly account</p>
                  </div>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  Connect Calendly
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EmbedTicketPage;
