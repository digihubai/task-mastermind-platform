
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader, Plus, Minus, Check } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface OutlineStepProps {
  seoData: {
    topic: string;
    selectedKeywords: string[];
    selectedTitle: string;
    outlines: any[];
    selectedOutline: any;
  };
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  generateOutline: (topic: string, keywords: string[], title: string) => Promise<any>;
}

const OutlineStep: React.FC<OutlineStepProps> = ({ 
  seoData, 
  onDataChange, 
  onNext, 
  onPrev,
  generateOutline
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [customOutline, setCustomOutline] = useState("");

  const handleGenerateOutline = async () => {
    if (!seoData.selectedTitle) {
      toast.error("Please select a title first");
      return;
    }

    setIsGenerating(true);
    try {
      const generatedOutline = await generateOutline(
        seoData.topic, 
        seoData.selectedKeywords, 
        seoData.selectedTitle
      );
      
      // Format the outline if needed
      let formattedOutline;
      
      if (typeof generatedOutline === 'string') {
        // If the API returns a string, parse it into sections
        const sections = generatedOutline
          .split(/#{2,3}\s+/g)
          .filter(Boolean)
          .map(section => section.trim());
        
        formattedOutline = { 
          id: Date.now().toString(), 
          title: seoData.selectedTitle, 
          sections 
        };
      } else {
        // If the API returns an object, use it directly
        formattedOutline = generatedOutline;
      }
      
      // Add the formatted outline to the outlines array
      onDataChange("outlines", [...seoData.outlines, formattedOutline]);
      
      // Select the newly generated outline
      onDataChange("selectedOutline", formattedOutline);
      
      toast.success("Outline generated successfully");
    } catch (error) {
      console.error("Error generating outline:", error);
      toast.error("Failed to generate outline. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseCustomOutline = () => {
    if (!customOutline.trim()) {
      toast.error("Please enter a custom outline");
      return;
    }

    const sections = customOutline
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.trim().replace(/^[-*#]+\s*/, ''));

    const customOutlineObj = {
      id: Date.now().toString(),
      title: seoData.selectedTitle,
      sections
    };

    onDataChange("outlines", [...seoData.outlines, customOutlineObj]);
    onDataChange("selectedOutline", customOutlineObj);
    toast.success("Custom outline saved");
  };

  const handleSelectOutline = (outline: any) => {
    onDataChange("selectedOutline", outline);
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-4">Content Outline</h2>
      <p className="text-muted-foreground mb-6">
        Generate an outline for your article or create a custom one.
      </p>

      <div className="space-y-6">
        {seoData.selectedTitle ? (
          <>
            <div className="bg-muted p-3 rounded-md">
              <h3 className="text-lg font-medium">Selected Title</h3>
              <p className="mt-1">{seoData.selectedTitle}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Button
                  onClick={handleGenerateOutline}
                  disabled={isGenerating}
                  className="w-full mb-4"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <Loader size={16} className="mr-2 animate-spin" />
                      Generating outline...
                    </div>
                  ) : (
                    <>Generate AI Outline</>
                  )}
                </Button>

                <div className="mt-6">
                  <Label htmlFor="custom-outline">Or enter a custom outline:</Label>
                  <Textarea
                    id="custom-outline"
                    placeholder="- Introduction&#13;&#10;- Section 1&#13;&#10;- Section 2&#13;&#10;- Conclusion"
                    className="h-32 mt-2"
                    value={customOutline}
                    onChange={(e) => setCustomOutline(e.target.value)}
                  />
                  <Button
                    onClick={handleUseCustomOutline}
                    variant="outline"
                    className="mt-2 w-full"
                  >
                    Use Custom Outline
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Outlines:</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {seoData.outlines.length > 0 ? (
                    seoData.outlines.map((outline, index) => (
                      <div
                        key={outline.id || index}
                        className={`border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                          seoData.selectedOutline && seoData.selectedOutline.id === outline.id
                            ? "border-primary/50 bg-primary/10"
                            : "border-border"
                        }`}
                        onClick={() => handleSelectOutline(outline)}
                      >
                        <div className="flex items-center gap-2">
                          {seoData.selectedOutline && seoData.selectedOutline.id === outline.id && (
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                          <h4 className="font-medium text-sm">Outline {index + 1}</h4>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {outline.sections && outline.sections.slice(0, 3).map((section: string, i: number) => (
                            <div key={i} className="truncate">• {section}</div>
                          ))}
                          {outline.sections && outline.sections.length > 3 && (
                            <div className="text-xs mt-1">+ {outline.sections.length - 3} more sections</div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-4 text-muted-foreground">
                      No outlines generated yet. Click "Generate AI Outline" to create one.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Please go back and select a title first.</p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!seoData.selectedOutline}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OutlineStep;
