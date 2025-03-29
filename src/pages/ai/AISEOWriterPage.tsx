
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, File, Layers, Globe, Search, Copy, FileCheck, FileEdit, Link as LinkIcon, ListChecks } from "lucide-react";
import { toast } from "sonner";
import { useContentGeneration } from "@/hooks/useContentGeneration";
import AIKeyConfig from "@/components/settings/integrations/AIKeyConfig";
import { getOpenAIApiKey } from "@/services/ai/contentGenerationAI";

const AISEOWriterPage = () => {
  const [activeTab, setActiveTab] = useState("topic");
  const [seoData, setSeoData] = useState({
    topic: "",
    keywords: "",
    selectedKeywords: [],
    contentType: "blog",
    toneOfVoice: "professional",
    targetAudience: "",
    wordCount: "1000",
    outline: [],
    selectedOutline: null,
    generatedContent: "",
    isGenerating: false,
    title: "",
    metaDescription: "",
  });
  
  const hasAPIKey = !!getOpenAIApiKey();
  
  const onDataChange = (field: string, value: any) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const { 
    handleCopyToClipboard, 
    handleOpenLinkDialog, 
    handleFixFormatting,
    showLinkDialog, 
    setShowLinkDialog,
    linkType, 
    setLinkType,
    isLoadingLinks,
    handleAddLinks
  } = useContentGeneration({ 
    seoData, 
    onDataChange 
  });
  
  const handleGenerateContent = () => {
    if (!hasAPIKey) {
      toast.error("Please set up your OpenAI API key first");
      return;
    }
    
    if (!seoData.topic) {
      toast.error("Please enter a topic first");
      return;
    }
    
    onDataChange("isGenerating", true);
    
    // Simulate content generation
    setTimeout(() => {
      const demoContent = `
# ${seoData.topic}: A Comprehensive Guide

## Introduction
${seoData.topic} has become increasingly important in today's digital landscape. This guide will explore the key aspects and best practices of ${seoData.topic}.

## Why ${seoData.topic} Matters
Understanding the significance of ${seoData.topic} can dramatically improve your website's performance and user engagement. This section explores the critical reasons why you should focus on ${seoData.topic}.

## Key Strategies for ${seoData.topic}
Here are some effective strategies to implement:

1. Research your target audience thoroughly
2. Create valuable and relevant content
3. Optimize for search engines
4. Track and analyze your results

## Common Mistakes to Avoid
When working with ${seoData.topic}, avoid these pitfalls:

- Focusing too much on keywords rather than user intent
- Ignoring mobile optimization
- Neglecting technical SEO aspects
- Not updating content regularly

## Conclusion
By implementing these strategies and avoiding common mistakes, you can effectively leverage ${seoData.topic} to improve your online presence and achieve better results.
`;
      
      onDataChange("generatedContent", demoContent);
      onDataChange("isGenerating", false);
      onDataChange("title", `The Ultimate Guide to ${seoData.topic}`);
      onDataChange("metaDescription", `Learn everything about ${seoData.topic} with our comprehensive guide. Discover strategies, best practices, and expert tips to master ${seoData.topic}.`);
      
      toast.success("Content generated successfully!");
    }, 3000);
  };
  
  const handleKeywordSelect = (keyword: string) => {
    const keywords = seoData.selectedKeywords || [];
    if (keywords.includes(keyword)) {
      onDataChange("selectedKeywords", keywords.filter(k => k !== keyword));
    } else {
      onDataChange("selectedKeywords", [...keywords, keyword]);
    }
  };
  
  const handleNextStep = () => {
    const tabs = ["topic", "keywords", "outline", "content", "meta"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };
  
  const handlePreviousStep = () => {
    const tabs = ["topic", "keywords", "outline", "content", "meta"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };
  
  const suggestedKeywords = [
    "SEO optimization",
    "content marketing",
    "digital strategy",
    "search ranking",
    "user experience",
    "conversion rate",
    "meta tags",
    "keyword research",
    "backlinks",
    "mobile friendly"
  ];
  
  const outlineTemplates = [
    {
      id: 1,
      title: "Standard Guide",
      sections: [
        "Introduction",
        "What is [Topic]",
        "Benefits of [Topic]",
        "How to Implement [Topic]",
        "Best Practices",
        "Common Mistakes to Avoid",
        "Conclusion"
      ]
    },
    {
      id: 2,
      title: "Tutorial Format",
      sections: [
        "Introduction",
        "Prerequisites",
        "Step 1: Getting Started",
        "Step 2: Basic Implementation",
        "Step 3: Advanced Techniques",
        "Troubleshooting",
        "Summary"
      ]
    },
    {
      id: 3,
      title: "Comparison Article",
      sections: [
        "Introduction",
        "Overview of Options",
        "Option 1: Features & Benefits",
        "Option 2: Features & Benefits",
        "Side-by-Side Comparison",
        "Which One Is Right For You?",
        "Conclusion"
      ]
    }
  ];

  if (!hasAPIKey) {
    return (
      <AppLayout>
        <div className="container py-8 max-w-5xl">
          <h1 className="text-3xl font-bold mb-6">AI SEO Writer</h1>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles size={20} className="text-purple-500" />
                API Configuration Required
              </CardTitle>
              <CardDescription>
                Please set up your OpenAI API key to use the AI SEO Writer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIKeyConfig 
                onValidKeySet={() => {
                  toast.success("API key configured successfully!");
                  window.location.reload();
                }} 
              />
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">AI SEO Writer</h1>
            <p className="text-muted-foreground">Generate SEO-optimized content for your website</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button variant="outline">Templates</Button>
            <Button variant="outline">Saved Content</Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="topic" className="flex gap-2">
                <File size={16} />
                <span className="hidden sm:inline">Topic</span>
              </TabsTrigger>
              <TabsTrigger value="keywords" className="flex gap-2">
                <Search size={16} />
                <span className="hidden sm:inline">Keywords</span>
              </TabsTrigger>
              <TabsTrigger value="outline" className="flex gap-2">
                <Layers size={16} />
                <span className="hidden sm:inline">Outline</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex gap-2">
                <FileEdit size={16} />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="meta" className="flex gap-2">
                <Globe size={16} />
                <span className="hidden sm:inline">Meta</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="topic">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic or Title</Label>
                    <Input 
                      id="topic" 
                      placeholder="E.g., 'How to Improve Website SEO'" 
                      value={seoData.topic}
                      onChange={(e) => onDataChange("topic", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="content-type">Content Type</Label>
                      <Select 
                        value={seoData.contentType}
                        onValueChange={(value) => onDataChange("contentType", value)}
                      >
                        <SelectTrigger id="content-type">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog">Blog Post</SelectItem>
                          <SelectItem value="landing">Landing Page</SelectItem>
                          <SelectItem value="product">Product Description</SelectItem>
                          <SelectItem value="guide">Guide / Tutorial</SelectItem>
                          <SelectItem value="news">News Article</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tone">Tone of Voice</Label>
                      <Select 
                        value={seoData.toneOfVoice}
                        onValueChange={(value) => onDataChange("toneOfVoice", value)}
                      >
                        <SelectTrigger id="tone">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                          <SelectItem value="informative">Informative</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="target-audience">Target Audience</Label>
                    <Input 
                      id="target-audience" 
                      placeholder="E.g., 'Small business owners'" 
                      value={seoData.targetAudience}
                      onChange={(e) => onDataChange("targetAudience", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="word-count">Approximate Word Count</Label>
                    <Select 
                      value={seoData.wordCount}
                      onValueChange={(value) => onDataChange("wordCount", value)}
                    >
                      <SelectTrigger id="word-count">
                        <SelectValue placeholder="Select word count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">~500 words (Short)</SelectItem>
                        <SelectItem value="1000">~1000 words (Medium)</SelectItem>
                        <SelectItem value="1500">~1500 words (Long)</SelectItem>
                        <SelectItem value="2000">~2000 words (Comprehensive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div></div>
                <Button onClick={handleNextStep} disabled={!seoData.topic}>Next</Button>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="keywords">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="keywords">Primary Keywords (Optional)</Label>
                    <Textarea 
                      id="keywords" 
                      placeholder="Enter your target keywords, separated by commas" 
                      className="min-h-[100px]"
                      value={seoData.keywords}
                      onChange={(e) => onDataChange("keywords", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label className="block mb-2">Suggested Keywords</Label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedKeywords.map((keyword, index) => (
                        <Button
                          key={index}
                          variant={seoData.selectedKeywords?.includes(keyword) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleKeywordSelect(keyword)}
                        >
                          {keyword}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>Back</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="outline">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label className="block mb-2">Choose an Outline Template</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {outlineTemplates.map((template) => (
                      <Card 
                        key={template.id} 
                        className={`cursor-pointer border-2 transition-all ${seoData.selectedOutline === template.id ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                        onClick={() => onDataChange("selectedOutline", template.id)}
                      >
                        <CardHeader>
                          <CardTitle className="text-base">{template.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1">
                            {template.sections.map((section, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <ListChecks size={14} className="text-muted-foreground flex-shrink-0" />
                                <span>{section}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>Back</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="content">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {!seoData.generatedContent ? (
                    <div className="text-center space-y-4 py-8">
                      <Sparkles size={40} className="mx-auto text-purple-500" />
                      <h3 className="text-xl font-medium">Generate Your SEO Content</h3>
                      <p className="text-muted-foreground">
                        Click the button below to generate SEO-optimized content based on your preferences.
                      </p>
                      <Button 
                        size="lg" 
                        className="mx-auto mt-2"
                        onClick={handleGenerateContent}
                        disabled={seoData.isGenerating}
                      >
                        {seoData.isGenerating ? (
                          <>Generating Content...</>
                        ) : (
                          <>
                            <Sparkles size={16} className="mr-2" />
                            Generate Content
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                            <Copy size={14} className="mr-1" /> Copy
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleOpenLinkDialog}>
                            <LinkIcon size={14} className="mr-1" /> Add Links
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleFixFormatting}>
                            <FileCheck size={14} className="mr-1" /> Fix Formatting
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleGenerateContent}>Regenerate</Button>
                      </div>
                      
                      <Textarea 
                        className="min-h-[400px] font-mono text-sm"
                        value={seoData.generatedContent}
                        onChange={(e) => onDataChange("generatedContent", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>Back</Button>
                <Button onClick={handleNextStep} disabled={!seoData.generatedContent}>Next</Button>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="meta">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meta-title">SEO Title</Label>
                    <Input 
                      id="meta-title" 
                      placeholder="Enter SEO title (50-60 characters recommended)" 
                      value={seoData.title}
                      onChange={(e) => onDataChange("title", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {seoData.title.length} characters (50-60 recommended)
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea 
                      id="meta-description" 
                      placeholder="Enter meta description (150-160 characters recommended)" 
                      value={seoData.metaDescription}
                      onChange={(e) => onDataChange("metaDescription", e.target.value)}
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {seoData.metaDescription.length} characters (150-160 recommended)
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-1">SERP Preview</h3>
                    <div className="mt-2">
                      <p className="text-blue-600 text-base font-medium line-clamp-1">
                        {seoData.title || "Page Title"}
                      </p>
                      <p className="text-green-700 text-xs">example.com/page</p>
                      <p className="text-sm line-clamp-2 text-gray-700">
                        {seoData.metaDescription || "This is how your meta description will appear in search results. Make sure it's compelling and contains your target keywords."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>Back</Button>
                <Button>Save & Publish</Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AISEOWriterPage;
