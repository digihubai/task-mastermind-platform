
import React, { useState } from "react";
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
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import SEOContentPreview from "@/components/seo/SEOContentPreview";
import { generateMockSEOContent } from "@/services/seoService";

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
  const [showWordPressOptions, setShowWordPressOptions] = useState(false);
  
  const handleGenerate = () => {
    if (!keyword.trim()) {
      toast.error("Please enter a target keyword");
      return;
    }
    
    setIsGenerating(true);
    
    // Generate SEO content using the service
    setTimeout(() => {
      const content = generateMockSEOContent(keyword, [keyword]);
      setGeneratedContent(content);
      setIsGenerating(false);
      toast.success("SEO content generated!");
      setShowWordPressOptions(true);
    }, 2000);
  };
  
  const handleReset = () => {
    setKeyword("");
    setContentType("blogPost");
    setTone("professional");
    setWordCount("500");
    setGeneratedContent("");
    setShowWordPressOptions(false);
    toast.info("All fields have been reset");
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handlePublishToWordPress = () => {
    if (publishType === "scheduled" && (!scheduleDate || !scheduleTime)) {
      toast.error("Please select both date and time for scheduled publishing");
      return;
    }

    const publishAction = publishType === "immediate" ? "Publishing" : "Scheduling";
    const scheduledInfo = publishType === "scheduled" ? ` for ${scheduleDate} at ${scheduleTime}` : "";
    
    toast.success(`${publishAction} to WordPress${scheduledInfo}...`);
    
    // Simulate publishing process
    setTimeout(() => {
      toast.success(`Successfully ${publishType === "immediate" ? "published" : "scheduled"} to WordPress${scheduledInfo}`);
    }, 1500);
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
                      onClick={handleGenerate}
                      disabled={isGenerating || !keyword.trim()}
                    >
                      {isGenerating ? (
                        <>Generating content...</>
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
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={handleReset}
                          className="gap-2"
                        >
                          <RotateCcw size={16} />
                          Reset
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          onClick={handleCopyToClipboard}
                          className="gap-2"
                        >
                          <Copy size={16} />
                          Copy
                        </Button>
                      </div>

                      {showWordPressOptions && (
                        <Card className="p-4 mt-2 border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Globe size={16} className="text-green-600" />
                            WordPress Publishing Options
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Select 
                                value={publishType} 
                                onValueChange={setPublishType}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Publish type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="immediate">Publish Immediately</SelectItem>
                                  <SelectItem value="scheduled">Schedule Publication</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {publishType === "scheduled" && (
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-xs font-medium mb-1 block">Date</label>
                                  <Input 
                                    type="date" 
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                  />
                                </div>
                                <div>
                                  <label className="text-xs font-medium mb-1 block">Time</label>
                                  <Input 
                                    type="time" 
                                    value={scheduleTime}
                                    onChange={(e) => setScheduleTime(e.target.value)}
                                  />
                                </div>
                              </div>
                            )}
                            
                            <Button 
                              onClick={handlePublishToWordPress}
                              className="w-full gap-2"
                              variant="secondary"
                            >
                              {publishType === "immediate" ? (
                                <>
                                  <Globe size={16} />
                                  Publish to WordPress
                                </>
                              ) : (
                                <>
                                  <Calendar size={16} />
                                  Schedule for WordPress
                                </>
                              )}
                            </Button>
                          </div>
                        </Card>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>

            {/* Add SEO Content Preview Component */}
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
          </div>
        </div>

        {/* Add SEO tools and integrations tabs section */}
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
                      <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Google Search Console</h4>
                      <p className="text-xs text-muted-foreground mt-1">Track search performance</p>
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
