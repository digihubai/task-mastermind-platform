
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Globe, 
  BarChart, 
  ListChecks, 
  Edit, 
  Copy, 
  Download,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const AISEOWriter = () => {
  const [keyword, setKeyword] = useState("");
  const [contentType, setContentType] = useState("blog-post");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [keywordDensity, setKeywordDensity] = useState(0);
  const [readabilityScore, setReadabilityScore] = useState(0);
  
  const handleGenerateContent = () => {
    if (!keyword.trim()) {
      toast.error("Please enter a keyword to generate content");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const sampleContent = `# ${keyword}: The Ultimate Guide

## Introduction
When it comes to ${keyword}, there's a lot to understand and explore. This comprehensive guide will walk you through everything you need to know about ${keyword} in 2023.

## What is ${keyword}?
${keyword} refers to a specialized approach in the industry that has gained significant attention in recent years. Experts in ${keyword} have noted its importance for businesses looking to gain a competitive edge.

## Why ${keyword} Matters
Understanding ${keyword} is crucial for several reasons:
- It helps improve your overall digital strategy
- It provides insights into customer behavior
- It can significantly boost your conversion rates

## How to Implement ${keyword} Strategies
1. Start with a comprehensive audit
2. Develop a tailored approach for your specific needs
3. Monitor results and adjust accordingly
4. Stay updated with the latest ${keyword} trends

## Conclusion
By leveraging ${keyword} effectively, organizations can see substantial improvements in their performance metrics and stay ahead of the competition.`;
      
      setGeneratedContent(sampleContent);
      setSeoScore(Math.floor(Math.random() * 20) + 80); // 80-100
      setKeywordDensity(Math.floor(Math.random() * 3) + 1); // 1-4%
      setReadabilityScore(Math.floor(Math.random() * 15) + 70); // 70-85
      
      setIsGenerating(false);
      toast.success("SEO content generated successfully!");
    }, 3000);
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Content copied to clipboard!");
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${keyword.replace(/\s+/g, '-').toLowerCase()}-seo-content.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Content downloaded as Markdown!");
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI SEO Writer</h1>
          <p className="text-muted-foreground mt-1">
            Create SEO-optimized content that ranks well on search engines
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-border/40">
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="editor">Content Editor</TabsTrigger>
                  <TabsTrigger value="analysis">SEO Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor">
                  <Textarea
                    placeholder="Generated SEO content will appear here..."
                    className="min-h-[400px] font-mono text-sm resize-none"
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                  />
                  
                  {generatedContent && (
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={handleCopyToClipboard}
                        className="gap-2"
                      >
                        <Copy size={16} />
                        Copy
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handleDownload}
                        className="gap-2"
                      >
                        <Download size={16} />
                        Download
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="analysis">
                  {generatedContent ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4 border border-border/40 bg-green-50 dark:bg-green-900/20">
                          <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                            <BarChart size={18} />
                            <h3 className="font-medium">SEO Score</h3>
                          </div>
                          <p className="text-3xl font-bold mt-2 text-green-700 dark:text-green-400">{seoScore}/100</p>
                          <p className="text-xs text-green-700/70 dark:text-green-400/70 mt-1">
                            {seoScore >= 90 ? 'Excellent' : seoScore >= 80 ? 'Good' : 'Needs Improvement'}
                          </p>
                        </Card>
                        
                        <Card className="p-4 border border-border/40 bg-blue-50 dark:bg-blue-900/20">
                          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                            <Globe size={18} />
                            <h3 className="font-medium">Keyword Density</h3>
                          </div>
                          <p className="text-3xl font-bold mt-2 text-blue-700 dark:text-blue-400">{keywordDensity}%</p>
                          <p className="text-xs text-blue-700/70 dark:text-blue-400/70 mt-1">
                            {keywordDensity >= 3 ? 'High' : keywordDensity >= 2 ? 'Optimal' : 'Low'}
                          </p>
                        </Card>
                        
                        <Card className="p-4 border border-border/40 bg-purple-50 dark:bg-purple-900/20">
                          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                            <Edit size={18} />
                            <h3 className="font-medium">Readability</h3>
                          </div>
                          <p className="text-3xl font-bold mt-2 text-purple-700 dark:text-purple-400">{readabilityScore}/100</p>
                          <p className="text-xs text-purple-700/70 dark:text-purple-400/70 mt-1">
                            {readabilityScore >= 80 ? 'Easy to Read' : readabilityScore >= 70 ? 'Moderate' : 'Complex'}
                          </p>
                        </Card>
                      </div>
                      
                      <Card className="p-4 border border-border/40">
                        <h3 className="font-medium mb-3">SEO Recommendations</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ListChecks className="h-4 w-4 text-green-600 mt-0.5" />
                            <span className="text-sm">Add more relevant heading tags (H2, H3)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ListChecks className="h-4 w-4 text-green-600 mt-0.5" />
                            <span className="text-sm">Include the keyword in the first 100 words</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ListChecks className="h-4 w-4 text-green-600 mt-0.5" />
                            <span className="text-sm">Add more internal and external links</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ListChecks className="h-4 w-4 text-green-600 mt-0.5" />
                            <span className="text-sm">Consider adding image alt text with keywords</span>
                          </li>
                        </ul>
                      </Card>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Generate content to see SEO analysis</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Content Generator</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Target Keyword</label>
                  <Input
                    placeholder="e.g., digital marketing strategies"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Content Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={contentType === "blog-post" ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setContentType("blog-post")}
                    >
                      <Badge variant="outline" className="mr-2">Blog</Badge>
                      Blog Post
                    </Button>
                    
                    <Button
                      variant={contentType === "landing-page" ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setContentType("landing-page")}
                    >
                      <Badge variant="outline" className="mr-2">Page</Badge>
                      Landing Page
                    </Button>
                    
                    <Button
                      variant={contentType === "product-desc" ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setContentType("product-desc")}
                    >
                      <Badge variant="outline" className="mr-2">Prod</Badge>
                      Product Desc
                    </Button>
                    
                    <Button
                      variant={contentType === "meta-tags" ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setContentType("meta-tags")}
                    >
                      <Badge variant="outline" className="mr-2">Meta</Badge>
                      Meta Tags
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  onClick={handleGenerateContent}
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
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">SEO Writing Tips</h3>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Use your target keyword in headings, intro and conclusion</span>
                </li>
                <li className="flex gap-2">
                  <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Create content that answers user's search intent</span>
                </li>
                <li className="flex gap-2">
                  <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Use related keywords and LSI terms throughout</span>
                </li>
                <li className="flex gap-2">
                  <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Maintain readability with short sentences and paragraphs</span>
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
