
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisionBackButton = () => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="gap-1"
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={16} />
      <span>Back to dashboard</span>
    </Button>
  );
};

export default VisionBackButton;
