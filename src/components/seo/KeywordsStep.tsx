
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw,
  Plus,
  X,
  Search
} from "lucide-react";

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
  const [customKeyword, setCustomKeyword] = useState("");
  
  // Generate keywords when topic changes or on initial load
  useEffect(() => {
    if (topic && keywords.length === 0) {
      handleGenerateKeywords();
    }
  }, [topic]);

  const handleGenerateKeywords = () => {
    if (!topic.trim()) {
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const generatedKeywords = [
        "digital marketing", "SEO", "content strategy", "search engine",
        "keyword research", "backlinks", "meta description", "search ranking",
        "organic traffic", "SERP", "landing page", "conversion rate",
        "indexing", "mobile optimization", "page authority", "technical SEO"
      ];
      
      // Randomly select a subset of keywords based on the specified count
      const shuffled = [...generatedKeywords].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, keywordCount);
      
      onDataChange("keywords", selected);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleKeywordSelect = (keyword: string) => {
    const updatedSelection = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter(k => k !== keyword)
      : [...selectedKeywords, keyword];
    
    onDataChange("selectedKeywords", updatedSelection);
  };
  
  const handleAddCustomKeyword = () => {
    if (!customKeyword.trim()) return;
    
    // Add to keywords list if not already there
    if (!keywords.includes(customKeyword)) {
      onDataChange("keywords", [...keywords, customKeyword]);
    }
    
    // Add to selected keywords
    if (!selectedKeywords.includes(customKeyword)) {
      onDataChange("selectedKeywords", [...selectedKeywords, customKeyword]);
    }
    
    setCustomKeyword("");
  };
  
  const handleKeywordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (count >= 1 && count <= 20) {
      onDataChange("keywordCount", count);
    }
  };

  return (
    <Card className="p-6 border border-border/40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Step 2: Keywords Selection</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Keyword count:</span>
          <Input
            type="number"
            value={keywordCount}
            onChange={handleKeywordCountChange}
            className="w-16 h-8"
            min={1}
            max={20}
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-sm font-medium">Generated Keywords</h3>
              <p className="text-xs text-muted-foreground">
                Based on your topic: "{topic}"
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGenerateKeywords}
              disabled={isGenerating || !topic.trim()}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Regenerate
                </>
              )}
            </Button>
          </div>
          
          {isGenerating ? (
            <div className="h-32 border rounded-md flex items-center justify-center">
              <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Generating keywords...</span>
            </div>
          ) : keywords.length === 0 ? (
            <div className="h-32 border rounded-md flex flex-col items-center justify-center text-center p-4">
              <Search className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
              <p className="text-muted-foreground">
                {!topic.trim() 
                  ? "Please enter a topic to generate keywords" 
                  : "Click 'Regenerate' to generate keywords for your topic"}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mt-4">
              {keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
                  className="cursor-pointer text-sm py-1.5 px-3"
                  onClick={() => handleKeywordSelect(keyword)}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Add Custom Keywords</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter a custom keyword"
              value={customKeyword}
              onChange={(e) => setCustomKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomKeyword()}
            />
            <Button onClick={handleAddCustomKeyword} disabled={!customKeyword.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {selectedKeywords.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">
              Selected Keywords ({selectedKeywords.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedKeywords.map((keyword, index) => (
                <div 
                  key={index}
                  className="bg-primary/10 text-primary rounded-full py-1.5 px-3 flex items-center gap-1"
                >
                  <span>{keyword}</span>
                  <button 
                    onClick={() => handleKeywordSelect(keyword)}
                    className="h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={selectedKeywords.length === 0}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default KeywordsStep;
