import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamChannel, TeamGroup, TeamMessage } from "@/types/support";
import { 
  Search, 
  Plus, 
  Hash, 
  Info,
  Users, 
  MoreVertical, 
  Phone,
  Video,
  Reply,
  Send,
  Pin,
  Palette
} from "lucide-react";
import { toast } from "sonner";
import EnhancedGiphyPicker from "./EnhancedGiphyPicker";
import PinnedMessages from "./PinnedMessages";
import ChannelInfoPanel from "./ChannelInfoPanel";
import ChannelCanvas from "./ChannelCanvas";
import ChannelHeader from "./ChannelHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChannelSidebar from "./ChannelSidebar";
import DirectMessagesSidebar from "./DirectMessagesSidebar";
import { mockChannels, mockGroups, mockTeamMembers, mockMessages, mockGifs } from "./mockData";

export type TeamMember = {
  id: string;
  name: string;
  status: string;
  avatar?: string;
};

export const TeamChat: React.FC = () => {
  const [activeTab, setActiveTab] = useState("channels");
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>("channel-1");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [channels, setChannels] = useState<TeamChannel[]>(mockChannels);
  const [groups, setGroups] = useState<TeamGroup[]>(mockGroups);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearchQuery, setGifSearchQuery] = useState("");
  
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [newChannelIsPrivate, setNewChannelIsPrivate] = useState(false);
  const [newChannelDialogOpen, setNewChannelDialogOpen] = useState(false);
  
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDialogOpen, setNewGroupDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  const [showPinnedMessages, setShowPinnedMessages] = useState(false);
  const [showChannelInfo, setShowChannelInfo] = useState(false);
  const [showChannelCanvas, setShowChannelCanvas] = useState(false);
  
  const [pinnedMessages, setPinnedMessages] = useState<TeamMessage[]>(
    mockMessages.filter(msg => msg.isPinned)
  );
  
  const filteredGifs = mockGifs.filter(gif => 
    gifSearchQuery === "" || gif.title.toLowerCase().includes(gifSearchQuery.toLowerCase())
  );
  
  const selectedChannel = selectedChannelId 
    ? channels.find(c => c.id === selectedChannelId) 
    : null;
    
  const selectedGroup = selectedGroupId 
    ? groups.find(g => g.id === selectedGroupId) 
    : null;
  
  const currentMessages = selectedChannelId 
    ? mockMessages.filter(m => m.channelId === selectedChannelId)
    : selectedGroupId 
      ? mockMessages.filter(m => m.groupId === selectedGroupId)
      : [];
  
  const getSender = (senderId: string): TeamMember => {
    return mockTeamMembers.find(m => m.id === senderId) || { 
      id: senderId, 
      name: "Unknown User", 
      status: "offline" 
    };
  };
  
  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    setSelectedGroupId(null);
    setActiveTab("channels");
  };
  
  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setSelectedChannelId(null);
    setActiveTab("direct-messages");
  };
  
  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    
    console.log("Sending message:", messageText);
    
    toast.success("Message sent!");
    
    setMessageText("");
    setReplyTo(null);
    setShowGifPicker(false);
  };
  
  const handleCreateChannel = () => {
    if (newChannelName.trim() === "") {
      toast.error("Please enter a channel name");
      return;
    }
    
    const newChannel: TeamChannel = {
      id: `channel-${Date.now()}`,
      name: newChannelName.trim().toLowerCase().replace(/\s+/g, '-'),
      description: newChannelDescription,
      createdAt: new Date().toISOString(),
      createdBy: "user-1",
      isPrivate: newChannelIsPrivate,
      members: ["user-1"],
      unreadCount: 0,
      isPinned: false,
      messageCount: 0
    };
    
    setChannels([...channels, newChannel]);
    setNewChannelName("");
    setNewChannelDescription("");
    setNewChannelIsPrivate(false);
    setNewChannelDialogOpen(false);
    
    setSelectedChannelId(newChannel.id);
    setSelectedGroupId(null);
    setActiveTab("channels");
    
    toast.success(`Channel #${newChannel.name} created!`);
  };
  
  const handleCreateGroup = () => {
    if (newGroupName.trim() === "") {
      toast.error("Please enter a group name");
      return;
    }
    
    if (selectedMembers.length === 0) {
      toast.error("Please select at least one member");
      return;
    }
    
    const newGroup: TeamGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName.trim(),
      members: [...selectedMembers, "user-1"],
      createdAt: new Date().toISOString(),
      createdBy: "user-1",
      unreadCount: 0,
      isPinned: false,
      channels: []
    };
    
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setSelectedMembers([]);
    setNewGroupDialogOpen(false);
    
    setSelectedGroupId(newGroup.id);
    setSelectedChannelId(null);
    setActiveTab("direct-messages");
    
    toast.success(`Group ${newGroup.name} created!`);
  };
  
  const handleToggleMemberSelection = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };
  
  const handleInsertGif = (gifUrl: string) => {
    console.log("Inserting GIF:", gifUrl);
    setMessageText(messageText + " [GIF] ");
    setShowGifPicker(false);
    toast.success("GIF selected!");
  };
  
  const handlePinMessage = (messageId: string) => {
    const messageToPin = mockMessages.find(msg => msg.id === messageId);
    if (messageToPin && !messageToPin.isPinned) {
      messageToPin.isPinned = true;
      setPinnedMessages([...pinnedMessages, messageToPin]);
      toast.success("Message pinned to channel!");
    }
  };
  
  const handleUnpinMessage = (messageId: string) => {
    const updatedPinned = pinnedMessages.filter(msg => msg.id !== messageId);
    setPinnedMessages(updatedPinned);
    
    const messageToUnpin = mockMessages.find(msg => msg.id === messageId);
    if (messageToUnpin) {
      messageToUnpin.isPinned = false;
    }
  };
  
  const handleUpdateChannelInfo = (updatedInfo: any) => {
    if (selectedChannelId) {
      const updatedChannels = channels.map(channel => {
        if (channel.id === selectedChannelId) {
          return {
            ...channel,
            description: updatedInfo.description,
            purpose: updatedInfo.purpose,
            topic: updatedInfo.topic
          };
        }
        return channel;
      });
      
      setChannels(updatedChannels);
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-md border">
      <div className="w-60 border-r flex flex-col bg-background">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {activeTab === "channels" ? (
          <ChannelSidebar 
            channels={channels}
            searchQuery={searchQuery}
            selectedChannelId={selectedChannelId}
            onSelectChannel={handleSelectChannel}
            onCreateChannel={() => setNewChannelDialogOpen(true)}
          />
        ) : (
          <DirectMessagesSidebar 
            groups={groups}
            teamMembers={mockTeamMembers}
            searchQuery={searchQuery}
            selectedGroupId={selectedGroupId}
            onSelectGroup={handleSelectGroup}
            onCreateGroup={() => setNewGroupDialogOpen(true)}
            selectedMembers={selectedMembers}
            onToggleMemberSelection={handleToggleMemberSelection}
            onCreateGroupSubmit={handleCreateGroup}
            newGroupName={newGroupName}
            setNewGroupName={setNewGroupName}
            newGroupDialogOpen={newGroupDialogOpen}
            setNewGroupDialogOpen={setNewGroupDialogOpen}
          />
        )}
      </div>
      
      <div className="flex-1 flex flex-col bg-background">
        <ChannelHeader 
          selectedChannel={selectedChannel}
          selectedGroup={selectedGroup}
          onInfoClick={() => setShowChannelInfo(!showChannelInfo)}
          onPinnedClick={() => setShowPinnedMessages(!showPinnedMessages)}
          onCanvasClick={() => setShowChannelCanvas(true)}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <MessageList 
            messages={currentMessages}
            getSender={getSender}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            onPinMessage={handlePinMessage}
            onUnpinMessage={handleUnpinMessage}
          />
          
          {showPinnedMessages && (
            <PinnedMessages 
              isOpen={showPinnedMessages} 
              onClose={() => setShowPinnedMessages(false)} 
              messages={pinnedMessages}
              onUnpinMessage={handleUnpinMessage}
            />
          )}
          
          {showChannelInfo && selectedChannel && (
            <ChannelInfoPanel 
              isOpen={showChannelInfo} 
              onClose={() => setShowChannelInfo(false)} 
              channel={selectedChannel}
              onUpdateChannel={handleUpdateChannelInfo}
            />
          )}
          
          {showChannelCanvas && (
            <ChannelCanvas 
              isOpen={showChannelCanvas} 
              onClose={() => setShowChannelCanvas(false)} 
            />
          )}
        </div>
        
        <MessageInput 
          messageText={messageText}
          setMessageText={setMessageText}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          showGifPicker={showGifPicker}
          setShowGifPicker={setShowGifPicker}
          onSendMessage={handleSendMessage}
          onInsertGif={handleInsertGif}
          selectedChannel={selectedChannel}
          selectedGroup={selectedGroup}
        />
        
        {showGifPicker && (
          <div className="mb-3 absolute bottom-20 left-4 z-10">
            <EnhancedGiphyPicker
              onSelect={handleInsertGif}
              onClose={() => setShowGifPicker(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
