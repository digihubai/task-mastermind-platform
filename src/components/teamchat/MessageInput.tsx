
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Gift, 
  Smile, 
  FileText, 
  ImageIcon,
  Send,
  Reply,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

interface MessageInputProps {
  channelName: string | null;
  groupName: string | null;
  onSendMessage: (text: string) => void;
  replyTo: string | null;
  onCancelReply: () => void;
  onToggleGifPicker: () => void;
  showGifPicker: boolean;
}

interface GifData {
  id: string;
  url: string;
  title: string;
}

interface MessageInputGifPickerProps {
  gifs: GifData[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectGif: (url: string) => void;
}

export const GifPicker: React.FC<MessageInputGifPickerProps> = ({
  gifs,
  searchQuery,
  onSearchChange,
  onSelectGif
}) => {
  return (
    <div className="mb-3 border rounded-md p-2 bg-background">
      <div className="mb-2">
        <Input 
          placeholder="Search GIFs..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {gifs.map(gif => (
          <img 
            key={gif.id}
            src={gif.url} 
            alt={gif.title}
            className="rounded cursor-pointer h-24 w-full object-cover"
            onClick={() => onSelectGif(gif.url)}
          />
        ))}
      </div>
    </div>
  );
};

const MessageInput: React.FC<MessageInputProps> = ({
  channelName,
  groupName,
  onSendMessage,
  replyTo,
  onCancelReply,
  onToggleGifPicker,
  showGifPicker
}) => {
  const [messageText, setMessageText] = useState("");
  const [gifSearchQuery, setGifSearchQuery] = useState("");
  
  // Mock GIF data for demo (in a real app this would come from props or an API)
  const mockGifs = [
    { id: "gif1", url: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", title: "Happy" },
    { id: "gif2", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnlya2VpamRjcHUyNDI2c2JzMHRtOTduemRmdWFvYWZ0ZTB6YmtpcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.gif", title: "Thinking" },
    { id: "gif3", url: "https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif", title: "Working" },
    { id: "gif4", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZrYmJ3YTNram43dDZsZXk3MjY3ajg3dW1qZGx6cGxvYWwyb2YwdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwytHcusSCXXp96/giphy.gif", title: "Hello" },
  ];
  
  const filteredGifs = mockGifs.filter(gif => 
    gifSearchQuery === "" || gif.title.toLowerCase().includes(gifSearchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    
    onSendMessage(messageText);
    setMessageText("");
  };
  
  const handleInsertGif = (gifUrl: string) => {
    console.log("Inserting GIF:", gifUrl);
    setMessageText(messageText + " [GIF] ");
    onToggleGifPicker();
    toast.success("GIF selected!");
  };

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
          onClick={onToggleGifPicker}
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
              onClick={onCancelReply}
            >
              <Trash2 size={12} />
            </Button>
          </div>
        )}
      </div>
      
      {showGifPicker && (
        <GifPicker 
          gifs={filteredGifs}
          searchQuery={gifSearchQuery}
          onSearchChange={setGifSearchQuery}
          onSelectGif={handleInsertGif}
        />
      )}
      
      <div className="flex gap-2">
        <Input
          placeholder={`Message ${
            channelName ? `#${channelName}` : 
            groupName ? groupName : 
            "..."
          }`}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button 
          size="icon"
          disabled={messageText.trim() === ""}
          onClick={handleSendMessage}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
