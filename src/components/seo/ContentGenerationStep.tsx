
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Copy, Globe, Calendar, Sparkles, RotateCw, Plus, Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { createSEOContent } from "@/services/seoService";

interface ContentGenerationStepProps {
  seoData: any;
  isGenerating: boolean;
  onDataChange: (field: string, value: any) => void;
  onPrev: () => void;
  onRegenerateContent: () => void;
}

const ContentGenerationStep: React.FC<ContentGenerationStepProps> = ({ 
  seoData, 
  isGenerating, 
  onDataChange, 
  onPrev,
  onRegenerateContent
}) => {
  const { toast } = useToast();
  const [publishType, setPublishType] = useState("immediate");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [showPublishOptions, setShowPublishOptions] = useState(true);
  const [showConnectCMSDialog, setShowConnectCMSDialog] = useState(false);
  const [hasCMS, setHasCMS] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(seoData.generatedContent);
    toast({
      title: "Copied to clipboard",
      description: "Content copied to clipboard successfully",
    });
  };
  
  const handlePublish = async () => {
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
    
    setPublishLoading(true);
    
    // Create a record in the database
    try {
      const contentData = {
        title: seoData.selectedTitle,
        content: seoData.generatedContent,
        keywords: seoData.selectedKeywords,
        status: publishType === "immediate" ? "published" : "scheduled",
        publishDate: publishType === "scheduled" ? `${scheduleDate}T${scheduleTime}:00` : new Date().toISOString(),
        wordCount: seoData.generatedContent.split(/\s+/).length,
        seoScore: Math.floor(Math.random() * 15) + 80,
        userId: "user123" // In a real app, we would get this from authentication
      };
      
      // Simulate API call
      setTimeout(async () => {
        toast({
          title: "Success!",
          description: `Successfully ${publishType === "immediate" ? "published" : "scheduled"} to your site${scheduledInfo}`,
        });
        setPublishLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error publishing content:", error);
      toast({
        title: "Error publishing",
        description: "There was an error publishing your content. Please try again.",
        variant: "destructive"
      });
      setPublishLoading(false);
    }
  };

  const handleConnectCMS = (cmsType: string) => {
    setPublishLoading(true);
    
    // Simulate connection to CMS
    toast({
      title: "CMS connection",
      description: `Connecting to ${cmsType}...`,
    });
    
    setTimeout(() => {
      setHasCMS(true);
      setShowConnectCMSDialog(false);
      setPublishLoading(false);
      
      toast({
        title: "Connected!",
        description: `Your ${cmsType} has been successfully connected`,
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
            <Loader className="h-5 w-5 animate-spin text-primary" />
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
                  onClick={onRegenerateContent}
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
                  disabled={publishLoading}
                >
                  {publishLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : publishType === "immediate" ? (
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
                <Button 
                  variant="outline" 
                  className="flex flex-col h-24 items-center justify-center gap-2" 
                  onClick={() => handleConnectCMS("WordPress")}
                  disabled={publishLoading}
                >
                  {publishLoading ? (
                    <Loader className="h-6 w-6 animate-spin text-blue-500" />
                  ) : (
                    <Globe className="h-8 w-8 text-blue-500" />
                  )}
                  <span>WordPress</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col h-24 items-center justify-center gap-2" 
                  onClick={() => handleConnectCMS("Webflow")}
                  disabled={publishLoading}
                >
                  {publishLoading ? (
                    <Loader className="h-6 w-6 animate-spin text-purple-500" />
                  ) : (
                    <Globe className="h-8 w-8 text-purple-500" />
                  )}
                  <span>Webflow</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col h-24 items-center justify-center gap-2" 
                  onClick={() => handleConnectCMS("Contentful")}
                  disabled={publishLoading}
                >
                  {publishLoading ? (
                    <Loader className="h-6 w-6 animate-spin text-yellow-500" />
                  ) : (
                    <Globe className="h-8 w-8 text-yellow-500" />
                  )}
                  <span>Contentful</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col h-24 items-center justify-center gap-2" 
                  onClick={() => handleConnectCMS("Custom CMS")}
                  disabled={publishLoading}
                >
                  {publishLoading ? (
                    <Loader className="h-6 w-6 animate-spin text-gray-500" />
                  ) : (
                    <Plus className="h-8 w-8 text-gray-500" />
                  )}
                  <span>Custom CMS</span>
                </Button>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConnectCMSDialog(false)} disabled={publishLoading}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ContentGenerationStep;
