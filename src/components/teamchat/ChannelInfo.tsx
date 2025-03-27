
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pin, Edit, Save, X, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";

interface PinnedMessage {
  id: string;
  channelId: string;
  content: string;
  createdAt: string;
  senderId: string;
}

interface TeamMember {
  id: string;
  name: string;
  status: string;
  avatar?: string;
}

interface ChannelInfoProps {
  channelId: string | null;
  channelName: string | null;
  description: string;
  pinnedMessages: PinnedMessage[];
  teamMembers: TeamMember[];
  onUpdateDescription: (newDescription: string) => void;
  onUnpinMessage: (pinnedId: string) => void;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channelId,
  channelName,
  description,
  pinnedMessages,
  teamMembers,
  onUpdateDescription,
  onUnpinMessage
}) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [showChannelInfo, setShowChannelInfo] = useState(true);
  const [showPinnedMessages, setShowPinnedMessages] = useState(true);

  const handleSaveDescription = () => {
    onUpdateDescription(editedDescription);
    setIsEditingDescription(false);
    toast.success("Channel description updated");
  };

  const handleCancelEditDescription = () => {
    setEditedDescription(description);
    setIsEditingDescription(false);
  };

  const getSender = (senderId: string): TeamMember => {
    return teamMembers.find(m => m.id === senderId) || { 
      id: senderId, 
      name: "Unknown User", 
      status: "offline" 
    };
  };

  if (!channelId || !channelName) return null;

  return (
    <Card className="mb-4 shadow-sm border overflow-hidden">
      <Collapsible open={showChannelInfo} onOpenChange={setShowChannelInfo}>
        <div className="flex justify-between items-center p-3 border-b bg-muted/30 cursor-pointer">
          <div className="flex items-center gap-2">
            <Info size={16} />
            <h3 className="text-sm font-medium">Channel Information</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {showChannelInfo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
                    onClick={handleCancelEditDescription}
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
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
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
                  pinnedMessages.map((message) => {
                    const sender = getSender(message.senderId);
                    return (
                      <div key={message.id} className="bg-muted/30 rounded-md p-2.5">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{sender.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-medium">{sender.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(message.createdAt).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => onUnpinMessage(message.id)}
                          >
                            <Pin size={12} className="text-primary" />
                          </Button>
                        </div>
                        <p className="text-sm mt-1.5 ml-8">{message.content}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-3 text-sm text-muted-foreground">
                    <Pin className="h-5 w-5 mx-auto mb-1 opacity-50" />
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

// Adding missing import
import { Card } from "@/components/ui/card";

export default ChannelInfo;
