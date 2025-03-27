
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TopicStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
}

const TopicStep: React.FC<TopicStepProps> = ({ seoData, onDataChange, onNext }) => {
  const { toast } = useToast();
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  
  const handleGenerateKeywords = () => {
    if (!seoData.topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "You need to provide a topic to generate keywords",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingKeywords(true);
    
    // Simulate API call to generate better, more relevant keywords
    setTimeout(() => {
      // Generate more relevant and focused keywords based on topic
      const words = seoData.topic.toLowerCase().split(/\s+/);
      const mainTerm = words[words.length - 1] || words[0] || "chatbot";
      
      const relatedKeywords = [
        mainTerm,
        `ai ${mainTerm}`,
        `${mainTerm} technology`,
        `conversational ${mainTerm}`,
        `automated ${mainTerm}`,
        `${mainTerm} support`,
        `dialogue ${mainTerm}`,
        `${mainTerm} intelligence`,
        `virtual ${mainTerm}`,
        `customer ${mainTerm}`,
        `${mainTerm} integration`,
        `${mainTerm} platform`,
        `${mainTerm} solution`,
        `business ${mainTerm}`,
        `enterprise ${mainTerm}`,
        `${mainTerm} benefits`,
        `${mainTerm} application`,
        `${mainTerm} implementation`,
        `${mainTerm} system`,
        `${mainTerm} interface`
      ];
      
      // Take only the number of keywords specified by the user
      onDataChange("keywords", relatedKeywords.slice(0, seoData.keywordCount));
      setIsGeneratingKeywords(false);
      
      toast({
        title: "Keywords generated",
        description: `Generated ${seoData.keywordCount} keywords based on your topic`,
      });
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
  
  const handleSelectAll = () => {
    if (seoData.selectedKeywords.length === seoData.keywords.length) {
      onDataChange("selectedKeywords", []);
    } else {
      onDataChange("selectedKeywords", [...seoData.keywords]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Topic</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">What is this article about?</label>
            <Textarea 
              placeholder="What is this article about?"
              value={seoData.topic}
              onChange={(e) => onDataChange("topic", e.target.value)}
              className="resize-none h-32"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Number of Keywords</label>
            <Input 
              type="number" 
              value={seoData.keywordCount}
              onChange={(e) => onDataChange("keywordCount", parseInt(e.target.value) || 10)}
              min={1}
              max={20}
            />
          </div>
          
          <div>
            <Button 
              className="w-full"
              onClick={handleGenerateKeywords}
              disabled={isGeneratingKeywords || !seoData.topic.trim()}
            >
              {isGeneratingKeywords ? "Generating Keywords..." : "Generate Keywords"}
            </Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger className="py-2">
                Advanced Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select className="w-full p-2 border rounded bg-transparent">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Keyword Difficulty</label>
                    <select className="w-full p-2 border rounded bg-transparent">
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
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Select Keywords</h2>
          {seoData.keywords.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {seoData.selectedKeywords.length === seoData.keywords.length ? "Deselect All" : "Select All"}
            </Button>
          )}
        </div>
        
        {seoData.keywords.length > 0 ? (
          <>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {seoData.keywords.map((keyword: string, index: number) => (
                  <Button
                    key={index}
                    variant={seoData.selectedKeywords.includes(keyword) ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => handleKeywordSelect(keyword)}
                    size="sm"
                  >
                    {keyword}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm" className="px-2">
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
              
              <Button onClick={onNext} className="px-6">Continue</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
            <p className="mb-2">No keywords generated yet</p>
            <p className="text-sm">Generate keywords using the form on the left</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TopicStep;
