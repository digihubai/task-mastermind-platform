
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile, X, Send } from "lucide-react";
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
      <div className="relative flex items-center gap-2">
        <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
          <PopoverTrigger asChild>
            <button 
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Add emoji"
            >
              <Smile size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border shadow-md" align="start">
            <Picker 
              data={data} 
              onEmojiSelect={handleEmojiSelect} 
              theme="light"
              previewPosition="none"
            />
          </PopoverContent>
        </Popover>
        
        <div className="relative flex-1">
          <input 
            type="text" 
            className="w-full border rounded-full py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus-visible:ring-2 focus-visible:ring-offset-2 transition-all" 
            style={{ borderColor: `${accentColor}50` }}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          
          {message && (
            <button 
              className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
              onClick={() => setMessage("")}
              aria-label="Clear message"
            >
              <X size={16} />
            </button>
          )}
          
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white rounded-full p-1.5 transition-transform hover:scale-110"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{ backgroundColor: message.trim() ? accentColor : '#ccc' }}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
      
      {showBranding && (
        <div className="text-center text-xs text-muted-foreground mt-2">
          Powered by DigiHub
        </div>
      )}
    </div>
  );
};
