
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
  ArrowUp
} from "lucide-react";
import { toast } from "sonner";

const AISEOWriter = () => {
  const [keyword, setKeyword] = useState("");
  const [contentType, setContentType] = useState("blogPost");
  const [tone, setTone] = useState("professional");
  const [wordCount, setWordCount] = useState("500");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = () => {
    if (!keyword.trim()) {
      toast.error("Please enter a target keyword");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const contentTypeFormats = {
        blogPost: "# Blog Post",
        metaDescription: "Meta Description",
        productDescription: "## Product Description",
        landingPage: "# Landing Page Content",
        socialPost: "Social Media Post"
      };
      
      const format = contentTypeFormats[contentType as keyof typeof contentTypeFormats];
      
      setGeneratedContent(`${format}: ${keyword}\n\nThis is an SEO-optimized ${contentType} about "${keyword}" in a ${tone} tone that is approximately ${wordCount} words in length.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n## Key SEO Elements\n\n- Primary keyword "${keyword}" used in title, headings, and body\n- Secondary keywords included naturally\n- Optimized heading structure (H1, H2, H3)\n- Proper keyword density (2-3%)\n- Meta description optimized for click-through\n- Internal and external linking opportunities\n\nThis content is designed to rank well for "${keyword}" while providing value to readers and maintaining a natural, engaging ${tone} tone.`);
      
      setIsGenerating(false);
      toast.success("SEO content generated!");
    }, 2000);
  };
  
  const handleReset = () => {
    setKeyword("");
    setContentType("blogPost");
    setTone("professional");
    setWordCount("500");
    setGeneratedContent("");
    toast.info("All fields have been reset");
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
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
                    <div className="flex justify-between mt-4">
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
                  )}
                </TabsContent>
              </Tabs>
            </Card>
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
      </div>
    </AppLayout>
  );
};

export default AISEOWriter;
