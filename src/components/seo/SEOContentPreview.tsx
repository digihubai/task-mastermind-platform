
import React from "react";
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

const SEOContentPreview = ({ content = "" }) => {
  if (!content) {
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
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="markdown">
        <TabsList className="mb-4">
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="markdown">
          <Card className="p-4 border border-border/40 bg-muted/30">
            <pre className="whitespace-pre-wrap text-sm font-mono">{content}</pre>
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
          <Button variant="outline">
            <PenTool className="mr-2 h-4 w-4" />
            Edit Content
          </Button>
          <Button variant="outline">
            <CheckCircle className="mr-2 h-4 w-4" />
            Run SEO Check
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Globe className="mr-2 h-4 w-4" />
            Publish to WordPress
          </Button>
          <Button>
            Save and Continue
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
