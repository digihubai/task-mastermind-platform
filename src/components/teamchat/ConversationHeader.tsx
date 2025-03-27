
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Hash,
  Users,
  UserPlus,
  Phone,
  Video,
  Pin,
  Search,
  MoreVertical,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConversationHeaderProps {
  selectedChannel: {
    id: string;
    name: string;
    description?: string;
    members: string[];
  } | null;
  selectedGroup: {
    id: string;
    name: string;
    members: string[];
  } | null;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  selectedChannel,
  selectedGroup
}) => {
  const [isAudioCallOpen, setIsAudioCallOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const handleStartAudioCall = () => {
    setIsAudioCallOpen(true);
    setIsCalling(true);
    
    // Simulate connecting call after 2 seconds
    setTimeout(() => {
      setIsCalling(false);
      toast.success("Call connected!");
    }, 2000);
  };

  const handleStartVideoCall = () => {
    setIsVideoCallOpen(true);
    setIsCalling(true);
    
    // Simulate connecting call after 2 seconds
    setTimeout(() => {
      setIsCalling(false);
      toast.success("Video call connected!");
    }, 2000);
  };

  const handleEndCall = () => {
    setIsAudioCallOpen(false);
    setIsVideoCallOpen(false);
    setIsCalling(false);
    toast.info("Call ended");
  };

  return (
    <div className="p-3 border-b flex items-center justify-between">
      {selectedChannel && (
        <div className="flex items-center gap-2">
          <Hash size={20} />
          <div>
            <h3 className="font-medium">{selectedChannel.name}</h3>
            {selectedChannel.description && (
              <p className="text-xs text-muted-foreground">{selectedChannel.description}</p>
            )}
          </div>
        </div>
      )}
      
      {selectedGroup && (
        <div className="flex items-center gap-2">
          <Users size={20} />
          <div>
            <h3 className="font-medium">{selectedGroup.name}</h3>
            <p className="text-xs text-muted-foreground">
              {selectedGroup.members.length} members
            </p>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <UserPlus size={18} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleStartAudioCall}
        >
          <Phone size={18} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleStartVideoCall}
        >
          <Video size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pin size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search size={18} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as read</DropdownMenuItem>
            <DropdownMenuItem>Notification settings</DropdownMenuItem>
            <DropdownMenuItem>Create channel</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Leave channel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Audio Call Dialog */}
      <Dialog open={isAudioCallOpen} onOpenChange={setIsAudioCallOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isCalling 
                ? "Connecting audio call..." 
                : `Audio call with ${selectedChannel?.name || selectedGroup?.name}`}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-6">
            {isCalling ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <p>Connecting call...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-green-500" />
                </div>
                <p>Call in progress</p>
                <div className="text-sm text-muted-foreground mt-2">00:00</div>
              </div>
            )}
            <div className="flex space-x-2 mt-4">
              <Button 
                variant="destructive" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={handleEndCall}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Call Dialog */}
      <Dialog open={isVideoCallOpen} onOpenChange={setIsVideoCallOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isCalling 
                ? "Connecting video call..." 
                : `Video call with ${selectedChannel?.name || selectedGroup?.name}`}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-6">
            {isCalling ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <p>Connecting video call...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="bg-gray-800 rounded-lg w-full aspect-video flex items-center justify-center mb-4">
                  <Video className="h-12 w-12 text-gray-400" />
                </div>
                <div className="bg-gray-800 rounded-lg w-24 h-24 absolute bottom-32 right-8 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <div className="text-sm text-muted-foreground mt-2">00:00</div>
              </div>
            )}
            <div className="flex space-x-2 mt-4">
              <Button 
                variant="destructive" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={handleEndCall}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConversationHeader;
