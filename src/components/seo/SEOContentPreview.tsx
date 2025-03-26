
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, FileText, Check, BarChart2, Send, Download, Copy, ExternalLink, RefreshCw, WordPress } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SEOContentPreviewProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOContentPreview: React.FC<SEOContentPreviewProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [activePreviewTab, setActivePreviewTab] = useState("preview");
  const [exportTarget, setExportTarget] = useState("wordpress");

  useEffect(() => {
    // Auto-generate content on component mount if we have the required data
    if (!generatedContent && seoData.title && seoData.outline) {
      handleGenerateContent();
    }
  }, []);

  const handleGenerateContent = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockContent = `
# ${seoData.title || "10 Ways AI Chatbots Are Revolutionizing Customer Support"}

![AI Chatbot](${seoData.featuredImage || "https://via.placeholder.com/800x400"})

## Introduction to AI Chatbots

In today's fast-paced digital world, businesses are constantly seeking ways to improve customer service while optimizing resources. Artificial intelligence, particularly in the form of chatbots, has emerged as a revolutionary solution to this challenge. AI chatbots are transforming how companies interact with their customers, providing immediate responses and personalized assistance around the clock.

These intelligent virtual assistants leverage natural language processing (NLP) and machine learning to understand customer inquiries and deliver relevant, helpful responses. Unlike their rule-based predecessors, modern AI chatbots can interpret context, learn from interactions, and continuously improve their performance.

## The Evolution of Conversational AI

The journey of conversational AI began with simple rule-based systems that could only respond to specific commands or questions. These early chatbots were limited in their capabilities and often frustrated users with their inability to understand natural language or handle complex queries.

As technology advanced, so did chatbots. The integration of machine learning algorithms and natural language understanding has enabled modern chatbots to:

- Process and understand natural human language
- Detect user sentiment and emotions
- Remember conversation context across sessions
- Learn from past interactions to improve future responses
- Handle multiple topics within a single conversation

This evolution has transformed chatbots from basic automated response systems to sophisticated virtual assistants capable of delivering human-like conversational experiences.

## Key Benefits of AI-Powered Customer Support

### 24/7 Availability

One of the most significant advantages of AI chatbots is their ability to provide round-the-clock support. Unlike human agents who need breaks and work specific hours, chatbots are always available to assist customers, regardless of time zones or holidays.

### Instant Response Times

In an era where customers expect immediate assistance, chatbots excel by providing instant responses. While human agents might take minutes or even hours to reply, AI chatbots can process and respond to queries within seconds, dramatically improving customer satisfaction.

### Cost Efficiency

Implementing AI chatbots can significantly reduce customer service costs. By handling routine inquiries automatically, businesses can allocate their human resources to more complex issues that require empathy and advanced problem-solving skills.

### Scalability

AI chatbots can handle unlimited conversations simultaneously, making them infinitely scalable. During peak periods or sudden surges in customer inquiries, chatbots maintain consistent performance without the need for additional resources.

### Personalized Customer Experiences

Modern AI chatbots can access customer data and interaction history to provide personalized experiences. By recognizing returning customers and remembering their preferences, chatbots can deliver tailored recommendations and solutions that increase customer satisfaction and loyalty.

## Implementing AI Chatbots in Your Business

Successfully integrating AI chatbots into your customer service strategy requires careful planning and execution. Here are some key considerations:

1. **Define your objectives**: Clearly outline what you want your chatbot to achieve, whether it's reducing response times, increasing customer satisfaction, or lowering support costs.

2. **Choose the right platform**: Select a chatbot platform that aligns with your business needs, technical capabilities, and integration requirements.

3. **Design conversational flows**: Create natural conversation paths that address common customer inquiries while maintaining a consistent brand voice.

4. **Train your AI**: Provide your chatbot with quality data to learn from, including previous customer interactions and frequently asked questions.

5. **Integrate with existing systems**: Connect your chatbot to CRM systems, knowledge bases, and other relevant tools to enhance its capabilities.

6. **Test thoroughly**: Before full deployment, test your chatbot across various scenarios to identify and fix any issues.

7. **Monitor and optimize**: Continuously analyze chatbot performance and customer feedback to make necessary improvements.

## Measuring Success

To evaluate the effectiveness of your AI chatbot implementation, consider these key metrics:

- **Resolution rate**: The percentage of inquiries successfully resolved by the chatbot without human intervention
- **Customer satisfaction scores**: Feedback from users after interacting with the chatbot
- **Engagement metrics**: The number of messages exchanged and conversation duration
- **Handoff rate**: How often conversations are escalated to human agents
- **Cost savings**: Reduction in customer service expenses compared to traditional methods

Regular analysis of these metrics will help you identify strengths and areas for improvement in your chatbot strategy.

## Future Trends in AI Conversation

The field of conversational AI continues to evolve rapidly. Here are some emerging trends that will shape the future of AI chatbots:

### Voice-Based Interfaces

As voice recognition technology improves, voice-based chatbots are becoming increasingly popular. These systems provide a more natural interaction method, especially for users who prefer speaking over typing.

### Emotional Intelligence

Next-generation chatbots will better understand and respond to human emotions, enabling them to provide more empathetic and appropriate responses based on the user's emotional state.

### Proactive Engagement

Rather than waiting for customers to initiate conversations, future chatbots will proactively engage users based on their behavior, offering assistance before problems arise.

### Multimodal Interactions

Advanced chatbots will combine text, voice, images, and even video to create richer, more comprehensive communication channels with users.

## Conclusion

AI chatbots are revolutionizing customer support by providing instant, personalized assistance at scale. As these technologies continue to evolve, businesses that effectively implement and optimize their chatbot strategies will gain significant competitive advantages through improved customer experiences and operational efficiencies.

By embracing AI-powered conversational interfaces, companies can not only meet but exceed the ever-increasing expectations of today's digitally-connected consumers, building stronger relationships while reducing support costs.
      `;
      
      setGeneratedContent(mockContent);
      onDataChange("content", mockContent);
      onDataChange("wordCount", 1245);
      onDataChange("seoScore", 87);
      onDataChange("readabilityScore", 92);
      onDataChange("keywords_density", {
        "chatbot": 14,
        "ai": 21,
        "customer": 19,
        "support": 12,
        "conversation": 8
      });
      
      setIsGenerating(false);
    }, 2000);
  };
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Content copied",
      description: "The content has been copied to your clipboard.",
    });
  };
  
  const handleExport = () => {
    toast({
      title: `Exporting to ${exportTarget}`,
      description: `Your content is being exported to ${exportTarget}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Export successful",
        description: `Content has been exported to ${exportTarget}.`,
      });
    }, 1500);
  };
  
  const renderSEOAnalysis = () => {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">SEO Score</span>
            <span className="text-sm font-medium">{seoData.seoScore}/100</span>
          </div>
          <Progress value={seoData.seoScore} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Readability Score</span>
            <span className="text-sm font-medium">{seoData.readabilityScore}/100</span>
          </div>
          <Progress value={seoData.readabilityScore} className="h-2" />
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3">Keyword Density</h3>
          <div className="space-y-2">
            {seoData.keywords_density && Object.entries(seoData.keywords_density).map(([keyword, count]: [string, any]) => (
              <div key={keyword} className="flex justify-between items-center">
                <span className="text-sm">{keyword}</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-secondary rounded-full mr-2">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.min((count / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3">Recommendations</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <Check size={16} className="text-green-500 mr-2 mt-0.5" />
              <span>Title contains target keyword</span>
            </li>
            <li className="flex items-start">
              <Check size={16} className="text-green-500 mr-2 mt-0.5" />
              <span>Content length is ideal for SEO (over 1000 words)</span>
            </li>
            <li className="flex items-start">
              <Check size={16} className="text-green-500 mr-2 mt-0.5" />
              <span>Meta description is optimized</span>
            </li>
            <li className="flex items-start">
              <Check size={16} className="text-amber-500 mr-2 mt-0.5" />
              <span>Consider adding more internal links</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="p-6 border border-border/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Content Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyContent}>
                <Copy size={14} className="mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleGenerateContent}>
                <RefreshCw size={14} className="mr-1" />
                Regenerate
              </Button>
            </div>
          </div>
          
          {isGenerating ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Generating your SEO-optimized content...</p>
            </div>
          ) : generatedContent ? (
            <div className="overflow-auto max-h-[600px] prose prose-sm dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, "<br>").replace(/^# (.*)/gm, "<h1>$1</h1>").replace(/^## (.*)/gm, "<h2>$1</h2>").replace(/^### (.*)/gm, "<h3>$1</h3>").replace(/!\[(.*)\]\((.*)\)/gm, '<img src="$2" alt="$1" class="my-4 rounded-md">') }} />
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <FileText size={40} className="text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-1">No content generated yet</h3>
              <p className="text-muted-foreground max-w-xs">Wait a moment while we generate your SEO-optimized content based on your inputs.</p>
            </div>
          )}
        </Card>
      </div>
      
      <div>
        <Card className="p-6 border border-border/40">
          <Tabs value={activePreviewTab} onValueChange={setActivePreviewTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Content Details</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-muted rounded p-3 text-center">
                      <span className="text-xs text-muted-foreground">Word Count</span>
                      <p className="text-lg font-medium">{seoData.wordCount || 0}</p>
                    </div>
                    <div className="bg-muted rounded p-3 text-center">
                      <span className="text-xs text-muted-foreground">Reading Time</span>
                      <p className="text-lg font-medium">{Math.ceil((seoData.wordCount || 0) / 200)} min</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Title</h3>
                  <p className="text-sm p-3 bg-muted rounded">{seoData.title || "No title selected"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-1">
                    {seoData.selectedKeywords.map((keyword: string, index: number) => (
                      <span key={index} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                {seoData.featuredImage && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Featured Image</h3>
                    <img 
                      src={seoData.featuredImage} 
                      alt="Featured" 
                      className="w-full h-auto rounded border"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="seo">
              {renderSEOAnalysis()}
            </TabsContent>
            
            <TabsContent value="export">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Export Options</h3>
                  <Select
                    value={exportTarget}
                    onValueChange={setExportTarget}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                      <SelectItem value="wix">Wix</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="webflow">Webflow</SelectItem>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="googledocs">Google Docs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {exportTarget === "wordpress" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-2">
                      <WordPress size={18} className="text-primary mr-2" />
                      <h3 className="font-medium">WordPress Export</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Push your content directly to your WordPress site as a draft or published post.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <Select defaultValue="draft">
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="publish">Publish</SelectItem>
                          <SelectItem value="pending">Pending Review</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select defaultValue="post">
                        <SelectTrigger>
                          <SelectValue placeholder="Post Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="post">Post</SelectItem>
                          <SelectItem value="page">Page</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full" onClick={handleExport}>
                      <Send size={16} className="mr-2" />
                      Export to WordPress
                    </Button>
                  </div>
                )}
                
                {exportTarget === "markdown" && (
                  <Button className="w-full" onClick={handleExport}>
                    <Download size={16} className="mr-2" />
                    Download Markdown
                  </Button>
                )}
                
                {exportTarget === "html" && (
                  <Button className="w-full" onClick={handleExport}>
                    <Download size={16} className="mr-2" />
                    Download HTML
                  </Button>
                )}
                
                {["wix", "shopify", "webflow", "googledocs"].includes(exportTarget) && (
                  <Button className="w-full" onClick={handleExport}>
                    <ExternalLink size={16} className="mr-2" />
                    Export to {exportTarget.charAt(0).toUpperCase() + exportTarget.slice(1)}
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between">
              <Button variant="outline" onClick={onPrev}>
                <ChevronLeft size={16} className="mr-2" />
                Back
              </Button>
              
              <Button onClick={onNext} disabled={!generatedContent}>
                Finish
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SEOContentPreview;
