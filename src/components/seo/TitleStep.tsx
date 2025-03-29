
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface TitleStepProps {
  seoData: {
    topic: string;
    selectedKeywords: string[];
    titles: string[];
    selectedTitle: string;
    numberOfTitles: number;
  };
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  generateTitles: (topic: string, keywords: string[], count?: number) => Promise<string[]>;
}

const TitleStep: React.FC<TitleStepProps> = ({
  seoData,
  onDataChange,
  onNext,
  onPrev,
  generateTitles
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTitle, setCustomTitle] = useState("");

  const handleGenerateTitles = async () => {
    if (seoData.selectedKeywords.length === 0) {
      toast.error("Please select at least one keyword first");
      return;
    }

    setIsGenerating(true);
    try {
      const generatedTitles = await generateTitles(
        seoData.topic,
        seoData.selectedKeywords,
        seoData.numberOfTitles
      );
      onDataChange("titles", generatedTitles);
      toast.success("Titles generated successfully");
    } catch (error) {
      console.error("Error generating titles:", error);
      toast.error("Failed to generate titles. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectTitle = (title: string) => {
    onDataChange("selectedTitle", title);
  };

  const handleUseCustomTitle = () => {
    if (!customTitle.trim()) {
      toast.error("Please enter a custom title");
      return;
    }
    
    onDataChange("selectedTitle", customTitle);
    onDataChange("titles", [...seoData.titles, customTitle]);
    setCustomTitle("");
    toast.success("Custom title saved");
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-2">Choose a Title</h2>
      <p className="text-muted-foreground mb-6">
        Generate title options for your content or enter your own custom title.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Button
            onClick={handleGenerateTitles}
            disabled={isGenerating}
            className="w-full mb-4"
          >
            {isGenerating ? (
              <div className="flex items-center">
                <Loader size={16} className="mr-2 animate-spin" />
                Generating titles...
              </div>
            ) : (
              <>Generate AI Titles</>
            )}
          </Button>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Or add your own title:</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter custom title..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />
              <Button onClick={handleUseCustomTitle} variant="outline">
                Use
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Title Options:</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {seoData.titles.length > 0 ? (
              seoData.titles.map((title, index) => (
                <div
                  key={index}
                  className={`border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                    seoData.selectedTitle === title
                      ? "border-primary/50 bg-primary/10"
                      : "border-border"
                  }`}
                  onClick={() => handleSelectTitle(title)}
                >
                  <div className="flex items-center gap-2">
                    {seoData.selectedTitle === title && (
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                    <span>{title}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No titles generated yet. Click "Generate AI Titles" to create options.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!seoData.selectedTitle}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TitleStep;
