
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  status: string;
  avatar?: string;
}

interface CreateGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateGroup: (groupData: {
    name: string;
    members: string[];
  }) => void;
  teamMembers: TeamMember[];
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
  open,
  onClose,
  onCreateGroup,
  teamMembers
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleCreateGroup = () => {
    if (groupName.trim() === "") return;
    if (selectedMembers.length === 0) return;
    
    onCreateGroup({
      name: groupName.trim(),
      members: selectedMembers
    });
    
    // Reset form
    setGroupName("");
    setSelectedMembers([]);
  };

  const handleToggleMember = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input 
              id="group-name" 
              placeholder="e.g. Project Team" 
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Select Members</Label>
            <div className="border rounded-md h-40 overflow-y-auto p-2">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center gap-2 p-1">
                  <input 
                    type="checkbox" 
                    id={`member-${member.id}`} 
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => handleToggleMember(member.id)}
                    className="rounded"
                  />
                  <label htmlFor={`member-${member.id}`} className="flex items-center gap-2 flex-1">
                    <Avatar className="h-6 w-6">
                      {member.avatar && <AvatarImage src={member.avatar} />}
                      <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleCreateGroup} 
            disabled={!groupName.trim() || selectedMembers.length === 0}
          >
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
