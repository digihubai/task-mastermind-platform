
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { TeamChat } from '@/components/teamchat/TeamChat';
import CreateChannelModal from '@/components/teamchat/CreateChannelModal';
import ChannelInfoPanel from '@/components/teamchat/ChannelInfoPanel';
import { TeamChannel } from '@/types/support';

const TeamChatPage = () => {
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showChannelInfo, setShowChannelInfo] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<TeamChannel>({
    id: 'general',
    name: 'general',
    icon: '📢',
    unreadCount: 0,
    isActive: true,
    topic: 'Company-wide announcements and work-related matters',
    description: 'This channel is for company-wide communication',
    purpose: 'Company announcements',
    isPrivate: false,
    createdAt: new Date().toISOString(),
    createdBy: 'system',
    members: ['user1', 'user2']
  });

  const [channels, setChannels] = useState<TeamChannel[]>([
    {
      id: 'general',
      name: 'general',
      icon: '📢',
      topic: 'Company-wide announcements and work-related matters',
      description: 'This channel is for company-wide communication',
      purpose: 'Company announcements',
      isActive: true,
      unreadCount: 0,
      createdAt: new Date().toISOString(),
      createdBy: 'system',
      members: ['user1', 'user2']
    },
    {
      id: 'random',
      name: 'random',
      icon: '🎭',
      topic: 'Non-work banter and water cooler conversation',
      description: 'A place for non-work-related flimflam, faffing, and general nonsense',
      purpose: 'Fun stuff',
      isActive: false,
      unreadCount: 3,
      createdAt: new Date().toISOString(),
      createdBy: 'user1',
      members: ['user1', 'user2'],
      isPrivate: false
    },
    {
      id: 'marketing',
      name: 'marketing',
      icon: '📣',
      topic: 'Marketing team discussions',
      description: 'Marketing campaigns, strategies, and results',
      purpose: 'Marketing team coordination',
      isActive: false,
      unreadCount: 12,
      createdAt: new Date().toISOString(),
      createdBy: 'user2',
      members: ['user1', 'user2'],
      isPrivate: true
    }
  ]);

  const handleCreateChannel = (newChannel: Omit<TeamChannel, 'id' | 'createdAt' | 'createdBy' | 'unreadCount'>) => {
    const channel: TeamChannel = {
      id: `channel-${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdBy: 'current-user',
      unreadCount: 0,
      ...newChannel,
      icon: '📢',
    };
    
    setChannels([...channels, channel]);
    setShowCreateChannel(false);
  };

  const handleSelectChannel = (channelId: string) => {
    const selected = channels.find(c => c.id === channelId);
    if (selected) {
      setCurrentChannel(selected);
      
      // Mark as read
      setChannels(channels.map(c => 
        c.id === channelId ? { ...c, unreadCount: 0, isActive: true } : { ...c, isActive: false }
      ));
    }
  };

  const handleUpdateChannel = (updatedInfo: { description?: string, purpose?: string, topic?: string }) => {
    setCurrentChannel({
      ...currentChannel,
      ...updatedInfo
    });
    
    setChannels(channels.map(c => 
      c.id === currentChannel.id ? { ...c, ...updatedInfo } : c
    ));
  };

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        <TeamChat />
      </div>
    </AppLayout>
  );
};

export default TeamChatPage;
