
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface CreateChannelDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateChannel: (channelData: {
    name: string;
    description: string;
    isPrivate: boolean;
  }) => void;
}

const CreateChannelDialog: React.FC<CreateChannelDialogProps> = ({
  open,
  onClose,
  onCreateChannel
}) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreateChannel = () => {
    if (channelName.trim() === "") return;
    
    onCreateChannel({
      name: channelName.trim(),
      description: description.trim(),
      isPrivate
    });
    
    // Reset form
    setChannelName("");
    setDescription("");
    setIsPrivate(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Channel</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="channel-name">Channel Name</Label>
            <Input 
              id="channel-name" 
              placeholder="e.g. marketing" 
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="channel-description">Description (optional)</Label>
            <Textarea 
              id="channel-description" 
              placeholder="What is this channel about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="channel-private">Make Private</Label>
              <Switch 
                id="channel-private"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Private channels are only visible to invited members
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreateChannel} disabled={!channelName.trim()}>Create Channel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDialog;
