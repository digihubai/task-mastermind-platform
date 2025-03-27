
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Upload, 
  FileText, 
  Image, 
  MessageSquare, 
  Plus, 
  ArrowLeft, 
  Share2, 
  Settings, 
  Upload as UploadIcon,
  BookOpen,
  Languages,
  ChevronDown,
  Globe,
  BarChart3,
} from "lucide-react";
import SEOIntegrations from "@/components/seo/SEOIntegrations";

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.includes('image/jpeg') || file.type.includes('image/png') || file.type.includes('image/webp'))) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, or WEBP image.",
        variant: "destructive",
      });
    }
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

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={16} />
              <span>Back to dashboard</span>
            </Button>
          </div>
          <Button className="gap-2 rounded-full">
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

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="vision">Vision Analysis</TabsTrigger>
            <TabsTrigger value="seo">SEO Tools</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="vision" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-280px)]">
              <Card className="p-4 col-span-1 h-full overflow-y-auto">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="Search" className="pl-10" />
                </div>

                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`flex items-start gap-3 p-2 rounded cursor-pointer hover:bg-muted/60 ${
                        activeConversation === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <MessageSquare size={18} className="mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{conversation.name}</p>
                        <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="default" 
                  className="w-full mt-4 gap-2"
                  onClick={handleNewConversation}
                >
                  <Plus size={16} />
                  New Conversation
                </Button>
              </Card>

              <Card className="p-4 col-span-3 h-full flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
                      <Image size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">VisionAI</span>
                        <ChevronDown size={16} className="text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">Image Expert</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-full" onClick={handleShare}>
                      Share
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Settings size={18} />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto mb-4 flex flex-col">
                  <div className="flex-1 flex flex-col justify-center items-center px-6 py-10">
                    <div className="flex flex-col items-center mb-6">
                      <h3 className="text-lg font-medium mb-2">Upload an image and ask me anything</h3>
                      <ChevronDown size={18} className="text-muted-foreground" />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="rounded-full"
                        onClick={() => handleQuickPrompt("Explain an Image")}
                      >
                        Explain an Image
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="rounded-full"
                        onClick={() => handleQuickPrompt("Summarize a book for research")}
                      >
                        Summarize a book for research
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="rounded-full"
                        onClick={() => handleQuickPrompt("Translate a book")}
                      >
                        Translate a book
                      </Button>
                    </div>

                    <Card 
                      className="w-full max-w-2xl h-64 border-2 border-dashed flex flex-col items-center justify-center p-6"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-contain"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <UploadIcon size={36} className="text-muted-foreground mb-4" />
                          <p className="text-center font-medium mb-1">Drop your image here or browse</p>
                          <p className="text-center text-sm text-muted-foreground mb-4">(Only jpg, png and webp will be accepted)</p>
                          <Button asChild>
                            <label>
                              Browse Files
                              <input 
                                type="file" 
                                accept="image/jpeg,image/png,image/webp" 
                                className="hidden" 
                                onChange={handleImageUpload}
                              />
                            </label>
                          </Button>
                        </>
                      )}
                    </Card>
                  </div>
                </div>

                <div className="relative">
                  <Input
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="pr-20"
                  />
                  <Button 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full"
                    onClick={handleSendMessage}
                    disabled={!message.trim() && !selectedImage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18" className="rotate-90">
                      <path fill="currentColor" d="M8.459.608a.75.75 0 0 1 1.082 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L9.75 2.939v13.311a.75.75 0 0 1-1.5 0V2.939L2.02 9.168a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"></path>
                    </svg>
                  </Button>
                </div>
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
                    <Search className="mr-2 h-4 w-4" />
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
                  <Button className="w-full mb-4">Connect Google Search Console</Button>
                  <p className="text-xs text-muted-foreground text-center">
                    We'll guide you through the authorization process
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

export default AIVisionPage;
