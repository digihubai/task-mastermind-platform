
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface SkipButtonProps {
  onSkip: () => void;
}

export const SkipButton: React.FC<SkipButtonProps> = ({ onSkip }) => {
  return (
    <Button 
      variant="outline" 
      className="w-full justify-center gap-2 text-muted-foreground"
      onClick={onSkip}
    >
      Skip <ChevronRight size={16} />
    </Button>
  );
};
