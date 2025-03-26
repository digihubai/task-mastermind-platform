
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Hash, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateChannelModalProps {
  open: boolean;
  onClose: () => void;
  onCreateChannel: (channelData: {
    name: string;
    description: string;
    isPrivate: boolean;
    members: string[];
    icon?: string;
  }) => void;
}

const teamMembers = [
  { id: "user1", name: "Sarah Johnson", avatar: "/avatars/woman-1.jpg" },
  { id: "user2", name: "Michael Chen", avatar: "/avatars/man-1.jpg" },
  { id: "user3", name: "Jessica Williams", avatar: "/avatars/woman-2.jpg" },
  { id: "user4", name: "David Kim", avatar: "/avatars/man-2.jpg" },
  { id: "user5", name: "Emily Davis", avatar: "/avatars/woman-3.jpg" },
  { id: "user6", name: "Alex Morgan", avatar: "/avatars/man-3.jpg" },
];

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({ open, onClose, onCreateChannel }) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [channelIcon, setChannelIcon] = useState("");

  const handleCreateChannel = () => {
    if (!channelName.trim()) return;
    
    onCreateChannel({
      name: channelName.trim(),
      description: description.trim(),
      isPrivate,
      members: selectedMembers,
      icon: channelIcon,
    });
    
    // Reset form
    setChannelName("");
    setDescription("");
    setIsPrivate(false);
    setSelectedMembers([]);
    setChannelIcon("");
    
    onClose();
  };

  const toggleMember = (userId: string) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="channel-icon" className="text-right">
              Icon
            </Label>
            <div className="col-span-3">
              <Select value={channelIcon} onValueChange={setChannelIcon}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hash"><Hash className="mr-2 h-4 w-4 inline" /> General</SelectItem>
                  <SelectItem value="users"><Users className="mr-2 h-4 w-4 inline" /> Team</SelectItem>
                  <SelectItem value="lock"><Lock className="mr-2 h-4 w-4 inline" /> Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="channel-name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                id="channel-name"
                placeholder="e.g. marketing-team"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <div className="col-span-3">
              <Textarea
                id="description"
                placeholder="What's this channel about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is-private" className="text-right">
              Private
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="is-private"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
              <span className="text-sm text-muted-foreground">
                Only invited people can join
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <Label className="text-right pt-2">
              Members
            </Label>
            <div className="col-span-3 border rounded-md p-3 max-h-[200px] overflow-y-auto">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="flex items-center justify-between py-2 hover:bg-secondary/30 px-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                  <Button
                    variant={selectedMembers.includes(member.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleMember(member.id)}
                  >
                    {selectedMembers.includes(member.id) ? "Added" : "Add"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateChannel} disabled={!channelName.trim()}>
            Create Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
