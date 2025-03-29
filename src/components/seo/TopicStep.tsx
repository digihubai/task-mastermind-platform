
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface TopicStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
}

const TopicStep: React.FC<TopicStepProps> = ({ seoData, onDataChange, onNext }) => {
  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-6">Enter Your Topic</h2>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="topic">What topic would you like to write about?</Label>
          <Input
            id="topic"
            placeholder="e.g., AI-powered marketing strategies"
            value={seoData.topic}
            onChange={(e) => onDataChange("topic", e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Enter a specific topic for better results. The more detailed your topic, the more relevant the generated content will be.
          </p>
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={onNext}
            disabled={!seoData.topic}
            className="w-full sm:w-auto"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TopicStep;
