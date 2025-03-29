
import React, { useState, useEffect } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Code, ExternalLink, MessageSquare } from "lucide-react";
import { ChatInterface } from '@/components/chatbot/ChatInterface';

const EmbedChatbotPage = () => {
  const { toast } = useToast();
  const [chatConfig, setChatConfig] = useState({
    assistantName: "Support AI",
    welcomeMessage: "Hello, I'm your support assistant. How can I help you today?",
    theme: 'auto',
    position: 'bottom-right',
    model: 'gpt-4o-mini',
    language: 'auto',
    iframeWidth: 420,
    iframeHeight: 745
  });
  
  const embedCode = `<script defer src="https://digihub.ai/vendor/chatbot/js/external-chatbot.js" data-chatbot-uuid="89aa4a9c-1119-4eef-b0d0-52ff31a4c222" data-iframe-width="${chatConfig.iframeWidth}" data-iframe-height="${chatConfig.iframeHeight}" data-language="${chatConfig.language}" ></script>`;

  const directLinkUrl = `https://your-app-domain.com/support/chatbot?name=${encodeURIComponent(chatConfig.assistantName)}&welcome=${encodeURIComponent(chatConfig.welcomeMessage)}&theme=${chatConfig.theme}&position=${chatConfig.position}&language=${chatConfig.language}`;
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Embed code copied",
      description: "The chatbot embed code has been copied to your clipboard."
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(directLinkUrl);
    toast({
      title: "Direct link copied",
      description: "The direct link has been copied to your clipboard."
    });
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setChatConfig({...chatConfig, iframeWidth: value});
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setChatConfig({...chatConfig, iframeHeight: value});
    }
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Embed AI Chatbot</h1>
          <p className="text-muted-foreground mt-1">
            Create an embeddable AI chatbot for your website or share a direct link
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Chatbot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="assistant-name">Assistant Name</Label>
                  <Input 
                    id="assistant-name" 
                    value={chatConfig.assistantName} 
                    onChange={(e) => setChatConfig({...chatConfig, assistantName: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Textarea 
                    id="welcome-message" 
                    value={chatConfig.welcomeMessage} 
                    onChange={(e) => setChatConfig({...chatConfig, welcomeMessage: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <select 
                    id="theme" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={chatConfig.theme}
                    onChange={(e) => setChatConfig({...chatConfig, theme: e.target.value})}
                  >
                    <option value="auto">Auto (Use site's theme)</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="position">Chat Widget Position</Label>
                  <select 
                    id="position" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={chatConfig.position}
                    onChange={(e) => setChatConfig({...chatConfig, position: e.target.value})}
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="model">AI Model</Label>
                  <select 
                    id="model" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={chatConfig.model}
                    onChange={(e) => setChatConfig({...chatConfig, model: e.target.value})}
                  >
                    <option value="gpt-4o-mini">GPT-4o Mini (Fast)</option>
                    <option value="gpt-4o">GPT-4o (Powerful)</option>
                    <option value="claude-3">Claude 3</option>
                    <option value="gemini">Gemini</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={chatConfig.language}
                    onChange={(e) => setChatConfig({...chatConfig, language: e.target.value})}
                  >
                    <option value="auto">Auto (Browser Default)</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="pt">Portuguese</option>
                    <option value="it">Italian</option>
                    <option value="ru">Russian</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="width">Width</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="300"
                      max="600"
                      step="10"
                      value={chatConfig.iframeWidth}
                      onChange={(e) => setChatConfig({...chatConfig, iframeWidth: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <span className="font-mono text-sm">{chatConfig.iframeWidth}px</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="height">Height</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="400"
                      max="900"
                      step="10"
                      value={chatConfig.iframeHeight}
                      onChange={(e) => setChatConfig({...chatConfig, iframeHeight: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <span className="font-mono text-sm">{chatConfig.iframeHeight}px</span>
                  </div>
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
                      <p>Need help? Paste this code just before the closing &lt;/body&gt; tag in your HTML file, then save the changes. Refresh your site to ensure your chatbot works correctly.</p>
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
                      <p>Share this link directly with your customers to access the AI chatbot.</p>
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
                <CardTitle>Chatbot Preview</CardTitle>
              </CardHeader>
              <CardContent className="h-[600px]">
                <ChatInterface 
                  title={chatConfig.assistantName}
                  config={{
                    initialMessage: chatConfig.welcomeMessage,
                    modelName: chatConfig.model,
                    maxTokens: 1000,
                    temperature: 0.7
                  }}
                  variant="embedded"
                  language={chatConfig.language}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmbedChatbotPage;
