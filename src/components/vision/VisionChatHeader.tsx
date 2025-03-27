
import React from "react";
import { Share2, Settings, ChevronDown, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VisionChatHeaderProps {
  onShare: () => void;
  onSettings: () => void;
}

const VisionChatHeader = ({ onShare, onSettings }: VisionChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
          <Image size={20} />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-medium">VisionAI</span>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Image Expert</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full" 
          onClick={onShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={onSettings}
        >
          <Settings size={18} />
        </Button>
      </div>
    </div>
  );
};

export default VisionChatHeader;
