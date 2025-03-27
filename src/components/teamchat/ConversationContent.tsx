
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import MessageItem, { TeamMessage } from "./MessageItem";
import ChannelInfo from "./ChannelInfo";

interface TeamMember {
  id: string;
  name: string;
  status: string;
  avatar?: string;
}

interface PinnedMessage {
  id: string;
  channelId: string;
  content: string;
  createdAt: string;
  senderId: string;
}

interface ConversationContentProps {
  messages: TeamMessage[];
  teamMembers: TeamMember[];
  selectedChannelId: string | null;
  selectedGroupId: string | null;
  selectedChannel: any;
  replyTo: string | null;
  channelDescription: Record<string, string>;
  pinnedMessages: PinnedMessage[];
  onReply: (messageId: string) => void;
  onPinMessage: (messageId: string) => void;
  onUpdateDescription: (newDescription: string) => void;
  onUnpinMessage: (pinnedId: string) => void;
}

const ConversationContent: React.FC<ConversationContentProps> = ({
  messages,
  teamMembers,
  selectedChannelId,
  selectedGroupId,
  selectedChannel,
  replyTo,
  channelDescription,
  pinnedMessages,
  onReply,
  onPinMessage,
  onUpdateDescription,
  onUnpinMessage
}) => {
  const getSender = (senderId: string): TeamMember => {
    return teamMembers.find(m => m.id === senderId) || { 
      id: senderId, 
      name: "Unknown User", 
      status: "offline" 
    };
  };

  const currentDescription = selectedChannelId ? (channelDescription[selectedChannelId] || "") : "";
  const currentPinnedMessages = selectedChannelId
    ? pinnedMessages.filter(m => m.channelId === selectedChannelId)
    : [];

  return (
    <div className="flex-1 flex flex-col">
      {selectedChannelId && (
        <ChannelInfo
          channelId={selectedChannelId}
          channelName={selectedChannel?.name}
          description={currentDescription}
          pinnedMessages={currentPinnedMessages}
          teamMembers={teamMembers}
          onUpdateDescription={onUpdateDescription}
          onUnpinMessage={onUnpinMessage}
        />
      )}
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => {
              const sender = getSender(message.senderId);
              const isReplyHighlighted = replyTo === message.id;
              
              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  sender={sender}
                  isReplyHighlighted={isReplyHighlighted}
                  onReply={onReply}
                  onPinMessage={onPinMessage}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No messages yet</h3>
              <p className="text-muted-foreground text-sm">
                {selectedChannelId 
                  ? `Start the conversation in #${selectedChannel?.name}`
                  : selectedGroupId
                    ? `Start the conversation in group chat`
                    : "Select a channel or direct message to start chatting"
                }
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationContent;
