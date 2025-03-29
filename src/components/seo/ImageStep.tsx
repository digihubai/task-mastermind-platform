
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ImageStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageStep: React.FC<ImageStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-4">Add Images</h2>
      <p className="text-muted-foreground mb-6">
        Add relevant images to enhance your content. This feature will be fully implemented soon.
      </p>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={onNext}>
          Skip for now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ImageStep;
