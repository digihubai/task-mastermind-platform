
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const VisionBackButton = () => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="gap-1" 
      asChild
    >
      <Link to="/ai-tools">
        <ArrowLeft size={16} />
        <span>Back to AI Tools</span>
      </Link>
    </Button>
  );
};

export default VisionBackButton;
