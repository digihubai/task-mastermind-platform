
import React from "react";
import { User, Bot, MessageCircle } from "lucide-react";
import { AvatarImage } from "@/components/ui/avatar";

interface AvatarRendererProps {
  avatarType: string;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({ avatarType }) => {
  // Check if avatar is one of our predefined options or a custom image URL
  if (avatarType.startsWith("avatar")) {
    switch(avatarType) {
      case "avatar1":
        return <User className="text-primary-foreground" />;
      case "avatar2":
        return <User className="text-purple-500" />;
      case "avatar3":
        return <User className="text-green-500" />;
      case "avatar4":
        return <User className="text-orange-500" />;
      case "avatar5":
        return <MessageCircle className="text-blue-500" />;
      default:
        return <Bot className="text-primary-foreground" />;
    }
  } else {
    // If it's a custom image URL
    return (
      <AvatarImage src={avatarType} alt="Custom Avatar" className="object-cover" />
    );
  }
};
