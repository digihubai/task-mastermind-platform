
import React from "react";
import { HelpCircle } from "lucide-react";

export const NodeEditorEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
      <HelpCircle size={48} className="text-muted-foreground/50 mb-2" />
      <h3 className="text-lg font-medium">Select a Node</h3>
      <p className="text-sm text-muted-foreground">
        Select a node from the left panel to edit its properties.
      </p>
    </div>
  );
};
