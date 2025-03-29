
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SkipButtonProps {
  onSkip: () => void;
}

export const SkipButton: React.FC<SkipButtonProps> = ({ onSkip }) => {
  return (
    <div className="mb-8">
      <Button
        variant="outline"
        onClick={onSkip}
        className="text-muted-foreground hover:text-foreground"
      >
        Skip this step
        <ArrowRight size={16} className="ml-2" />
      </Button>
      <p className="text-xs text-muted-foreground mt-1">
        You can always train your chatbot later from the dashboard.
      </p>
    </div>
  );
};
