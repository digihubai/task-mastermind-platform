import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Globe, FileText, BarChart3 } from "lucide-react";
import SEOIntegrations from "@/components/seo/SEOIntegrations";

// Import refactored components
import ConversationList from "@/components/vision/ConversationList";
import VisionUploader from "@/components/vision/VisionUploader";
import VisionChatHeader from "@/components/vision/VisionChatHeader";
import QuickPrompts from "@/components/vision/QuickPrompts";
import MessageInput from "@/components/vision/MessageInput";
import VisionBackButton from "@/components/vision/VisionBackButton";
import VisionTabs from "@/components/vision/VisionTabs";

const AIVisionPage = () => {
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState([
    { id: "1", name: "VisionAI Chat", timestamp: "1 week ago" }
  ]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState("vision");

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image uploaded",
      description: "Your image has been uploaded successfully."
    });
  };

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      name: "New Conversation",
      timestamp: "Just now",
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation.id);
    setSelectedImage(null);
    setImagePreview(null);
    setMessage("");
  };

  const handleSendMessage = () => {
    if (message.trim() || selectedImage) {
      toast({
        title: "Processing...",
        description: "Your request is being processed.",
      });
      setMessage("");
    }
  };

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: "Your analysis has been shared successfully.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Vision AI settings panel will open soon.",
    });
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        <div className="flex justify-between items-center">
          <VisionBackButton />
          <Button className="gap-2 rounded-full" onClick={handleNewConversation}>
            <Plus size={16} />
            <span>New</span>
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Vision AI</h1>
          <p className="text-muted-foreground mt-1">
            Seamlessly upload any image you want to explore and get insightful conversations.
          </p>
        </div>

        <VisionTabs selectedTab={selectedTab} onTabChange={setSelectedTab}>
          <TabsContent value="vision" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-280px)]">
              <Card className="p-4 col-span-1 h-full overflow-y-auto">
                <ConversationList 
                  conversations={conversations}
                  activeConversation={activeConversation}
                  onSelectConversation={setActiveConversation}
                  onNewConversation={handleNewConversation}
                />
              </Card>

              <Card className="p-4 col-span-3 h-full flex flex-col overflow-hidden">
                <VisionChatHeader 
                  onShare={handleShare}
                  onSettings={handleSettings}
                />

                <div className="flex-1 overflow-y-auto mb-4 flex flex-col">
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <QuickPrompts onSelectPrompt={setMessage} />
                    <VisionUploader 
                      imagePreview={imagePreview}
                      onImageUpload={handleImageUpload}
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                </div>

                <MessageInput 
                  message={message}
                  onMessageChange={setMessage}
                  onSendMessage={handleSendMessage}
                  disabled={!message.trim() && !selectedImage}
                />
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-6">
            <Card className="p-6 border border-border/40">
              <h2 className="text-xl font-semibold mb-4">Advanced SEO Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full inline-block">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium">Keyword Research</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlimited topical authority clusters to dominate competitive search terms
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">1,000+ Keywords</Badge>
                    <Badge variant="outline">Competitor Analysis</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full inline-block">
                    <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium">Page Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Up to 1,000 optimized pages with code changes for technical SEO excellence
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Technical SEO</Badge>
                    <Badge variant="outline">Page Performance</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full inline-block">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium">SEO Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    In-depth reporting and analytics to track your search performance
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline">Rank Tracking</Badge>
                    <Badge variant="outline">ROI Analysis</Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-4">Quick SEO Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    Keyword Research
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Content Audit
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    Rank Tracker
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    SEO Analytics
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <SEOIntegrations />
            
            <Card className="mt-6 p-6 border border-border/40">
              <h2 className="text-xl font-semibold mb-4">Google Search Console Integration</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Connect your Google Search Console account to get real-time data and insights about your website's search performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1 rounded-full mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.5 7L6 9.5L10.5 5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm">Track keyword performance across all your pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1 rounded-full mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.5 7L6 9.5L10.5 5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm">Identify indexing issues and fix them automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-green-50 dark:bg-green-900/20 p-1 rounded-full mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.5 7L6 9.5L10.5 5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm">Receive optimization recommendations based on search data</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <Button className="w-full mb-4" onClick={() => {
                    toast({
                      title: "Connection initiated",
                      description: "We're connecting to Google Search Console...",
                    });
                  }}>Connect Google Search Console</Button>
                  <p className="text-xs text-muted-foreground text-center">
                    We'll guide you through the authorization process
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </VisionTabs>
      </div>
    </AppLayout>
  );
};

export default AIVisionPage;
