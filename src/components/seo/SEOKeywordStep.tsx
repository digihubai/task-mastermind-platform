
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Search, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SEOKeywordStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOKeywordStep: React.FC<SEOKeywordStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateKeywords = () => {
    if (!seoData.topic.trim()) {
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockKeywords = ["assistant", "dialogue", "interface", "response", "automation", 
                          "conversation", "intelligence", "technology", "support", "queries", 
                          "chatbot", "ai", "language"];
      onDataChange("keywords", mockKeywords);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleKeywordSelect = (keyword: string) => {
    const selectedKeywords = [...seoData.selectedKeywords];
    if (selectedKeywords.includes(keyword)) {
      onDataChange("selectedKeywords", selectedKeywords.filter(k => k !== keyword));
    } else {
      onDataChange("selectedKeywords", [...selectedKeywords, keyword]);
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
              value={seoData.topic}
              onChange={(e) => onDataChange("topic", e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Number of Keywords</label>
            <Input 
              type="number" 
              value={seoData.keywordCount}
              onChange={(e) => onDataChange("keywordCount", parseInt(e.target.value))}
              min={5}
              max={20}
            />
          </div>
          
          <Button 
            onClick={handleGenerateKeywords} 
            disabled={!seoData.topic.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating Keywords..." : "Generate Keywords"}
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
        
        {seoData.keywords.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Select relevant keywords for your content. Selected keywords will receive more emphasis.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {seoData.keywords.map((keyword: string, index: number) => (
                <button
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    seoData.selectedKeywords.includes(keyword)
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
                disabled={seoData.selectedKeywords.length === 0}
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

export default SEOKeywordStep;
