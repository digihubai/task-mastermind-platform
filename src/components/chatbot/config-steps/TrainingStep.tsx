
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TrainingStep: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"website" | "pdf" | "text" | "qa">("website");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [step, setStep] = useState(1);
  
  const handleSkip = () => {
    toast({
      title: "Training skipped",
      description: "You can train your chatbot later from the dashboard.",
    });
  };
  
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
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Chatbot Training</h2>
        <p className="text-muted-foreground">
          This step is optional but highly recommended to personalize your chatbot experience.
        </p>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full justify-center gap-2 text-muted-foreground"
        onClick={handleSkip}
      >
        Skip <ChevronRight size={16} />
      </Button>
      
      <div className="bg-muted/30 p-1 rounded-full flex mt-8">
        {[
          { id: "website", label: "Website" },
          { id: "pdf", label: "PDF" },
          { id: "text", label: "Text" },
          { id: "qa", label: "Q&A" }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-2 px-4 rounded-full text-sm transition-colors ${
              activeTab === tab.id 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {activeTab === "website" && (
        <div className="space-y-6">
          <div className="bg-primary/5 p-4 rounded-lg space-y-4 border border-primary/10">
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {step === 1 ? "1" : "✓"}
              </div>
              <span className="font-medium">{step === 1 ? "Add URL" : "URL Added"}</span>
            </div>
            
            {step === 1 && (
              <>
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
              </>
            )}
            
            {step === 2 && (
              <div className="text-sm text-muted-foreground">
                {websiteUrl}
              </div>
            )}
          </div>
          
          {step === 2 && (
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
                        level === 2 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Level 2 is recommended for most websites. Higher levels may take longer to process.
                </p>
              </div>
              
              <Button className="w-full">
                Start Crawling
              </Button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === "pdf" && (
        <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg border-muted-foreground/20">
          <div className="text-center">
            <p className="text-muted-foreground">Drag & drop PDF files here</p>
            <Button variant="outline" size="sm" className="mt-2">
              Upload PDFs
            </Button>
          </div>
        </div>
      )}
      
      {activeTab === "text" && (
        <div className="space-y-4">
          <textarea 
            className="w-full h-40 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Paste or type text content here that your chatbot should learn from..."
          />
          <Button className="w-full">
            Add Text Content
          </Button>
        </div>
      )}
      
      {activeTab === "qa" && (
        <div className="space-y-4">
          <div className="space-y-4 border p-4 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <Input placeholder="How do I reset my password?" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <textarea 
                className="w-full h-20 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="To reset your password, click on the 'Forgot Password' link on the login page..."
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">
              Add Another Q&A
            </Button>
            <Button variant="default" className="flex-1">
              Save Q&A Set
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-4">
        {step === 2 && activeTab === "website" && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
      </div>
    </div>
  );
};
