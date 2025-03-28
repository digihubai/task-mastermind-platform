
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

interface CRMHeaderProps {
  title: string;
  subtitle: string;
}

const CRMHeader: React.FC<CRMHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">
          {subtitle}
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download size={18} />
          <span>Export</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex items-center gap-2"
        >
          <Upload size={18} />
          <span>Import</span>
        </Button>
      </div>
    </div>
  );
};

export default CRMHeader;
