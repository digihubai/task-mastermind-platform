
import React from "react";
import { Card } from "@/components/ui/card";
import { FilePlus2, Sparkles, Palette, Image as ImageIcon } from "lucide-react";

const ActionCards = () => {
  return (
    <div className="space-y-4">
      <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
        <div className="flex items-start gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
            <FilePlus2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium">Generate Alt Text</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Create accessible image descriptions for web content
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
        <div className="flex items-start gap-3">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="font-medium">Create Social Media Caption</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Generate engaging captions based on image content
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
        <div className="flex items-start gap-3">
          <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-full">
            <Palette className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="font-medium">Extract Color Palette</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Identify main colors for design and branding
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border border-border/40 cursor-pointer hover:bg-accent/50 transition-colors">
        <div className="flex items-start gap-3">
          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
            <ImageIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-medium">Similar Image Search</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Find visually similar images in your library
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActionCards;
