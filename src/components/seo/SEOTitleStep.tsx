
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Plus, RefreshCw, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SEOTitleStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOTitleStep: React.FC<SEOTitleStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleGenerateTitles = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockTitles = [
        "10 Ways AI Chatbots Are Revolutionizing Customer Support",
        "How Intelligent Assistants Are Changing the Conversation Game",
        "The Ultimate Guide to Implementing AI Dialogue Systems",
        "Automation and Intelligence: The Future of Digital Conversations"
      ];
      setGeneratedTitles(mockTitles);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleSelectTitle = (title: string) => {
    setSelectedTitle(title);
    onDataChange("title", title);
  };
  
  const handleContinue = () => {
    if (selectedTitle || seoData.title) {
      onNext();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Generate Title</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title Topic (Optional)</label>
            <Textarea 
              placeholder="ai chatbot"
              value={seoData.titleTopic || ""}
              onChange={(e) => onDataChange("titleTopic", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Keywords</label>
            <Input 
              value={seoData.selectedKeywords.join(",")}
              disabled
              className="bg-muted"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Number of Titles</label>
              <Input 
                type="number" 
                value={seoData.titleCount}
                onChange={(e) => onDataChange("titleCount", parseInt(e.target.value))}
                min={1}
                max={10}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Maximum Title Length</label>
              <Input 
                type="number" 
                value={seoData.maxTitleLength}
                onChange={(e) => onDataChange("maxTitleLength", parseInt(e.target.value))}
                min={20}
                max={100}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateTitles} 
            disabled={isGenerating || seoData.selectedKeywords.length === 0}
            className="w-full"
          >
            {isGenerating ? "Generating Titles..." : "Generate Title"}
          </Button>
        </div>
      </Card>
      
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose a Title</h2>
        
        {generatedTitles.length > 0 ? (
          <>
            <div className="space-y-3 mb-6">
              {generatedTitles.map((title, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedTitle === title ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                  onClick={() => handleSelectTitle(title)}
                >
                  <p className="font-medium">{title}</p>
                </div>
              ))}
              
              <Button variant="outline" className="w-full" onClick={handleGenerateTitles}>
                <RefreshCw size={16} className="mr-2" />
                Generate More Titles
              </Button>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={onPrev}>
                <ChevronLeft size={16} className="mr-2" />
                Back
              </Button>
              
              <Button onClick={handleContinue} disabled={!selectedTitle && !seoData.title}>
                Continue to Outline
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
            <Zap size={40} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No titles generated yet</h3>
            <p className="max-w-xs">Click "Generate Title" to create title options for your content.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SEOTitleStep;
