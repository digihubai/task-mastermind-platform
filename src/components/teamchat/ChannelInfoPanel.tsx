
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Info, 
  FileText, 
  Link, 
  Settings, 
  X,
  Edit,
  Save
} from "lucide-react";
import { toast } from "sonner";

interface ChannelInfoPanelProps {
  channel: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdateChannel?: (updatedInfo: any) => void;
}

const ChannelInfoPanel: React.FC<ChannelInfoPanelProps> = ({ 
  channel, 
  isOpen, 
  onClose,
  onUpdateChannel
}) => {
  const [currentTab, setCurrentTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [channelInfo, setChannelInfo] = useState({
    description: channel?.description || "",
    purpose: channel?.purpose || "",
    topic: channel?.topic || ""
  });

  const handleSaveInfo = () => {
    if (onUpdateChannel) {
      onUpdateChannel(channelInfo);
    }
    setIsEditing(false);
    toast.success("Channel information updated");
  };

  if (!isOpen) return null;

  return (
    <div className="border-l h-full w-80 bg-background animate-slide-in-right flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium">Channel Information</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <Tabs defaultValue="about" className="flex-1 flex flex-col" onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-4 px-2 pt-2">
          <TabsTrigger value="about">
            <Info size={16} className="mr-1" />
            <span className="sr-only sm:not-sr-only">About</span>
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users size={16} className="mr-1" />
            <span className="sr-only sm:not-sr-only">Members</span>
          </TabsTrigger>
          <TabsTrigger value="files">
            <FileText size={16} className="mr-1" />
            <span className="sr-only sm:not-sr-only">Files</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings size={16} className="mr-1" />
            <span className="sr-only sm:not-sr-only">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="flex-1 px-4 py-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium">About this channel</h4>
            {!isEditing ? (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Edit size={14} className="mr-1" />
                Edit
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleSaveInfo}>
                <Save size={14} className="mr-1" />
                Save
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea 
                  value={channelInfo.description} 
                  onChange={(e) => setChannelInfo({...channelInfo, description: e.target.value})}
                  placeholder="Add a description for this channel"
                  className="resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Purpose</label>
                <Input 
                  value={channelInfo.purpose} 
                  onChange={(e) => setChannelInfo({...channelInfo, purpose: e.target.value})}
                  placeholder="Add a purpose for this channel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Topic</label>
                <Input 
                  value={channelInfo.topic} 
                  onChange={(e) => setChannelInfo({...channelInfo, topic: e.target.value})}
                  placeholder="Add a topic for discussion"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-medium text-muted-foreground">Description</h5>
                <p className="text-sm mt-1">
                  {channelInfo.description || "No description has been added yet."}
                </p>
              </div>
              
              <div>
                <h5 className="text-xs font-medium text-muted-foreground">Purpose</h5>
                <p className="text-sm mt-1">
                  {channelInfo.purpose || "No purpose has been added yet."}
                </p>
              </div>
              
              <div>
                <h5 className="text-xs font-medium text-muted-foreground">Topic</h5>
                <p className="text-sm mt-1">
                  {channelInfo.topic || "No topic has been added yet."}
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="members" className="flex-1 px-4 py-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium">Channel members</h4>
            <Button variant="outline" size="sm">
              Add members
            </Button>
          </div>
          
          <ScrollArea className="h-[350px]">
            <div className="space-y-2">
              {/* Mock data for members */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-secondary rounded-md">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <span>U{i+1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">User {i+1}</p>
                      <p className="text-xs text-muted-foreground">user{i+1}@example.com</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="files" className="flex-1 px-4 py-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium">Shared files</h4>
            <Button variant="outline" size="sm">Upload</Button>
          </div>
          
          <div className="flex flex-col items-center justify-center h-[300px] border-2 border-dashed rounded-md">
            <FileText size={48} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No files have been shared yet</p>
            <Button variant="outline" size="sm" className="mt-4">Browse files</Button>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 px-4 py-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Channel settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 hover:bg-secondary rounded-md">
                  <span className="text-sm">Notifications</span>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-secondary rounded-md">
                  <span className="text-sm">Permissions</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-secondary rounded-md">
                  <span className="text-sm">Integrations</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="destructive" size="sm" className="w-full">
                Leave channel
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChannelInfoPanel;
