
import React, { useState } from "react";
import { toast } from "sonner";
import ChatSidebar from "./ChatSidebar";
import ConversationHeader from "./ConversationHeader";
import ConversationContent from "./ConversationContent";
import MessageInput from "./MessageInput";
import CreateChannelDialog from "./CreateChannelDialog";
import CreateGroupDialog from "./CreateGroupDialog";

// Mock data (you can move this to separate files if needed)
const mockChannels = [
  {
    id: "channel-1",
    name: "general",
    description: "General discussions",
    createdAt: "2023-04-01T10:00:00Z",
    createdBy: "user-1",
    isPrivate: false,
    members: ["user-1", "user-2", "user-3"],
    lastMessage: {
      id: "msg-1",
      channelId: "channel-1",
      content: "Has anyone seen the new product demo?",
      createdAt: "2023-04-15T14:30:00Z",
      senderId: "user-2"
    },
    unreadCount: 3,
    isPinned: true
  },
  {
    id: "channel-2",
    name: "support",
    description: "Customer support discussions",
    createdAt: "2023-05-15T10:30:00Z",
    createdBy: "user-1",
    isPrivate: false,
    members: ["user-1", "user-2"],
    unreadCount: 3,
    isPinned: true,
  },
  {
    id: "channel-3",
    name: "development",
    description: "Development team channel",
    createdAt: "2023-05-15T11:00:00Z",
    createdBy: "user-2",
    isPrivate: true,
    members: ["user-1", "user-2"],
    unreadCount: 0,
    isPinned: false,
  }
];

const mockGroups = [
  {
    id: "group-1",
    name: "Project Alpha Team",
    members: ["user-1", "user-2", "user-3"],
    createdAt: "2023-04-02T11:00:00Z",
    createdBy: "user-1",
    lastMessage: {
      id: "msg-7",
      groupId: "group-1",
      content: "Let's finalize the design by tomorrow",
      createdAt: "2023-04-15T16:45:00Z",
      senderId: "user-3"
    },
    unreadCount: 2
  },
  {
    id: "group-2",
    name: "Project X",
    members: ["user-1", "user-2", "user-3"],
    createdAt: "2023-05-15T13:00:00Z",
    createdBy: "user-2",
    unreadCount: 0,
    isPinned: false,
  }
];

const mockTeamMembers = [
  {
    id: "user-1",
    name: "John Doe",
    avatar: "/avatar-1.png",
    status: "online"
  },
  {
    id: "user-2",
    name: "Jane Smith",
    status: "away"
  },
  {
    id: "user-3",
    name: "Michael Johnson",
    avatar: "/avatar-3.png",
    status: "offline"
  }
];

const mockMessages = [
  {
    id: "msg-1",
    channelId: "channel-1",
    content: "Has anyone seen the new product demo?",
    createdAt: "2023-04-15T14:30:00Z",
    senderId: "user-2"
  },
  {
    id: "msg-2",
    channelId: "channel-1",
    content: "Thanks for setting this up! I think this will really improve our communication.",
    createdAt: "2023-05-15T14:05:00Z",
    senderId: "user-2",
    reactions: [
      { emoji: "👍", count: 1, users: ["user-1"] }
    ]
  },
  {
    id: "msg-3",
    channelId: "channel-1",
    content: "I've shared some documents for the upcoming meeting. Please take a look when you get a chance.",
    createdAt: "2023-05-15T14:10:00Z",
    senderId: "user-3",
    attachments: [
      {
        id: "attach-1",
        name: "meeting-agenda.pdf",
        url: "/attachments/meeting-agenda.pdf",
        type: "application/pdf",
        size: 2500000,
        createdAt: "2023-05-15T14:10:00Z"
      }
    ]
  },
  {
    id: "msg-4",
    channelId: "channel-1",
    content: "Just a reminder that we have a team meeting tomorrow at 10 AM.",
    createdAt: "2023-05-15T16:00:00Z",
    senderId: "user-1",
    mentions: ["user-2", "user-3"]
  },
  // Add support for group messages
  {
    id: "msg-5",
    groupId: "group-1",
    content: "Let's discuss the project timeline.",
    createdAt: "2023-05-16T09:00:00Z",
    senderId: "user-1"
  },
  {
    id: "msg-6",
    groupId: "group-1",
    content: "I think we should schedule a call to go over the details.",
    createdAt: "2023-05-16T09:05:00Z",
    senderId: "user-2"
  }
];

const mockPinnedMessages = [
  {
    id: "pin-1",
    channelId: "channel-1",
    content: "Important: Team meeting tomorrow at 10 AM",
    createdAt: "2023-05-15T12:00:00Z",
    senderId: "user-1"
  },
  {
    id: "pin-2",
    channelId: "channel-1",
    content: "Product release scheduled for next Friday",
    createdAt: "2023-05-16T09:30:00Z",
    senderId: "user-2"
  }
];

export const TeamChat: React.FC = () => {
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>("channel-1");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [channels, setChannels] = useState(mockChannels);
  const [groups, setGroups] = useState(mockGroups);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [newChannelDialogOpen, setNewChannelDialogOpen] = useState(false);
  const [newGroupDialogOpen, setNewGroupDialogOpen] = useState(false);
  const [channelDescription, setChannelDescription] = useState<Record<string, string>>({
    "channel-1": "General discussions for the team",
    "channel-2": "Customer support related discussions",
    "channel-3": "Development team discussions and updates"
  });
  const [pinnedMessages, setPinnedMessages] = useState(mockPinnedMessages);
  
  const selectedChannel = selectedChannelId 
    ? channels.find(c => c.id === selectedChannelId) 
    : null;
    
  const selectedGroup = selectedGroupId 
    ? groups.find(g => g.id === selectedGroupId) 
    : null;
  
  const currentMessages = selectedChannelId 
    ? mockMessages.filter(m => 'channelId' in m && m.channelId === selectedChannelId)
    : selectedGroupId 
      ? mockMessages.filter(m => 'groupId' in m && m.groupId === selectedGroupId)
      : [];

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    setSelectedGroupId(null);
  };
  
  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setSelectedChannelId(null);
  };
  
  const handleSendMessage = (messageText: string) => {
    console.log("Sending message:", messageText);
    toast.success("Message sent!");
    setReplyTo(null);
  };
  
  const handleCreateChannel = (channelData: { name: string; description: string; isPrivate: boolean }) => {
    if (channelData.name.trim() === "") {
      toast.error("Please enter a channel name");
      return;
    }
    
    const newChannel = {
      id: `channel-${Date.now()}`,
      name: channelData.name.trim().toLowerCase().replace(/\s+/g, '-'),
      description: channelData.description,
      createdAt: new Date().toISOString(),
      createdBy: "user-1",
      isPrivate: channelData.isPrivate,
      members: ["user-1"],
      unreadCount: 0,
      isPinned: false
    };
    
    setChannels([...channels, newChannel]);
    setChannelDescription({
      ...channelDescription,
      [newChannel.id]: channelData.description
    });
    setNewChannelDialogOpen(false);
    
    setSelectedChannelId(newChannel.id);
    setSelectedGroupId(null);
    
    toast.success(`Channel #${newChannel.name} created!`);
  };
  
  const handleCreateGroup = (groupData: { name: string; members: string[] }) => {
    if (groupData.name.trim() === "") {
      toast.error("Please enter a group name");
      return;
    }
    
    if (groupData.members.length === 0) {
      toast.error("Please select at least one member");
      return;
    }
    
    const newGroup = {
      id: `group-${Date.now()}`,
      name: groupData.name.trim(),
      members: [...groupData.members, "user-1"],
      createdAt: new Date().toISOString(),
      createdBy: "user-1",
      unreadCount: 0,
      isPinned: false
    };
    
    setGroups([...groups, newGroup]);
    setNewGroupDialogOpen(false);
    
    setSelectedGroupId(newGroup.id);
    setSelectedChannelId(null);
    
    toast.success(`Group ${newGroup.name} created!`);
  };

  const handleUpdateDescription = (newDescription: string) => {
    if (selectedChannelId) {
      setChannelDescription({
        ...channelDescription,
        [selectedChannelId]: newDescription
      });
      toast.success("Channel description updated");
    }
  };

  const handlePinMessage = (messageId: string) => {
    const message = mockMessages.find(m => m.id === messageId);
    if (message && !pinnedMessages.some(pm => pm.id === `pin-${messageId}`)) {
      const newPinnedMessage = {
        id: `pin-${messageId}`,
        channelId: message.channelId || "",
        content: message.content,
        createdAt: new Date().toISOString(),
        senderId: message.senderId
      };
      
      setPinnedMessages([...pinnedMessages, newPinnedMessage]);
      toast.success("Message pinned to channel");
    }
  };

  const handleUnpinMessage = (pinnedId: string) => {
    setPinnedMessages(pinnedMessages.filter(pm => pm.id !== pinnedId));
    toast.success("Message unpinned from channel");
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-md border">
      <ChatSidebar
        channels={channels}
        groups={groups}
        teamMembers={mockTeamMembers}
        selectedChannelId={selectedChannelId}
        selectedGroupId={selectedGroupId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectChannel={handleSelectChannel}
        onSelectGroup={handleSelectGroup}
        onNewChannelClick={() => setNewChannelDialogOpen(true)}
        onNewGroupClick={() => setNewGroupDialogOpen(true)}
      />
      
      <div className="flex-1 flex flex-col bg-background">
        <ConversationHeader 
          selectedChannel={selectedChannel}
          selectedGroup={selectedGroup}
        />
        
        <ConversationContent
          messages={currentMessages}
          teamMembers={mockTeamMembers}
          selectedChannelId={selectedChannelId}
          selectedGroupId={selectedGroupId}
          selectedChannel={selectedChannel}
          replyTo={replyTo}
          channelDescription={channelDescription}
          pinnedMessages={pinnedMessages}
          onReply={setReplyTo}
          onPinMessage={handlePinMessage}
          onUpdateDescription={handleUpdateDescription}
          onUnpinMessage={handleUnpinMessage}
        />
        
        <MessageInput
          channelName={selectedChannel?.name || null}
          groupName={selectedGroup?.name || null}
          onSendMessage={handleSendMessage}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(null)}
          onToggleGifPicker={() => setShowGifPicker(!showGifPicker)}
          showGifPicker={showGifPicker}
        />
      </div>
      
      <CreateChannelDialog
        open={newChannelDialogOpen}
        onClose={() => setNewChannelDialogOpen(false)}
        onCreateChannel={handleCreateChannel}
      />
      
      <CreateGroupDialog
        open={newGroupDialogOpen}
        onClose={() => setNewGroupDialogOpen(false)}
        onCreateGroup={handleCreateGroup}
        teamMembers={mockTeamMembers}
      />
    </div>
  );
};

export default TeamChat;
