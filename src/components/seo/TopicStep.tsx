
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface TopicStepProps {
  topic: string;
  onTopicChange: (value: string) => void;
  onNext: () => void;
}

const TopicStep: React.FC<TopicStepProps> = ({ topic, onTopicChange, onNext }) => {
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTopicChange(e.target.value);
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
            value={topic}
            onChange={handleTopicChange}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Choose a specific topic for better results. For example, instead of "Marketing," try "Email Marketing Strategies for SaaS Companies."
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!topic.trim()}
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
