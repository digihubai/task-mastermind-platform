
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="relative">
      <Input
        placeholder="Type a message"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        className="pr-20"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSendMessage();
          }
        }}
      />
      <Button 
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full"
        onClick={onSendMessage}
        disabled={disabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18" className="rotate-90">
          <path fill="currentColor" d="M8.459.608a.75.75 0 0 1 1.082 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L9.75 2.939v13.311a.75.75 0 0 1-1.5 0V2.939L2.02 9.168a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"></path>
        </svg>
      </Button>
    </div>
  );
};

export default MessageInput;
