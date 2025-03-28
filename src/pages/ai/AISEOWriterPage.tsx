
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Edit, 
  Copy, 
  RotateCcw,
  Sparkles,
  Globe,
  BarChart3,
  ArrowUp,
  Calendar,
  RefreshCw,
  CheckCircle2,
  MessageSquare,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import SEOContentPreview from "@/components/seo/SEOContentPreview";
import { generateSEOTitles, generateMockSEOContent } from "@/services/seoService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const AISEOWriterPage = () => {
  const [keyword, setKeyword] = useState("");
  const [contentType, setContentType] = useState("blogPost");
  const [tone, setTone] = useState("professional");
  const [wordCount, setWordCount] = useState("500");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishType, setPublishType] = useState("immediate");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [showCMSOptions, setShowCMSOptions] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [selectedCMS, setSelectedCMS] = useState("wordpress");
  const [publishPlatform, setPublishPlatform] = useState("wordpress");
  
  const [connectedCMS, setConnectedCMS] = useState({
    wordpress: true,
    shopify: false,
    webflow: false,
    medium: false,
    wix: false
  });
  
  const [publicationSettings, setPublicationSettings] = useState({
    addFeaturedImage: true,
    addTags: true,
    setCanonicalUrl: true,
    enableComments: true,
    socialShare: true
  });
  
  const handleGenerateContent = () => {
    if (!keyword.trim()) {
      toast.error("Please enter a target keyword");
      return;
    }
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const content = generateMockSEOContent(keyword, [keyword]);
      setGeneratedContent(content);
      setIsGenerating(false);
      setShowCMSOptions(true);
      toast.success("SEO content generated!");
    }, 2000);
  };
  
  const handleReset = () => {
    setKeyword("");
    setContentType("blogPost");
    setTone("professional");
    setWordCount("500");
    setGeneratedContent("");
    setShowCMSOptions(false);
    toast.info("All fields have been reset");
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handleOpenPublishDialog = () => {
    if (!generatedContent) {
      toast.error("Please generate content first");
      return;
    }
    setPublishDialogOpen(true);
  };

  const handlePublishContent = () => {
    if (publishType === "scheduled" && (!scheduleDate || !scheduleTime)) {
      toast.error("Please select both date and time for scheduled publishing");
      return;
    }

    const publishAction = publishType === "immediate" ? "Publishing" : "Scheduling";
    const scheduledInfo = publishType === "scheduled" ? ` for ${scheduleDate} at ${scheduleTime}` : "";
    const platformName = selectedCMS.charAt(0).toUpperCase() + selectedCMS.slice(1);
    
    toast.success(`${publishAction} to ${platformName}${scheduledInfo}...`);
    
    setTimeout(() => {
      toast.success(`Successfully ${publishType === "immediate" ? "published" : "scheduled"} to ${platformName}${scheduledInfo}`);
      setPublishDialogOpen(false);
    }, 1500);
  };

  const handleSettingChange = (setting: keyof typeof publicationSettings) => {
    setPublicationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const openIntegrationSettings = () => {
    toast.info("Redirecting to integrations settings...");
    // In a real app, you would navigate to the settings page
    // navigate("/settings/integrations", { state: { activeTab: "cms" } });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI SEO Writer</h1>
          <p className="text-muted-foreground mt-1">
            Generate search-optimized content for better rankings and traffic
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-border/40">
              <Tabs defaultValue="input" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="input">Input Parameters</TabsTrigger>
                  <TabsTrigger value="output">Generated Content</TabsTrigger>
                </TabsList>
                
                <TabsContent value="input">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Target Keyword</label>
                      <Input 
                        placeholder="Enter your main SEO keyword or phrase" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Content Type</label>
                        <Select 
                          value={contentType} 
                          onValueChange={setContentType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select content type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blogPost">Blog Post</SelectItem>
                            <SelectItem value="metaDescription">Meta Description</SelectItem>
                            <SelectItem value="productDescription">Product Description</SelectItem>
                            <SelectItem value="landingPage">Landing Page</SelectItem>
                            <SelectItem value="socialPost">Social Media Post</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Tone</label>
                        <Select 
                          value={tone} 
                          onValueChange={setTone}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="conversational">Conversational</SelectItem>
                            <SelectItem value="persuasive">Persuasive</SelectItem>
                            <SelectItem value="educational">Educational</SelectItem>
                            <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Word Count</label>
                        <Select 
                          value={wordCount} 
                          onValueChange={setWordCount}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100">Short (~100 words)</SelectItem>
                            <SelectItem value="300">Brief (~300 words)</SelectItem>
                            <SelectItem value="500">Standard (~500 words)</SelectItem>
                            <SelectItem value="1000">Long (~1000 words)</SelectItem>
                            <SelectItem value="2000">Comprehensive (~2000 words)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      onClick={handleGenerateContent}
                      disabled={isGenerating || !keyword.trim()}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          Generating content...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Generate SEO Content
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="output">
                  <Textarea
                    placeholder="SEO-optimized content will appear here..."
                    className="min-h-[300px] resize-none font-mono text-sm"
                    value={generatedContent}
                    readOnly
                  />
                  
                  {generatedContent && (
                    <div className="flex flex-col gap-4 mt-4">
                      <div className="flex flex-wrap justify-between gap-2">
                        <Button 
                          variant="outline" 
                          onClick={handleReset}
                          className="gap-2"
                        >
                          <RotateCcw size={16} />
                          Reset
                        </Button>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            onClick={handleCopyToClipboard}
                            className="gap-2"
                          >
                            <Copy size={16} />
                            Copy
                          </Button>
                          
                          <Button 
                            onClick={handleOpenPublishDialog}
                            className="gap-2"
                          >
                            <Globe size={16} />
                            Publish to CMS
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>

            {generatedContent && (
              <SEOContentPreview content={generatedContent} />
            )}
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">SEO Performance</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Keyword Optimization</span>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      Excellent
                      <ArrowUp className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Readability</span>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      Good
                      <ArrowUp className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Originality</span>
                    <span className="text-sm font-medium text-amber-600 flex items-center">
                      Moderate
                      <ArrowUp className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">SEO Tips</h3>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Search className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Include your target keyword in title, headings, and first paragraph</span>
                </li>
                <li className="flex gap-2">
                  <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Add relevant internal and external links</span>
                </li>
                <li className="flex gap-2">
                  <Edit className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Keep paragraphs short (3-4 sentences max)</span>
                </li>
                <li className="flex gap-2">
                  <BarChart3 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Maintain keyword density between 1-2%</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Connected CMS</h3>
                <Button variant="outline" size="sm" onClick={openIntegrationSettings}>
                  <Settings size={16} className="mr-2" />
                  Settings
                </Button>
              </div>
              
              <div className="space-y-3">
                {Object.entries(connectedCMS).map(([cms, isConnected]) => (
                  <div 
                    key={cms} 
                    className={`flex items-center gap-3 p-3 rounded-md border ${
                      isConnected ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20' : 'border-border'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${isConnected ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-secondary text-muted-foreground'}`}>
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="font-medium">{cms.charAt(0).toUpperCase() + cms.slice(1)}</p>
                      {isConnected ? (
                        <p className="text-xs text-green-700 dark:text-green-400 flex items-center">
                          <CheckCircle2 size={12} className="mr-1" />
                          Connected
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Not connected</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Publish Content to CMS</DialogTitle>
              <DialogDescription>
                Choose where and how to publish your generated SEO content
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="publish-platform">Platform</Label>
                <div className="flex flex-col space-y-2">
                  <Select
                    value={publishPlatform}
                    onValueChange={setPublishPlatform}
                  >
                    <SelectTrigger id="publish-platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="webflow">Webflow</SelectItem>
                      <SelectItem value="custom">Custom CMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Publication Type</Label>
                <div className="mt-1">
                  <Select 
                    value={publishType} 
                    onValueChange={setPublishType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select publication type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Publish Immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule Publication</SelectItem>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {publishType === "scheduled" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Publication Date</Label>
                    <Input 
                      type="date" 
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Publication Time</Label>
                    <Input 
                      type="time" 
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <Label>Publication Settings</Label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="add-featured-image" 
                      checked={publicationSettings.addFeaturedImage}
                      onCheckedChange={() => handleSettingChange('addFeaturedImage')}
                    />
                    <label
                      htmlFor="add-featured-image"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Add featured image (from selected images)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="add-tags" 
                      checked={publicationSettings.addTags}
                      onCheckedChange={() => handleSettingChange('addTags')}
                    />
                    <label
                      htmlFor="add-tags"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Add selected keywords as tags
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="canonical-url" 
                      checked={publicationSettings.setCanonicalUrl}
                      onCheckedChange={() => handleSettingChange('setCanonicalUrl')}
                    />
                    <label
                      htmlFor="canonical-url"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Set canonical URL automatically
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="enable-comments" 
                      checked={publicationSettings.enableComments}
                      onCheckedChange={() => handleSettingChange('enableComments')}
                    />
                    <label
                      htmlFor="enable-comments"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable comments
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="social-share" 
                      checked={publicationSettings.socialShare}
                      onCheckedChange={() => handleSettingChange('socialShare')}
                    />
                    <label
                      htmlFor="social-share"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Auto-share to social media (if connected)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setPublishDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePublishContent}>
                {publishType === "immediate"
                  ? "Publish Now"
                  : publishType === "scheduled"
                  ? "Schedule Publication"
                  : "Save as Draft"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="seo-tools" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 max-w-md">
            <TabsTrigger value="seo-tools">SEO Tools</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="seo-tools">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Advanced SEO Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
                      <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-medium">Keyword Research</h4>
                    <p className="text-xs text-muted-foreground">Find high-value keywords for your content</p>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full">
                      <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-medium">SERP Analysis</h4>
                    <p className="text-xs text-muted-foreground">Analyze top-ranking content for any keyword</p>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full">
                      <Edit className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-medium">Content Audit</h4>
                    <p className="text-xs text-muted-foreground">Evaluate and optimize your existing content</p>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Content Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border border-border/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">WordPress</h4>
                      <p className="text-xs text-muted-foreground mt-1">Direct publishing to WordPress sites</p>
                      <p className="text-xs text-green-600 mt-2">Connected</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border border-border/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
                      <Edit className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Medium</h4>
                      <p className="text-xs text-muted-foreground mt-1">Publish articles to Medium</p>
                      <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Connect</Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border border-border/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Webflow</h4>
                      <p className="text-xs text-muted-foreground mt-1">Publish to Webflow CMS</p>
                      <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Connect</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AISEOWriterPage;
