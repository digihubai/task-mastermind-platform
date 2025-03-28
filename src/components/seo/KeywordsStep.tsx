
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, CheckCircle2, RefreshCw, ArrowLeft, ArrowRight } from "lucide-react";
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
  
  const handleGenerateKeywords = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic first");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call to generate keywords
    setTimeout(() => {
      const topicWords = topic.toLowerCase().split(/\s+/);
      
      // Generate keywords based on the topic
      const generatedKeywords = [
        topic,
        `${topic} guide`,
        `${topic} best practices`,
        `how to ${topic}`,
        `${topic} examples`,
        `${topic} trends`,
        `${topicWords[0]} strategy`,
        `${topicWords[0]} tips`,
        `${topicWords.length > 1 ? topicWords[1] : topicWords[0]} optimization`,
        `affordable ${topic}`,
        `professional ${topic}`,
        `${topic} services`,
        `${topic} tools`,
        `${topic} software`,
        `${topic} solutions`
      ].slice(0, keywordCount);
      
      onDataChange("keywords", generatedKeywords);
      setIsGenerating(false);
      
      toast.success(`Generated ${generatedKeywords.length} keywords`);
    }, 1500);
  };
  
  const handleKeywordSelect = (keyword: string) => {
    const isSelected = selectedKeywords.includes(keyword);
    let newSelectedKeywords = [...selectedKeywords];
    
    if (isSelected) {
      newSelectedKeywords = newSelectedKeywords.filter(k => k !== keyword);
    } else {
      newSelectedKeywords.push(keyword);
    }
    
    onDataChange("selectedKeywords", newSelectedKeywords);
  };
  
  const handleKeywordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count > 0 && count <= 20) {
      onDataChange("keywordCount", count);
    }
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 2: Keyword Research</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Number of keywords to generate
          </label>
          <div className="flex gap-4">
            <Input 
              type="number" 
              min="3" 
              max="20" 
              value={keywordCount} 
              onChange={handleKeywordCountChange}
              className="max-w-[100px]"
            />
            <Button 
              onClick={handleGenerateKeywords}
              disabled={!topic.trim() || isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Generate Keywords
                </>
              )}
            </Button>
          </div>
        </div>
        
        {keywords.length > 0 && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Select relevant keywords
                <span className="text-sm text-muted-foreground ml-2">
                  (Select 3-5 keywords for best results)
                </span>
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, index) => {
                  const isSelected = selectedKeywords.includes(keyword);
                  return (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className={`cursor-pointer py-1.5 px-3 ${
                        isSelected 
                          ? 'bg-primary/10 border-primary text-primary' 
                          : ''
                      }`}
                      onClick={() => handleKeywordSelect(keyword)}
                    >
                      {isSelected ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <PlusCircle className="mr-1 h-3 w-3" />}
                      {keyword}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Previous Step
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={selectedKeywords.length === 0}
          className="gap-2"
        >
          Next Step
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default KeywordsStep;
