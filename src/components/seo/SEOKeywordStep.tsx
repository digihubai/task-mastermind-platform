
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ArrowRight, Plus, X, Loader } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SEOKeywordStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOKeywordStep: React.FC<SEOKeywordStepProps> = ({
  seoData,
  onDataChange,
  onNext,
  onPrev
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [manualKeyword, setManualKeyword] = useState("");
  const [keywordCount, setKeywordCount] = useState(seoData.keywordCount || 10);
  const [customKeywordMode, setCustomKeywordMode] = useState(false);
  
  const generateKeywords = () => {
    if (!seoData.topic) {
      toast.error("Please enter a topic first");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to AI service
    setTimeout(() => {
      const mockKeywords = [
        `${seoData.topic} strategies`,
        `best ${seoData.topic} practices`,
        `how to improve ${seoData.topic}`,
        `${seoData.topic} tools`,
        `${seoData.topic} guide`,
        `${seoData.topic} tips`,
        `${seoData.topic} examples`,
        `advanced ${seoData.topic}`,
        `${seoData.topic} for beginners`,
        `${seoData.topic} techniques`,
        `optimize ${seoData.topic}`,
        `${seoData.topic} trends`,
        `${seoData.topic} analytics`,
        `${seoData.topic} best practices`,
        `${seoData.topic} metrics`,
        `measuring ${seoData.topic} success`,
        `${seoData.topic} methodology`,
        `${seoData.topic} framework`,
        `implement ${seoData.topic}`,
        `${seoData.topic} ROI`
      ].slice(0, keywordCount);
      
      onDataChange("keywords", mockKeywords);
      setIsLoading(false);
      toast.success(`Generated ${mockKeywords.length} SEO keywords`);
    }, 1500);
  };
  
  const handleAddManualKeyword = () => {
    if (!manualKeyword.trim()) {
      return;
    }
    
    if (seoData.keywords.includes(manualKeyword.trim())) {
      toast.error("This keyword already exists");
      return;
    }
    
    const updatedKeywords = [...seoData.keywords, manualKeyword.trim()];
    onDataChange("keywords", updatedKeywords);
    setManualKeyword("");
    toast.success("Keyword added");
  };
  
  const handleRemoveKeyword = (keyword: string) => {
    const updatedKeywords = seoData.keywords.filter((k: string) => k !== keyword);
    onDataChange("keywords", updatedKeywords);
  };
  
  const handleSelectKeyword = (keyword: string) => {
    const isSelected = seoData.selectedKeywords.includes(keyword);
    let updatedSelectedKeywords = [...seoData.selectedKeywords];
    
    if (isSelected) {
      updatedSelectedKeywords = updatedSelectedKeywords.filter((k: string) => k !== keyword);
    } else {
      updatedSelectedKeywords.push(keyword);
    }
    
    onDataChange("selectedKeywords", updatedSelectedKeywords);
  };
  
  const handleSelectAllKeywords = () => {
    onDataChange("selectedKeywords", [...seoData.keywords]);
    toast.success("Selected all keywords");
  };
  
  const handleClearSelectedKeywords = () => {
    onDataChange("selectedKeywords", []);
    toast.info("Cleared selected keywords");
  };
  
  useEffect(() => {
    // If we have a topic but no keywords yet, generate them automatically
    if (seoData.topic && (!seoData.keywords || seoData.keywords.length === 0) && !isLoading) {
      generateKeywords();
    }
  }, [seoData.topic]);
  
  // Update keywordCount in seoData when slider changes
  useEffect(() => {
    onDataChange("keywordCount", keywordCount);
  }, [keywordCount, onDataChange]);
  
  return (
    <Card className="p-6 border border-border/40">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">SEO Keywords</h2>
          <p className="text-muted-foreground">
            Select the most relevant keywords for your content to improve search rankings
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="customMode"
                checked={customKeywordMode}
                onCheckedChange={(checked) => setCustomKeywordMode(Boolean(checked))}
              />
              <Label htmlFor="customMode">Enter custom keywords</Label>
            </div>
            
            {!customKeywordMode && (
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-[180px]">
                  <Label>Number of keywords: {keywordCount}</Label>
                  <Slider
                    value={[keywordCount]}
                    min={5}
                    max={20}
                    step={1}
                    onValueChange={(values) => setKeywordCount(values[0])}
                    className="mt-2"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={generateKeywords}
                  disabled={isLoading || !seoData.topic}
                  className="gap-2"
                >
                  {isLoading ? <Loader size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                  {isLoading ? "Generating..." : "Regenerate"}
                </Button>
              </div>
            )}
          </div>
          
          {customKeywordMode && (
            <div className="flex space-x-2">
              <Input
                placeholder="Enter a keyword"
                value={manualKeyword}
                onChange={(e) => setManualKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddManualKeyword()}
                className="max-w-md"
              />
              <Button onClick={handleAddManualKeyword} className="gap-2">
                <Plus size={16} />
                Add
              </Button>
            </div>
          )}
          
          {seoData.keywords.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Available Keywords ({seoData.keywords.length})</span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handleSelectAllKeywords}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleClearSelectedKeywords}>
                    Clear Selection
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pb-2">
                {seoData.keywords.map((keyword: string) => (
                  <Badge 
                    key={keyword}
                    variant={seoData.selectedKeywords.includes(keyword) ? "default" : "outline"}
                    className="py-1.5 cursor-pointer flex items-center gap-1"
                    onClick={() => handleSelectKeyword(keyword)}
                  >
                    {keyword}
                    <X 
                      size={14} 
                      className="ml-1 hover:text-destructive transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveKeyword(keyword);
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader className="animate-spin h-8 w-8 text-primary" />
            </div>
          )}
          
          {!isLoading && seoData.keywords.length === 0 && (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">No keywords generated yet</p>
              <Button 
                variant="outline" 
                onClick={generateKeywords}
                className="mt-4"
                disabled={!seoData.topic}
              >
                Generate Keywords
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrev}>
            Back
          </Button>
          <Button 
            onClick={onNext}
            disabled={seoData.selectedKeywords.length === 0}
            className="gap-2"
          >
            Continue
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SEOKeywordStep;
