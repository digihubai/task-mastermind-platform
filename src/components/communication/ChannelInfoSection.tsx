
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Edit,
  Pin,
  MessageSquare,
  Save,
  X,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Collapsible } from "@radix-ui/react-collapsible";

interface PinnedMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
}

interface ChannelInfoProps {
  channelId?: string;
  channelName: string;
  initialDescription?: string;
  pinnedMessages?: PinnedMessage[];
}

const ChannelInfoSection: React.FC<ChannelInfoProps> = ({
  channelId,
  channelName,
  initialDescription = "",
  pinnedMessages = []
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showPinnedMessages, setShowPinnedMessages] = useState(true);
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);

  const handleSaveDescription = () => {
    // Here you would typically save the description to your backend
    console.log("Saving description:", description);
    setIsEditingDescription(false);
    toast.success("Channel description updated");
  };

  const handleCancelEdit = () => {
    setDescription(initialDescription);
    setIsEditingDescription(false);
  };

  const handleUnpinMessage = (messageId: string) => {
    // Here you would typically update this in your backend
    console.log("Unpinning message:", messageId);
    toast.success("Message unpinned");
  };

  return (
    <Card className="mb-4 shadow-sm border overflow-hidden">
      <Collapsible open={isInfoExpanded} onOpenChange={setIsInfoExpanded}>
        <div className="flex justify-between items-center p-3 border-b bg-muted/30 cursor-pointer" onClick={() => setIsInfoExpanded(!isInfoExpanded)}>
          <div className="flex items-center gap-2">
            <Info size={16} />
            <h3 className="text-sm font-medium">Channel Information</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {isInfoExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="p-3 border-b">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Purpose & Description</h4>
              {!isEditingDescription ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setIsEditingDescription(true)}
                >
                  <Edit size={14} />
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={handleCancelEdit}
                  >
                    <X size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={handleSaveDescription}
                  >
                    <Save size={14} />
                  </Button>
                </div>
              )}
            </div>

            {isEditingDescription ? (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description for this channel..."
                className="w-full resize-none"
                rows={3}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {description || "No description has been added yet."}
              </p>
            )}
          </div>

          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium flex items-center">
                <Pin size={14} className="mr-1.5" /> 
                Pinned Messages
              </h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setShowPinnedMessages(!showPinnedMessages)}
              >
                {showPinnedMessages ? "Hide" : "Show"}
              </Button>
            </div>

            {showPinnedMessages && (
              <div className="space-y-3 mt-2">
                {pinnedMessages.length > 0 ? (
                  pinnedMessages.map((message) => (
                    <div key={message.id} className="bg-muted/30 rounded-md p-2.5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            {message.sender.avatar && <AvatarImage src={message.sender.avatar} />}
                            <AvatarFallback>{message.sender.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium">{message.sender.name}</span>
                              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => handleUnpinMessage(message.id)}
                        >
                          <Pin size={12} className="text-primary" />
                        </Button>
                      </div>
                      <p className="text-sm mt-1.5 ml-8">{message.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3 text-sm text-muted-foreground">
                    <MessageSquare className="h-5 w-5 mx-auto mb-1 opacity-50" />
                    <p>No pinned messages yet</p>
                    <p className="text-xs mt-1">Pin important messages to keep them easily accessible</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ChannelInfoSection;
