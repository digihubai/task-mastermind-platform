
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Copy, Globe, Calendar, Sparkles, RotateCw, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface ContentGenerationStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onPrev: () => void;
}

const ContentGenerationStep: React.FC<ContentGenerationStepProps> = ({ seoData, onDataChange, onPrev }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishType, setPublishType] = useState("immediate");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [showPublishOptions, setShowPublishOptions] = useState(false);
  const [showConnectCMSDialog, setShowConnectCMSDialog] = useState(false);
  const [hasCMS, setHasCMS] = useState(true); // Mock state to simulate CMS connection

  // Auto-generate content when component mounts
  useEffect(() => {
    generateContent();
  }, []);

  const generateContent = () => {
    if (!seoData.selectedOutline) {
      toast({
        title: "No outline selected",
        description: "Please go back and select an outline for your content",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call for content generation
    setTimeout(() => {
      const title = seoData.selectedTitle;
      const mainKeyword = seoData.selectedKeywords[0] || "chatbot";
      const outline = seoData.selectedOutline;
      
      // Generate a mock article using the selected title and outline
      const generatedArticle = `# ${title}

## Introduction to AI and ${mainKeyword}s
The rapid advancement of artificial intelligence (AI) has significantly transformed the way businesses interact with customers. ${mainKeyword}s, powered by AI, are reshaping conversations, providing a gateway for automated customer support and engagement. They simulate human-like dialogue, improving accessibility and efficiency in communication.

## Understanding Conversational AI
Conversational AI refers to technologies that facilitate human-like interactions through speech or text. ${mainKeyword}s serve as a primary application of conversational AI, designed to understand, process, and respond to user queries seamlessly. By using natural language processing (NLP), these systems can interpret user intent and provide relevant responses.

## How ${mainKeyword}s Function
Modern ${mainKeyword}s utilize a combination of machine learning, natural language understanding, and dialogue management to process and respond to user inquiries. The system analyzes the user's input, determines intent, and generates appropriate responses based on programming or learned patterns.

## Benefits of Using ${mainKeyword}s in Business
Implementing ${mainKeyword}s offers numerous advantages:
- 24/7 availability for customer support
- Reduced operational costs
- Consistent service quality
- Handling multiple inquiries simultaneously
- Gathering valuable customer data
- Freeing human agents for more complex tasks

## Common Applications of ${mainKeyword}s
${mainKeyword}s are versatile tools used across various industries:
- Customer service and support
- E-commerce product recommendations
- Healthcare patient screening
- Banking and financial services
- Travel booking and information
- Educational assistance

## Challenges in ${mainKeyword} Development
Despite their benefits, developing effective ${mainKeyword}s presents challenges:
- Understanding complex user queries
- Handling context switches in conversations
- Maintaining personality consistency
- Integrating with existing business systems
- Ensuring data privacy and security

## Future Trends in Conversational AI
The field of conversational AI continues to evolve rapidly:
- Multimodal interactions combining text, voice, and visuals
- Improved emotional intelligence and empathy
- More sophisticated personalization capabilities
- Integration with IoT devices
- Enhanced multilingual support

## The Role of Natural Language Processing
NLP advancements have significantly improved ${mainKeyword} capabilities:
- Better understanding of colloquialisms and slang
- More accurate sentiment analysis
- Improved context retention across conversations
- Enhanced entity recognition and information extraction
- More natural-sounding responses

## User Experience and ${mainKeyword} Design
Creating an effective ${mainKeyword} requires thoughtful design:
- Clear conversation flows
- Appropriate personality and tone
- Transparent limitations and fallback mechanisms
- Simple user interfaces
- Accessible design for diverse users

## Conclusion on the Impact of ${mainKeyword}s
As AI technology continues to advance, ${mainKeyword}s will play an increasingly important role in business communications. Organizations that effectively implement these tools gain competitive advantages through improved customer experiences, operational efficiencies, and valuable customer insights. The future of ${mainKeyword}s lies in creating even more personalized, context-aware, and human-like interactions.`;

      onDataChange("generatedContent", generatedArticle);
      setIsGenerating(false);
      setShowPublishOptions(true);
      
      toast({
        title: "Content generated",
        description: "Your SEO-optimized content has been generated successfully!",
      });
    }, 3000);
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(seoData.generatedContent);
    toast({
      title: "Copied to clipboard",
      description: "Content copied to clipboard successfully",
    });
  };
  
  const handlePublish = () => {
    if (!hasCMS) {
      setShowConnectCMSDialog(true);
      return;
    }

    if (publishType === "scheduled" && (!scheduleDate || !scheduleTime)) {
      toast({
        title: "Missing schedule information",
        description: "Please select both date and time for scheduled publishing",
        variant: "destructive"
      });
      return;
    }

    const publishAction = publishType === "immediate" ? "Publishing" : "Scheduling";
    const scheduledInfo = publishType === "scheduled" ? ` for ${scheduleDate} at ${scheduleTime}` : "";
    
    toast({
      title: `${publishAction} to site`,
      description: `${publishAction} to your website${scheduledInfo}...`,
    });
    
    // Simulate publishing process
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `Successfully ${publishType === "immediate" ? "published" : "scheduled"} to your site${scheduledInfo}`,
      });
    }, 1500);
  };

  const handleConnectCMS = () => {
    // Simulate connection to CMS
    toast({
      title: "CMS connection",
      description: "Connecting to your content management system...",
    });
    
    setTimeout(() => {
      setHasCMS(true);
      setShowConnectCMSDialog(false);
      toast({
        title: "Connected!",
        description: "Your CMS has been successfully connected",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {isGenerating ? (
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <Sparkles className="h-12 w-12 text-primary/60 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Generating your article...</h2>
          <p className="text-muted-foreground mb-6">
            Creating SEO-optimized content based on your selections.
          </p>
          
          <div className="flex items-center gap-2">
            <RotateCw className="h-5 w-5 animate-spin text-primary" />
            <span>Please wait, this may take a moment</span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onPrev}
            className="mt-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Previous Step
          </Button>
        </Card>
      ) : (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Generated Content</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateContent}
                  className="flex items-center gap-1"
                >
                  <RotateCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: seoData.generatedContent.replace(/\n\n/g, '<br><br>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/# (.*)/g, '<h1>$1</h1>') }} />
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={onPrev}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              
              <Button 
                onClick={handleCopyToClipboard}
                className="flex items-center gap-1"
              >
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </Button>
            </div>
          </Card>
          
          {showPublishOptions && (
            <Card className="p-6 border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Globe className="text-green-600" />
                Publishing Options
              </h3>
              
              <div className="space-y-4">
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
                  onClick={handlePublish}
                  className="w-full gap-2"
                  variant="default"
                >
                  {publishType === "immediate" ? (
                    <>
                      <Globe className="h-4 w-4" />
                      Publish to Site
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      Schedule Publication
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}
          
          <Dialog open={showConnectCMSDialog} onOpenChange={setShowConnectCMSDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect a CMS</DialogTitle>
                <DialogDescription>
                  Connect your content management system to publish content directly from DigiHub.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4 py-4">
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2" onClick={handleConnectCMS}>
                  <Globe className="h-8 w-8 text-blue-500" />
                  <span>WordPress</span>
                </Button>
                
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2" onClick={handleConnectCMS}>
                  <Globe className="h-8 w-8 text-purple-500" />
                  <span>Webflow</span>
                </Button>
                
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2" onClick={handleConnectCMS}>
                  <Globe className="h-8 w-8 text-yellow-500" />
                  <span>Contentful</span>
                </Button>
                
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2" onClick={handleConnectCMS}>
                  <Plus className="h-8 w-8 text-gray-500" />
                  <span>Custom CMS</span>
                </Button>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConnectCMSDialog(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ContentGenerationStep;
