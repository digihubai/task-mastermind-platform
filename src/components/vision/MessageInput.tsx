
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  disabled: boolean;
}

const MessageInput = ({ 
  message, 
  onMessageChange, 
  onSendMessage,
  disabled
}: MessageInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t">
      <Input
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ask about this image..."
        className="flex-1"
      />
      <Button 
        size="icon" 
        onClick={onSendMessage}
        disabled={disabled}
      >
        <SendHorizontal size={18} />
      </Button>
    </div>
  );
};

export default MessageInput;
