
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  Copy, 
  Download, 
  FileText,
  CheckCircle, 
  AlertCircle, 
  PenTool,
  Globe
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SEOContentPreviewProps {
  seoData?: any;
  content?: string;
  onDataChange?: (field: string, value: any) => void;
}

const SEOContentPreview: React.FC<SEOContentPreviewProps> = ({ seoData, content = "", onDataChange }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("markdown");
  const [isSaving, setSaving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Use the content from seoData if provided
  const displayContent = seoData?.content || content;
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(displayContent);
    toast({
      title: "Content copied",
      description: "The content has been copied to your clipboard.",
    });
  };
  
  const handleExportContent = () => {
    const blob = new Blob([displayContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${seoData?.title || "seo-content"}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Content exported",
      description: "The content has been exported as a Markdown file.",
    });
  };
  
  const handleEditContent = () => {
    // This would typically open an editor modal or navigate to an editing page
    toast({
      title: "Edit mode",
      description: "Content editing functionality would open here.",
    });
  };
  
  const handleRunSEOCheck = () => {
    setIsChecking(true);
    
    // Simulate SEO check
    setTimeout(() => {
      setIsChecking(false);
      toast({
        title: "SEO Check Complete",
        description: "Your content has been analyzed for SEO optimization.",
      });
    }, 1500);
  };
  
  const handlePublishToWordPress = () => {
    setIsPublishing(true);
    
    // Simulate WordPress publishing
    setTimeout(() => {
      setIsPublishing(false);
      toast({
        title: "Content Published",
        description: "Your content has been published to WordPress.",
      });
    }, 2000);
  };
  
  const handleSaveAndContinue = () => {
    setSaving(true);
    
    // Simulate saving process
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Success",
        description: "Your content has been saved successfully.",
      });
      
      // Update parent component state if onDataChange is provided
      if (onDataChange) {
        onDataChange("savedContent", displayContent);
      }
    }, 1000);
  };

  if (!displayContent) {
    content = `# The Ultimate Guide to Content Marketing

## Introduction

Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience — and, ultimately, to drive profitable customer action.

### Why Content Marketing Matters

In today's digital landscape, consumers are overwhelmed with advertisements and promotional messages. Content marketing cuts through the noise by providing useful information that addresses customer pain points and questions.

## Key Benefits of Content Marketing

1. **Builds trust and credibility** with your audience
2. **Improves brand awareness** and recognition
3. **Creates lasting relationships** with customers
4. **Generates quality leads** that convert to sales
5. **Establishes authority** in your industry

## Effective Content Marketing Strategies

### 1. Know Your Audience

Understanding your target audience is crucial for content marketing success. Develop detailed buyer personas that outline:

- Demographics (age, location, job title)
- Challenges and pain points
- Goals and motivations
- Preferred content formats and channels`;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Content Preview</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyContent}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportContent}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="markdown" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="markdown">
          <Card className="p-4 border border-border/40 bg-muted/30">
            <pre className="whitespace-pre-wrap text-sm font-mono">{displayContent}</pre>
          </Card>
        </TabsContent>
        
        <TabsContent value="html">
          <Card className="p-4 border border-border/40 bg-muted/30">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {`<h1>The Ultimate Guide to Content Marketing</h1>
<h2>Introduction</h2>
<p>Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience — and, ultimately, to drive profitable customer action.</p>
<h3>Why Content Marketing Matters</h3>
<p>In today's digital landscape, consumers are overwhelmed with advertisements and promotional messages. Content marketing cuts through the noise by providing useful information that addresses customer pain points and questions.</p>
<h2>Key Benefits of Content Marketing</h2>
<ol>
  <li><strong>Builds trust and credibility</strong> with your audience</li>
  <li><strong>Improves brand awareness</strong> and recognition</li>
  <li><strong>Creates lasting relationships</strong> with customers</li>
  <li><strong>Generates quality leads</strong> that convert to sales</li>
  <li><strong>Establishes authority</strong> in your industry</li>
</ol>`}
            </pre>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card className="p-6 border border-border/40">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h1>The Ultimate Guide to Content Marketing</h1>
              <h2>Introduction</h2>
              <p>Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience — and, ultimately, to drive profitable customer action.</p>
              <h3>Why Content Marketing Matters</h3>
              <p>In today's digital landscape, consumers are overwhelmed with advertisements and promotional messages. Content marketing cuts through the noise by providing useful information that addresses customer pain points and questions.</p>
              <h2>Key Benefits of Content Marketing</h2>
              <ol>
                <li><strong>Builds trust and credibility</strong> with your audience</li>
                <li><strong>Improves brand awareness</strong> and recognition</li>
                <li><strong>Creates lasting relationships</strong> with customers</li>
                <li><strong>Generates quality leads</strong> that convert to sales</li>
                <li><strong>Establishes authority</strong> in your industry</li>
              </ol>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleEditContent}>
            <PenTool className="mr-2 h-4 w-4" />
            Edit Content
          </Button>
          <Button variant="outline" onClick={handleRunSEOCheck} disabled={isChecking}>
            <CheckCircle className="mr-2 h-4 w-4" />
            {isChecking ? "Running Check..." : "Run SEO Check"}
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePublishToWordPress} disabled={isPublishing}>
            <Globe className="mr-2 h-4 w-4" />
            {isPublishing ? "Publishing..." : "Publish to WordPress"}
          </Button>
          <Button onClick={handleSaveAndContinue} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save and Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="p-4 mt-6 border border-border/40 bg-muted/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">SEO Suggestions</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Consider adding more keywords related to "content strategy" and "content ROI" to improve search rankings. Your readability score is excellent.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SEOContentPreview;
