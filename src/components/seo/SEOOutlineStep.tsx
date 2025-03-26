
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, List, RefreshCw } from "lucide-react";

interface SEOOutlineStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOOutlineStep: React.FC<SEOOutlineStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutlines, setGeneratedOutlines] = useState<string[]>([]);
  const [selectedOutline, setSelectedOutline] = useState("");

  const handleGenerateOutlines = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockOutlines = [
        `# Introduction to AI Chatbots
## What are AI Chatbots?
## The Evolution of Conversational AI
## Benefits of AI-Powered Customer Support

# Key Features of Modern AI Chatbots
## Natural Language Processing
## Machine Learning Capabilities
## Integration Options

# Implementing AI Chatbots in Your Business
## Choosing the Right Solution
## Training Your Chatbot
## Measuring Success

# Future Trends in AI Conversation
## Voice-Based Interfaces
## Multimodal AI
## Ethical Considerations

# Conclusion`,
        
        `# Understanding AI Assistant Technology
## The Rise of Digital Assistants
## Technical Foundations of AI Dialogue
## Market Overview

# Benefits for Businesses and Users
## Customer Service Improvements
## Operational Efficiency
## User Experience Enhancement

# Implementation Strategies
## Choosing the Right Platform
## Integration Challenges
## Best Practices

# Case Studies
## Retail Applications
## Healthcare Uses
## Financial Services

# Conclusion and Future Outlook`
      ];
      setGeneratedOutlines(mockOutlines);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleSelectOutline = (outline: string) => {
    setSelectedOutline(outline);
    onDataChange("outline", outline);
  };
  
  const handleContinue = () => {
    if (selectedOutline || seoData.outline) {
      onNext();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Generate Outline</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Outline Topic</label>
            <Textarea 
              placeholder="Explain your idea"
              value={seoData.outlineTopic || ""}
              onChange={(e) => onDataChange("outlineTopic", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Keywords</label>
            <Input 
              value={seoData.selectedKeywords.join(", ")}
              disabled
              className="bg-muted"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Number of Subtitles</label>
              <Input 
                type="number" 
                value={seoData.subtitleCount}
                onChange={(e) => onDataChange("subtitleCount", parseInt(e.target.value))}
                min={3}
                max={15}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Number of Outlines</label>
              <Input 
                type="number" 
                value={seoData.outlineCount}
                onChange={(e) => onDataChange("outlineCount", parseInt(e.target.value))}
                min={1}
                max={5}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateOutlines} 
            disabled={isGenerating || !seoData.title}
            className="w-full"
          >
            {isGenerating ? "Generating Outlines..." : "Generate Outline"}
          </Button>
        </div>
      </Card>
      
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose an Outline</h2>
        
        {generatedOutlines.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {generatedOutlines.map((outline, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-md cursor-pointer transition-colors overflow-auto max-h-[300px] ${
                    selectedOutline === outline ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                  onClick={() => handleSelectOutline(outline)}
                >
                  <pre className="whitespace-pre-wrap font-sans text-sm">{outline}</pre>
                </div>
              ))}
              
              <Button variant="outline" className="w-full" onClick={handleGenerateOutlines}>
                <RefreshCw size={16} className="mr-2" />
                Generate More Outlines
              </Button>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={onPrev}>
                <ChevronLeft size={16} className="mr-2" />
                Back
              </Button>
              
              <Button onClick={handleContinue} disabled={!selectedOutline && !seoData.outline}>
                Continue to Image
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
            <List size={40} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No outlines generated yet</h3>
            <p className="max-w-xs">Click "Generate Outline" to create outline options for your content.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SEOOutlineStep;
