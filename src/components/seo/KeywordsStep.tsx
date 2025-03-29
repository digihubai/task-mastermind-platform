
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader, X, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

interface KeywordsStepProps {
  seoData: {
    topic: string;
    keywords: string[];
    selectedKeywords: string[];
    keywordCount: number;
  };
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  generateKeywords: (topic: string, count?: number) => Promise<string[]>;
}

const KeywordsStep: React.FC<KeywordsStepProps> = ({
  seoData,
  onDataChange,
  onNext,
  onPrev,
  generateKeywords
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [customKeyword, setCustomKeyword] = useState("");

  const handleGenerateKeywords = async () => {
    if (!seoData.topic) {
      toast.error("Please enter a topic first");
      return;
    }

    setIsGenerating(true);
    try {
      const generatedKeywords = await generateKeywords(seoData.topic, seoData.keywordCount);
      onDataChange("keywords", generatedKeywords);
      
      // If no keywords are selected yet, automatically select the first 3
      if (seoData.selectedKeywords.length === 0 && generatedKeywords.length > 0) {
        onDataChange("selectedKeywords", generatedKeywords.slice(0, 3));
      }
      
      toast.success("Keywords generated successfully");
    } catch (error) {
      console.error("Error generating keywords:", error);
      toast.error("Failed to generate keywords. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectKeyword = (keyword: string) => {
    const isSelected = seoData.selectedKeywords.includes(keyword);
    
    if (isSelected) {
      onDataChange(
        "selectedKeywords",
        seoData.selectedKeywords.filter((k) => k !== keyword)
      );
    } else {
      onDataChange("selectedKeywords", [...seoData.selectedKeywords, keyword]);
    }
  };

  const handleAddCustomKeyword = () => {
    if (!customKeyword.trim()) {
      toast.error("Please enter a keyword");
      return;
    }
    
    // Add to both keywords list and selected keywords
    onDataChange("keywords", [...seoData.keywords, customKeyword]);
    onDataChange("selectedKeywords", [...seoData.selectedKeywords, customKeyword]);
    setCustomKeyword("");
    toast.success("Custom keyword added");
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-2">Select Keywords</h2>
      <p className="text-muted-foreground mb-6">
        Generate or add custom keywords to optimize your content.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-6">
            <Label>Number of keywords to generate: {seoData.keywordCount}</Label>
            <Slider
              className="mt-2"
              value={[seoData.keywordCount]}
              min={5}
              max={30}
              step={1}
              onValueChange={(value) => onDataChange("keywordCount", value[0])}
            />
          </div>
        
          <Button
            onClick={handleGenerateKeywords}
            disabled={isGenerating}
            className="w-full mb-6"
          >
            {isGenerating ? (
              <div className="flex items-center">
                <Loader size={16} className="mr-2 animate-spin" />
                Generating keywords...
              </div>
            ) : (
              <>Generate AI Keywords</>
            )}
          </Button>

          <div>
            <h3 className="font-medium mb-2">Or add your own keywords:</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter custom keyword..."
                value={customKeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddCustomKeyword();
                  }
                }}
              />
              <Button onClick={handleAddCustomKeyword} variant="outline">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Selected Keywords:</h3>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-2 border rounded-md">
                {seoData.selectedKeywords.length > 0 ? (
                  seoData.selectedKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="pr-1 flex items-center gap-1"
                    >
                      {keyword}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => handleSelectKeyword(keyword)}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No keywords selected. Click on keywords below to select them.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Available Keywords:</h3>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {seoData.keywords.length > 0 ? (
                  seoData.keywords.map((keyword, index) => {
                    const isSelected = seoData.selectedKeywords.includes(keyword);
                    return (
                      <Badge
                        key={index}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer flex items-center gap-1"
                        onClick={() => handleSelectKeyword(keyword)}
                      >
                        {isSelected && <Check size={10} className="mr-1" />}
                        {keyword}
                      </Badge>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No keywords generated yet. Click "Generate AI Keywords" to create some.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={seoData.selectedKeywords.length === 0}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default KeywordsStep;
