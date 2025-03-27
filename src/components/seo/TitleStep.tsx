
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ChevronLeft, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TitleStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const TitleStep: React.FC<TitleStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const { toast } = useToast();
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);
  
  const handleGenerateTitles = () => {
    if (seoData.selectedKeywords.length === 0) {
      toast({
        title: "No keywords selected",
        description: "Please select at least one keyword to generate titles",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingTitles(true);
    
    // Simulate API call to generate titles
    setTimeout(() => {
      const keywordCombinations = seoData.selectedKeywords.slice(0, 3);
      const mainKeyword = seoData.selectedKeywords[0];
      
      const suggestedTitles = [
        `The Ultimate Guide to ${mainKeyword}: Everything You Need to Know`,
        `How ${keywordCombinations[0]} is Revolutionizing ${keywordCombinations[1] || "Business"}`,
        `10 Ways to Leverage ${mainKeyword} for Better Customer Experience`,
        `The Future of ${mainKeyword}: Trends and Predictions for 2023`,
        `Why ${mainKeyword} Matters: Key Benefits and Implementation Strategies`,
        `Understanding ${mainKeyword}: A Comprehensive Guide for Beginners`,
        `${mainKeyword} vs. Traditional Solutions: Which is Right for Your Business?`,
        `Implementing ${mainKeyword}: Best Practices and Common Pitfalls`,
        `How to Choose the Right ${mainKeyword} for Your Business Needs`,
        `${mainKeyword} 101: Everything You Need to Get Started`
      ];
      
      // Take only the number of titles specified by the user
      onDataChange("titles", suggestedTitles.slice(0, seoData.numberOfTitles));
      setIsGeneratingTitles(false);
      
      toast({
        title: "Titles generated",
        description: `Generated ${seoData.numberOfTitles} titles based on your keywords`,
      });
    }, 1500);
  };
  
  const handleTitleSelect = (title: string) => {
    onDataChange("selectedTitle", title);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Choose a Title</h2>
        <Button variant="outline" size="sm" onClick={() => onDataChange("selectedTitle", "")}>
          Clear Selection
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title Topic (Optional)</label>
            <Textarea 
              placeholder="Enter a specific topic for your title (optional)"
              value={seoData.topic}
              onChange={(e) => onDataChange("topic", e.target.value)}
              className="resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <Input 
              value={seoData.selectedKeywords.join(', ')}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Number of Titles</label>
            <Input 
              type="number" 
              value={seoData.numberOfTitles}
              onChange={(e) => onDataChange("numberOfTitles", parseInt(e.target.value) || 3)}
              min={1}
              max={10}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Maximum Title length</label>
            <Input 
              type="number" 
              value={seoData.maxTitleLength}
              onChange={(e) => onDataChange("maxTitleLength", parseInt(e.target.value) || 60)}
              min={20}
              max={100}
            />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger className="py-2">
                Advanced Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title Style</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="howto">How-to Guide</option>
                      <option value="listicle">Listicle</option>
                      <option value="question">Question</option>
                      <option value="comparison">Comparison</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tone</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="persuasive">Persuasive</option>
                      <option value="informative">Informative</option>
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Button 
            className="w-full"
            onClick={handleGenerateTitles}
            disabled={isGeneratingTitles || seoData.selectedKeywords.length === 0}
          >
            {isGeneratingTitles ? "Generating Titles..." : "Generate Title"}
          </Button>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Select a title:</h3>
          
          {seoData.titles.length > 0 ? (
            <div className="space-y-2 mb-6">
              {seoData.titles.map((title: string, index: number) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border cursor-pointer transition-colors ${
                    seoData.selectedTitle === title 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTitleSelect(title)}
                >
                  <p>{title}</p>
                </div>
              ))}
              
              <Button
                variant="outline"
                className="w-full mt-4"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Title
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground border rounded-md p-4">
              <p className="mb-2">No titles generated yet</p>
              <p className="text-sm">Generate titles using the form on the left</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={onNext} 
          disabled={!seoData.selectedTitle}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TitleStep;
