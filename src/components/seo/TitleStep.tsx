
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw, Loader, MessageSquare } from "lucide-react";
import { generateSEOTitles } from "@/services/seo";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface TitleStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const TitleStep: React.FC<TitleStepProps> = ({ 
  seoData, 
  onDataChange, 
  onNext, 
  onPrev 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [titleType, setTitleType] = useState("mixed");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  
  // Auto-generate titles on component mount if topic and keywords exist but no titles
  useEffect(() => {
    const hasKeywords = Array.isArray(seoData.selectedKeywords) && seoData.selectedKeywords.length > 0;
    const hasTopic = seoData.topic && seoData.topic.trim().length > 0;
    
    if ((!seoData.titles || seoData.titles.length === 0) && hasKeywords && hasTopic) {
      handleGenerateTitles();
    }
  }, []);
  
  const handleGenerateTitles = async () => {
    // Validate that we have keywords selected
    if (!Array.isArray(seoData.selectedKeywords) || seoData.selectedKeywords.length === 0) {
      toast.error("Please select at least one keyword first");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Generate titles based on topic, selected keywords, and title type
      const generatedTitles = await generateSEOTitles(
        seoData.topic,
        seoData.selectedKeywords,
        seoData.numberOfTitles || 5,
        titleType
      );
      
      // Update titles array
      onDataChange("titles", generatedTitles);
      
      // Select the first title by default if none is selected
      if (!seoData.selectedTitle) {
        onDataChange("selectedTitle", generatedTitles[0]);
      }
      
      toast.success(`Generated ${generatedTitles.length} title options`);
    } catch (error) {
      console.error("Error generating titles:", error);
      toast.error("Failed to generate titles. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSelectTitle = (title: string) => {
    onDataChange("selectedTitle", title);
  };
  
  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    toast.success("Thank you for your feedback. Regenerating titles...");
    
    // Save feedback
    onDataChange("titleFeedback", feedbackText);
    
    // Close dialog
    setFeedbackOpen(false);
    
    // Clear feedback text for next time
    setFeedbackText("");
    
    // Regenerate titles
    handleGenerateTitles();
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Choose a Title</h2>
          <div className="flex items-center gap-3">
            <Select 
              value={titleType} 
              onValueChange={setTitleType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Title format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mixed">Mixed Formats</SelectItem>
                <SelectItem value="howto">How-to Guides</SelectItem>
                <SelectItem value="listicle">List Articles</SelectItem>
                <SelectItem value="question">Questions</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFeedbackOpen(true)}
              className="gap-2"
            >
              <MessageSquare size={14} />
              Feedback
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGenerateTitles}
              disabled={isGenerating || !seoData.selectedKeywords || seoData.selectedKeywords.length === 0}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader size={14} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RotateCcw size={14} />
                  Regenerate Titles
                </>
              )}
            </Button>
          </div>
        </div>
        
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader className="h-12 w-12 animate-spin mb-4 opacity-70" />
            <h3 className="text-lg font-medium mb-2">Generating SEO-optimized titles</h3>
            <p className="text-muted-foreground max-w-md">
              We're creating titles that include your selected keywords and are optimized for search engines.
            </p>
          </div>
        ) : Array.isArray(seoData.titles) && seoData.titles.length > 0 ? (
          <div className="space-y-3">
            {seoData.titles.map((title: string, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  seoData.selectedTitle === title 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
                onClick={() => handleSelectTitle(title)}
              >
                <h3 className="font-medium">{title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Sparkles className="h-12 w-12 text-primary/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No titles generated yet</h3>
            <p className="text-muted-foreground max-w-md">
              Click "Regenerate Titles" to create SEO-optimized title options based on your topic and keywords.
            </p>
            <Button 
              className="mt-4" 
              onClick={handleGenerateTitles}
              disabled={!seoData.selectedKeywords || seoData.selectedKeywords.length === 0}
            >
              Generate Titles Now
            </Button>
          </div>
        )}
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-1">
          <ChevronLeft size={16} />
          Back to Keywords
        </Button>
        
        <Button 
          onClick={onNext} 
          disabled={!seoData.selectedTitle}
          className="gap-1"
        >
          Continue to Outline
          <ChevronRight size={16} />
        </Button>
      </div>
      
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Provide Feedback on Title Generation</DialogTitle>
            <DialogDescription>
              Let us know what kind of titles you're looking for, and we'll regenerate based on your feedback.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Example: I need more specific titles related to implementing AI chatbots for e-commerce..."
              className="min-h-[150px]"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback}>
              Submit & Regenerate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TitleStep;
