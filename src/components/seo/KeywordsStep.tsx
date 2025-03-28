
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Search, Info, Loader } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateKeywords } from "@/services/seoService";
import { toast } from "sonner";

interface KeywordsStepProps {
  topic: string;
  keywordCount: number;
  keywords: string[];
  selectedKeywords: string[];
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const KeywordsStep: React.FC<KeywordsStepProps> = ({ 
  topic, 
  keywordCount, 
  keywords, 
  selectedKeywords, 
  onDataChange, 
  onNext, 
  onPrev 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Generating keywords...");

  // Effect to auto-generate keywords when topic changes and it's not empty
  useEffect(() => {
    if (topic.trim() && keywords.length === 0) {
      handleGenerateKeywords();
    }
  }, [topic]);

  const handleGenerateKeywords = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic first");
      return;
    }
    
    setIsGenerating(true);
    setLoadingMessage("Analyzing topic...");
    
    try {
      // Show fake progress messages for UX
      const progressMessages = [
        "Analyzing topic...",
        "Identifying relevant terms...",
        "Evaluating search volumes...",
        "Finalizing keyword list..."
      ];
      
      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % progressMessages.length;
        setLoadingMessage(progressMessages[messageIndex]);
      }, 800);
      
      // Generate keywords based on the topic
      const generatedKeywords = await generateKeywords(topic, keywordCount);
      clearInterval(messageInterval);
      
      // Update the state with the generated keywords
      onDataChange("keywords", generatedKeywords);
      
      // If no keywords are selected yet, select the first 3 by default
      if (selectedKeywords.length === 0) {
        onDataChange("selectedKeywords", generatedKeywords.slice(0, 3));
      }
      
      toast.success(`Generated ${generatedKeywords.length} keywords`);
    } catch (error) {
      console.error("Error generating keywords:", error);
      toast.error("Failed to generate keywords. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleKeywordSelect = (keyword: string) => {
    const selected = [...selectedKeywords];
    if (selected.includes(keyword)) {
      onDataChange("selectedKeywords", selected.filter(k => k !== keyword));
    } else {
      onDataChange("selectedKeywords", [...selected, keyword]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">1. Select Topic</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">What is this article about?</label>
            <Textarea 
              placeholder="Describe your article topic in detail..."
              value={topic}
              onChange={(e) => onDataChange("topic", e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Number of Keywords</label>
            <Input 
              type="number" 
              value={keywordCount.toString()}
              onChange={(e) => onDataChange("keywordCount", parseInt(e.target.value) || 5)}
              min={5}
              max={20}
            />
          </div>
          
          <Button 
            onClick={handleGenerateKeywords} 
            disabled={!topic.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <div className="flex items-center">
                <Loader size={16} className="animate-spin mr-2" />
                {loadingMessage}
              </div>
            ) : (
              <>Generate Keywords</>
            )}
          </Button>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger>Advanced Options</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select className="w-full p-2 border rounded">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Keyword Difficulty</label>
                    <select className="w-full p-2 border rounded">
                      <option value="easy">Easy (0-30)</option>
                      <option value="medium">Medium (31-60)</option>
                      <option value="hard">Hard (61-100)</option>
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
      
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">2. Select Keywords</h2>
        
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
            <Loader size={40} className="animate-spin mb-4 opacity-70" />
            <h3 className="text-lg font-medium mb-1">{loadingMessage}</h3>
            <p className="max-w-xs">We're finding the best keywords for your topic.</p>
          </div>
        ) : keywords.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Select relevant keywords for your content. Selected keywords will receive more emphasis.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {keywords.map((keyword: string, index: number) => (
                <button
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedKeywords.includes(keyword)
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-secondary/80"
                  }`}
                  onClick={() => handleKeywordSelect(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
            
            <div className="mt-auto pt-4">
              <Button 
                onClick={onNext} 
                disabled={selectedKeywords.length === 0}
                className="w-full flex justify-between items-center"
              >
                <span>Continue to Title</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
            <Search size={40} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No keywords generated yet</h3>
            <p className="max-w-xs">Enter your topic and click "Generate Keywords" to see keyword suggestions here.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default KeywordsStep;
