
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile, X, ArrowRight } from "lucide-react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  accentColor: string;
  showBranding: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  accentColor,
  showBranding
}) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-input border-t p-3">
      <div className="relative">
        <input 
          type="text" 
          className="w-full border rounded-full py-3 px-4 pr-12 focus:outline-none focus:ring-1"
          style={{ borderColor: `${accentColor}30` }}
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white rounded-full p-1.5 transition-transform hover:scale-110"
          onClick={handleSendMessage}
          disabled={!message.trim()}
          style={{ backgroundColor: message.trim() ? accentColor : '#ccc' }}
          aria-label="Send message"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      
      {showBranding && (
        <div className="text-center text-xs text-muted-foreground mt-2 flex items-center justify-center">
          <span className="mr-1">Powered by</span>
          <span className="font-semibold">digihub</span>
        </div>
      )}
    </div>
  );
};
