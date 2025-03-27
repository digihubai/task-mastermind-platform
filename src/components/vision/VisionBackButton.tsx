
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const VisionBackButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="gap-1"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft size={16} />
      <span>Back</span>
    </Button>
  );
};

export default VisionBackButton;
