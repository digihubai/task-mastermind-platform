
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, List, RefreshCw, CheckCircle } from "lucide-react";

interface OutlineSelectorProps {
  generatedOutlines: string[];
  selectedOutline: string;
  onSelectOutline: (outline: string) => void;
  onGenerateOutlines: () => void;
  onNext: () => void;
  onPrev: () => void;
  seoData: any;
}

const OutlineSelector: React.FC<OutlineSelectorProps> = ({
  generatedOutlines,
  selectedOutline,
  onSelectOutline,
  onGenerateOutlines,
  onNext,
  onPrev,
  seoData,
}) => {
  const handleContinue = () => {
    if (selectedOutline || seoData.outline) {
      onNext();
    }
  };

  if (generatedOutlines.length === 0) {
    return (
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose an Outline</h2>
        <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
          <List size={40} className="mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-1">No outlines generated yet</h3>
          <p className="max-w-xs">Click "Generate Outline Options" to create outline alternatives for your content.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-4">Choose an Outline</h2>
      <div className="space-y-4 mb-6">
        {generatedOutlines.map((outline, index) => (
          <div 
            key={index}
            className={`p-4 border rounded-md cursor-pointer transition-colors overflow-auto max-h-[300px] relative ${
              selectedOutline === outline ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
            onClick={() => onSelectOutline(outline)}
          >
            {selectedOutline === outline && (
              <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                <CheckCircle size={16} />
              </div>
            )}
            <div className="font-medium mb-2 text-sm">Option {index + 1}</div>
            <pre className="whitespace-pre-wrap font-sans text-sm">{outline}</pre>
          </div>
        ))}
        
        <Button variant="outline" className="w-full" onClick={onGenerateOutlines}>
          <RefreshCw size={16} className="mr-2" />
          Generate More Outline Options
        </Button>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <Button onClick={handleContinue} disabled={!selectedOutline && !seoData.outline}>
          Continue to Image
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default OutlineSelector;
