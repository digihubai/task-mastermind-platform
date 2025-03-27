
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamChannel, TeamGroup } from "@/types/support";
import { 
  Plus, 
  Gift, 
  Smile, 
  ImageIcon, 
  FileText, 
  Reply,
  Trash2,
  Send
} from "lucide-react";

interface MessageInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  replyTo: string | null;
  setReplyTo: (messageId: string | null) => void;
  showGifPicker: boolean;
  setShowGifPicker: (show: boolean) => void;
  onSendMessage: () => void;
  onInsertGif: (gifUrl: string) => void;
  selectedChannel: TeamChannel | null;
  selectedGroup: TeamGroup | null;
}

const MessageInput: React.FC<MessageInputProps> = ({
  messageText,
  setMessageText,
  replyTo,
  setReplyTo,
  showGifPicker,
  setShowGifPicker,
  onSendMessage,
  onInsertGif,
  selectedChannel,
  selectedGroup
}) => {
  return (
    <div className="p-3 border-t">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" className="h-7">
          <Plus size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7"
          onClick={() => setShowGifPicker(!showGifPicker)}
        >
          <Gift size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="h-7">
          <Smile size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="h-7">
          <ImageIcon size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="h-7">
          <FileText size={16} />
        </Button>
        
        {replyTo && (
          <div className="flex-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Reply size={14} />
            <span>Replying to a message</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-auto"
              onClick={() => setReplyTo(null)}
            >
              <Trash2 size={12} />
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder={`Message ${
            selectedChannel ? `#${selectedChannel.name}` : 
            selectedGroup ? selectedGroup.name : 
            "..."
          }`}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
        />
        <Button 
          size="icon"
          disabled={messageText.trim() === ""}
          onClick={onSendMessage}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
