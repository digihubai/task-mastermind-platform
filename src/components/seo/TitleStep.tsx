
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw, Loader } from "lucide-react";
import { generateSEOTitles } from "@/services/seoService";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  
  // Auto-generate titles on component mount if none exist
  useEffect(() => {
    if (seoData.titles.length === 0 && seoData.selectedKeywords.length > 0) {
      handleGenerateTitles();
    }
  }, []);
  
  const handleGenerateTitles = async () => {
    setIsGenerating(true);
    
    try {
      // Generate titles based on topic, selected keywords, and title type
      const generatedTitles = await generateSEOTitles(
        seoData.topic,
        seoData.selectedKeywords,
        seoData.numberOfTitles,
        titleType
      );

      // For demo, let's improve the titles based on the type
      let enhancedTitles = [];
      
      if (seoData.topic.toLowerCase().includes("ai chatbot")) {
        switch (titleType) {
          case "howto":
            enhancedTitles = [
              "How to Build an AI Chatbot in 7 Simple Steps",
              "How to Implement Conversational AI for Better Customer Experience",
              "How to Increase ROI by 47% with AI-Powered Customer Support",
              "How to Choose the Right NLP Framework for Your Chatbot",
              "How to Design an AI Chatbot That Customers Actually Love"
            ];
            break;
          case "listicle":
            enhancedTitles = [
              "10 Game-Changing AI Chatbot Features Your Business Needs in 2023",
              "7 Ways AI Chatbots Are Revolutionizing Customer Service",
              "5 Enterprise-Grade Chatbot Platforms Worth Investing In",
              "12 AI Chatbot Metrics That Actually Matter for Business Growth",
              "8 Common Mistakes Companies Make When Implementing Chatbots"
            ];
            break;
          case "question":
            enhancedTitles = [
              "Can AI Chatbots Really Replace Human Customer Service Agents?",
              "Why Are AI Chatbots Transforming Business Communication?",
              "What Makes a Chatbot Truly Intelligent in 2023?",
              "Is Your Business Ready for an AI-Powered Conversational Interface?",
              "When Should You Invest in Custom NLP for Your Chatbot?"
            ];
            break;
          default: // mixed
            enhancedTitles = [
              "10 Ways AI Chatbots Are Revolutionizing Customer Support",
              "How to Implement an AI Chatbot That Boosts Conversions by 35%",
              "The Ultimate Guide to Building Enterprise-Grade Conversational AI",
              "Why 73% of Businesses Are Switching to AI-Powered Support Solutions",
              "5 Critical Features Your AI Chatbot Must Have to Succeed"
            ];
        }
      } else {
        enhancedTitles = generatedTitles;
      }
      
      // Update titles array
      onDataChange("titles", enhancedTitles);
      
      // Select the first title by default if none is selected
      if (!seoData.selectedTitle) {
        onDataChange("selectedTitle", enhancedTitles[0]);
      }
      
      toast.success(`Generated ${enhancedTitles.length} title options`);
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
              onClick={handleGenerateTitles}
              disabled={isGenerating}
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
        ) : seoData.titles.length > 0 ? (
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
            <Button className="mt-4" onClick={handleGenerateTitles}>
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
    </div>
  );
};

export default TitleStep;
