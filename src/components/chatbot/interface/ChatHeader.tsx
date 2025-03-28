
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot, MessageCircle } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  accentColor: string;
  avatar: string;
  renderAvatar: () => React.ReactNode;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  accentColor,
  renderAvatar
}) => {
  return (
    <div 
      className="chat-header p-3 border-b flex items-center justify-between" 
      style={{ borderColor: accentColor, backgroundColor: `${accentColor}20` }}
    >
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarFallback 
            style={{ backgroundColor: accentColor }}
          >
            {renderAvatar()}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-medium">{title}</h3>
      </div>
    </div>
  );
};
