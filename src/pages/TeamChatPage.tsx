
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { TeamChat } from '@/components/teamchat/TeamChat';
import { CreateChannelModal } from '@/components/teamchat/CreateChannelModal';
import { ChannelInfoPanel } from '@/components/teamchat/ChannelInfoPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MessageSquare, Users, Hash, Bell, Plus, Settings, MoreVertical, Sliders } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeamChatPage = () => {
  const { toast } = useToast();
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('channels');
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  
  // Sample channel data
  const [currentChannel, setCurrentChannel] = useState<{
    id: string;
    name: string;
    icon: string;
    unreadCount: number;
    isActive: boolean;
    topic: string;
    description?: string;
    purpose?: string;
    isPrivate?: boolean;
  }>({
    id: 'general',
    name: 'general',
    icon: '#',
    unreadCount: 0,
    isActive: true,
    topic: 'Company-wide announcements and work-based matters',
    description: 'This channel is for company-wide communication and announcements',
    purpose: 'Share important updates with the entire company'
  });

  const [channels, setChannels] = useState([
    {
      id: 'general',
      name: 'general',
      topic: 'Company-wide announcements and work-based matters',
      description: 'This channel is for company-wide communication and announcements',
      purpose: 'Share important updates with the entire company',
      isActive: true,
      unreadCount: 0,
    },
    {
      id: 'random',
      name: 'random',
      topic: 'Non-work banter and water cooler conversation',
      description: 'A place for random discussions not related to work',
      purpose: 'Have fun and get to know your colleagues',
      isActive: false,
      unreadCount: 3,
    },
    {
      id: 'marketing',
      name: 'marketing',
      topic: 'Marketing team discussions',
      description: 'Coordination channel for the marketing team',
      purpose: 'Plan and execute marketing campaigns',
      isActive: false,
      unreadCount: 12,
      isPrivate: true,
    },
    {
      id: 'sales',
      name: 'sales',
      topic: 'Sales team discussions',
      description: 'Discussions about sales strategies and targets',
      purpose: 'Track and improve sales performance',
      isActive: false,
      unreadCount: 0,
      isPrivate: true,
    },
    {
      id: 'support',
      name: 'support',
      topic: 'Customer support discussions',
      description: 'Channel for customer support team',
      purpose: 'Coordinate customer support activities',
      isActive: false,
      unreadCount: 5,
    },
  ]);

  const handleCreateChannel = (channelData: any) => {
    const newChannel = {
      id: channelData.name.toLowerCase().replace(/\s+/g, '-'),
      name: channelData.name,
      topic: channelData.topic || '',
      description: channelData.description || '',
      purpose: channelData.purpose || '',
      isActive: false,
      unreadCount: 0,
      isPrivate: channelData.isPrivate || false,
    };
    
    setChannels((prev) => [...prev, newChannel]);
    setIsCreateChannelOpen(false);
    
    toast({
      title: "Channel created",
      description: `#${newChannel.name} has been created successfully.`,
    });
  };

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    setCurrentChannel(channels.find(c => c.id === channelId) || channels[0]);
    
    setChannels(prev => 
      prev.map(channel => ({
        ...channel,
        isActive: channel.id === channelId
      }))
    );
  };

  const handleToggleInfoPanel = () => {
    setIsInfoPanelOpen(!isInfoPanelOpen);
  };

  const handleUpdateChannel = (updatedInfo: any) => {
    setCurrentChannel({
      ...currentChannel,
      ...updatedInfo
    });
    
    setChannels(prev => 
      prev.map(channel => 
        channel.id === currentChannel.id
          ? { ...channel, ...updatedInfo }
          : channel
      )
    );
    
    toast({
      title: "Channel updated",
      description: `#${currentChannel.name} has been updated successfully.`,
    });
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <div className="w-64 border-r bg-background flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Team Chat</h2>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 px-2 mt-2">
              <TabsTrigger value="channels" className="flex items-center gap-2">
                <Hash size={16} />
                <span>Channels</span>
              </TabsTrigger>
              <TabsTrigger value="direct" className="flex items-center gap-2">
                <Users size={16} />
                <span>Direct</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="channels" className="flex-1 overflow-hidden flex flex-col p-0 m-0">
              <div className="p-2 flex items-center justify-between">
                <h3 className="text-sm font-medium">Channels</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsCreateChannelOpen(true)}>
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-1">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer mb-1 ${
                      channel.isActive ? 'bg-accent' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => handleSelectChannel(channel.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <Hash size={16} className="text-muted-foreground" />
                      <span className="truncate">{channel.name}</span>
                      {channel.isPrivate && (
                        <span className="text-xs bg-secondary px-1 rounded">Private</span>
                      )}
                    </div>
                    {channel.unreadCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {channel.unreadCount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="direct" className="flex-1 overflow-hidden flex flex-col p-0 m-0">
              <div className="p-2 flex items-center justify-between">
                <h3 className="text-sm font-medium">Direct Messages</h3>
                <Button variant="ghost" size="icon">
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-1">
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <p>No direct messages yet</p>
                  <Button variant="link" className="mt-2">
                    Start a conversation
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="p-2 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Settings size={16} className="mr-2" />
                  <span>Preferences</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Bell size={16} className="mr-2" />
                  <span>Notification settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sliders size={16} className="mr-2" />
                  <span>Appearance</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {currentChannel ? (
            <>
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center">
                  <Hash size={18} className="mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{currentChannel.name}</h3>
                    <p className="text-xs text-muted-foreground truncate max-w-md">
                      {currentChannel.topic || 'No topic set'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={handleToggleInfoPanel}>
                    <Info size={18} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Channel settings</DropdownMenuItem>
                      <DropdownMenuItem>Mute channel</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Leave channel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden flex">
                <div className="flex-1 overflow-hidden">
                  <TeamChat />
                </div>
                
                {isInfoPanelOpen && (
                  <ChannelInfoPanel
                    channel={currentChannel}
                    isOpen={isInfoPanelOpen}
                    onClose={handleToggleInfoPanel}
                    onUpdateChannel={handleUpdateChannel}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Select a channel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Choose a channel from the sidebar or create a new one to start chatting.
                  </p>
                  <Button onClick={() => setIsCreateChannelOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    Create a new channel
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <CreateChannelModal
        isOpen={isCreateChannelOpen}
        onClose={() => setIsCreateChannelOpen(false)}
        onCreateChannel={handleCreateChannel}
      />
    </AppLayout>
  );
};

export default TeamChatPage;
