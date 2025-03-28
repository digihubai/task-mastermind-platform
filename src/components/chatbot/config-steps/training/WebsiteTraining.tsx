
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebsiteTrainingProps {
  onSkip: () => void;
}

export const WebsiteTraining: React.FC<WebsiteTrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [step, setStep] = useState(1);
  const [websiteCrawlDepth, setWebsiteCrawlDepth] = useState(2);
  
  const handleAddUrl = () => {
    if (!websiteUrl) {
      toast({
        variant: "destructive",
        title: "URL required",
        description: "Please enter a valid URL to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast({
        title: "Website added",
        description: "Your website has been added for crawling."
      });
    }, 1500);
  };

  const handleStartCrawling = () => {
    setIsLoading(true);
    
    toast({
      title: "Crawling started",
      description: "Website crawling has been initiated. This may take some time."
    });
    
    // Simulate crawling process
    setTimeout(() => {
      setIsLoading(false);
      setStep(1);
      setWebsiteUrl("");
      toast({
        title: "Crawling completed",
        description: "Website has been successfully crawled and knowledge has been extracted."
      });
    }, 3000);
  };
  
  return (
    <>
      {step === 1 ? (
        <div className="bg-primary/5 p-4 rounded-lg space-y-4 border border-primary/10">
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              1
            </div>
            <span className="font-medium">Add URL</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Website</span>
              <span className="text-xs text-muted-foreground">Single URL</span>
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                size="icon" 
                variant="ghost"
                className="shrink-0"
                onClick={() => setWebsiteUrl("")}
              >
                <RefreshCw size={18} />
              </Button>
            </div>
          </div>
          
          <Button
            className="w-full bg-primary/10 text-primary hover:bg-primary/20"
            onClick={handleAddUrl}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Processing...
              </>
            ) : "Next"}
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-4">
            <div className="flex gap-2 items-center mb-4">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                ✓
              </div>
              <span className="font-medium">URL Added</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {websiteUrl}
            </div>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg space-y-4 border border-primary/10">
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                2
              </div>
              <span className="font-medium">Configure Crawl Depth</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Depth Level</label>
              <div className="flex gap-2">
                {[1, 2, 3].map((level) => (
                  <button
                    key={level}
                    className={`flex-1 p-2 border rounded-md text-center ${
                      websiteCrawlDepth === level 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setWebsiteCrawlDepth(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Level {websiteCrawlDepth} is {websiteCrawlDepth === 2 ? "recommended for most websites" : websiteCrawlDepth === 1 ? "good for simple websites" : "for complex websites"}. Higher levels may take longer to process.
              </p>
            </div>
            
            <Button 
              className="w-full"
              onClick={handleStartCrawling}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Crawling...
                </>
              ) : "Start Crawling"}
            </Button>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>
        </>
      )}
    </>
  );
};
