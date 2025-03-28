
import React from "react";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, MessageCircle } from "lucide-react";

interface AvatarSelectionProps {
  selectedAvatar: string;
  updateInfo: (key: string, value: any) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({ 
  selectedAvatar, 
  updateInfo,
  fileInputRef 
}) => {
  // Define avatar options
  const avatars = [
    { value: "avatar1", icon: <User className="text-white" /> },
    { value: "avatar2", icon: <User className="text-purple-500" /> },
    { value: "avatar3", icon: <User className="text-green-500" /> },
    { value: "avatar4", icon: <User className="text-orange-500" /> },
    { value: "avatar5", icon: <MessageCircle className="text-blue-500" /> },
  ];

  return (
    <div>
      <Label>Avatar</Label>
      <p className="text-sm text-muted-foreground mb-4">Select an avatar for your chatbot.</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {avatars.map((avatar, index) => (
          <div 
            key={index}
            className={`relative cursor-pointer transition-all`}
            onClick={() => updateInfo("avatar", avatar.value)}
          >
            <Avatar 
              className={`w-12 h-12 border-2 ${
                selectedAvatar === avatar.value 
                  ? "border-primary" 
                  : "border-transparent"
              }`}
            >
              <AvatarFallback 
                className={`${
                  index === 0 ? "bg-amber-500" : 
                  index === 1 ? "bg-red-500" : 
                  index === 2 ? "bg-blue-500" : 
                  index === 3 ? "bg-teal-500" : 
                  "bg-violet-500"
                }`}
              >
                {avatar.icon}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
        
        {/* Add custom avatar option */}
        <div 
          className="cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar className="w-12 h-12 border-2 border-dashed border-muted-foreground/30 bg-muted/50 flex items-center justify-center">
            <span className="text-2xl font-light text-muted-foreground">+</span>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
