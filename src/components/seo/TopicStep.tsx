
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, PlusCircle, ArrowRight } from "lucide-react";

interface TopicStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
}

const TopicStep: React.FC<TopicStepProps> = ({ seoData, onDataChange, onNext }) => {
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange('topic', e.target.value);
  };

  const handleKeywordSelect = (keyword: string) => {
    const isSelected = seoData.selectedKeywords.includes(keyword);
    let newSelectedKeywords = [...seoData.selectedKeywords];
    
    if (isSelected) {
      newSelectedKeywords = newSelectedKeywords.filter(k => k !== keyword);
    } else {
      newSelectedKeywords.push(keyword);
    }
    
    onDataChange('selectedKeywords', newSelectedKeywords);
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 1: Choose Your Topic</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            What topic would you like to write about?
          </label>
          <Input 
            placeholder="Enter your main topic (e.g., 'Digital Marketing')" 
            value={seoData.topic}
            onChange={handleTopicChange}
          />
        </div>
        
        {seoData.keywords.length > 0 && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Select relevant keywords
                <span className="text-sm text-muted-foreground ml-2">
                  (Select at least one)
                </span>
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {seoData.keywords.map((keyword: string, index: number) => {
                  const isSelected = seoData.selectedKeywords.includes(keyword);
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
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={onNext}
          disabled={seoData.selectedKeywords.length === 0}
          className="gap-2"
        >
          Next Step
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default TopicStep;
