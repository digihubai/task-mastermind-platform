
import React from "react";
import { TeamGroup } from "@/types/support";
import { TeamMember } from "./TeamChat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Users, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";

interface DirectMessagesSidebarProps {
  groups: TeamGroup[];
  teamMembers: TeamMember[];
  searchQuery: string;
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string) => void;
  onCreateGroup: () => void;
  selectedMembers: string[];
  onToggleMemberSelection: (memberId: string) => void;
  onCreateGroupSubmit: () => void;
  newGroupName: string;
  setNewGroupName: (name: string) => void;
  newGroupDialogOpen: boolean;
  setNewGroupDialogOpen: (open: boolean) => void;
}

const DirectMessagesSidebar: React.FC<DirectMessagesSidebarProps> = ({
  groups,
  teamMembers,
  searchQuery,
  selectedGroupId,
  onSelectGroup,
  onCreateGroup,
  selectedMembers,
  onToggleMemberSelection,
  onCreateGroupSubmit,
  newGroupName,
  setNewGroupName,
  newGroupDialogOpen,
  setNewGroupDialogOpen
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-2 py-1.5">
        <h3 className="text-sm font-semibold">Direct Messages</h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCreateGroup}>
          <Plus size={16} />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-1">
          <div className="px-2 py-1.5">
            <h4 className="text-xs font-medium text-muted-foreground">Groups</h4>
          </div>
          
          {groups
            .filter(group => 
              searchQuery === "" || 
              group.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((group) => {
              const isSelected = selectedGroupId === group.id;
              
              return (
                <button
                  key={group.id}
                  className={`w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md ${
                    isSelected 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => onSelectGroup(group.id)}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {group.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{group.name}</span>
                  </div>
                  
                  {group.unreadCount > 0 && (
                    <Badge variant="secondary" className="h-5 w-5 text-xs p-0 flex items-center justify-center">
                      {group.unreadCount}
                    </Badge>
                  )}
                </button>
              );
            })}
          
          <div className="px-2 py-1.5 pt-3">
            <h4 className="text-xs font-medium text-muted-foreground">Team Members</h4>
          </div>
          
          {teamMembers
            .filter(member => 
              searchQuery === "" || 
              member.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((member) => (
              <button
                key={member.id}
                className="w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md hover:bg-secondary"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Avatar className="h-6 w-6">
                    {member.avatar && <AvatarImage src={member.avatar} />}
                    <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{member.name}</span>
                </div>
                
                <div className={`h-2 w-2 rounded-full ${
                  member.status === 'online' ? 'bg-green-500' :
                  member.status === 'away' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
              </button>
            ))}
        </div>
      </ScrollArea>
      
      <Dialog open={newGroupDialogOpen} onOpenChange={setNewGroupDialogOpen}>
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
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
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
                      onChange={() => onToggleMemberSelection(member.id)}
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
            <Button variant="outline" onClick={() => setNewGroupDialogOpen(false)}>Cancel</Button>
            <Button onClick={onCreateGroupSubmit}>Create Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DirectMessagesSidebar;
