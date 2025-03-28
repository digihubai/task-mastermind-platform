
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TopicStepProps {
  topic: string;
  onTopicChange: (value: string) => void;
  onNext: () => void;
}

const TopicStep: React.FC<TopicStepProps> = ({ topic, onTopicChange, onNext }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose Your Topic</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">What would you like to write about?</label>
            <textarea 
              className="w-full h-32 p-3 border rounded-md"
              placeholder="Enter your topic here..."
              value={topic}
              onChange={(e) => onTopicChange(e.target.value)}
            ></textarea>
          </div>
          <Button 
            onClick={onNext} 
            disabled={!topic.trim()}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TopicStep;
