
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, MicOff, Mic, PhoneOff } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CallInterfaceProps {
  open: boolean;
  onClose: () => void;
  recipientPhone: string;
  recipientName?: string;
}

const CallInterface: React.FC<CallInterfaceProps> = ({ 
  open, 
  onClose, 
  recipientPhone, 
  recipientName 
}) => {
  const [callStatus, setCallStatus] = useState<'dialing' | 'connected' | 'ended'>('dialing');
  const [callTime, setCallTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Simulate call connection after 2 seconds
    if (open && callStatus === 'dialing') {
      const connectionTimer = setTimeout(() => {
        setCallStatus('connected');
        
        toast({
          title: "Call connected",
          description: `You're now connected with ${recipientName || recipientPhone}`,
        });
        
        // Start call timer
        timer = setInterval(() => {
          setCallTime(prev => prev + 1);
        }, 1000);
      }, 2000);
      
      return () => {
        clearTimeout(connectionTimer);
        clearInterval(timer);
      };
    }
    
    if (callStatus === 'connected') {
      timer = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
    
    return () => clearInterval(timer);
  }, [open, callStatus, recipientName, recipientPhone, toast]);
  
  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleEndCall = () => {
    setCallStatus('ended');
    
    toast({
      title: "Call ended",
      description: `Call with ${recipientName || recipientPhone} has ended`,
    });
    
    setTimeout(() => {
      onClose();
      // Reset state for next call
      setCallStatus('dialing');
      setCallTime(0);
      setMuted(false);
    }, 1000);
  };
  
  const toggleMute = () => {
    setMuted(!muted);
    
    toast({
      title: muted ? "Microphone unmuted" : "Microphone muted",
      description: muted ? "You can now be heard" : "You are now muted",
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <Phone className="h-5 w-5" />
            <span>
              {callStatus === 'dialing' ? 'Calling...' : 
               callStatus === 'connected' ? 'On Call' : 'Call Ended'}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-2xl">
              {recipientName ? recipientName.charAt(0) : '#'}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h3 className="text-xl font-medium">
              {recipientName || "Unknown"}
            </h3>
            <p className="text-muted-foreground">{recipientPhone}</p>
          </div>
          
          {callStatus === 'dialing' && (
            <p className="text-muted-foreground animate-pulse">Connecting...</p>
          )}
          
          {callStatus === 'connected' && (
            <div className="flex flex-col items-center">
              <p className="text-md font-medium">Connected</p>
              <p className="text-sm text-muted-foreground">
                {formatCallTime(callTime)}
              </p>
            </div>
          )}
          
          {callStatus === 'ended' && (
            <p className="text-muted-foreground">Call ended</p>
          )}
        </div>
        
        <div className="flex justify-center gap-4">
          {callStatus !== 'ended' && (
            <>
              <Button 
                variant={muted ? "destructive" : "outline"} 
                onClick={toggleMute} 
                className="rounded-full h-12 w-12 p-0"
                disabled={callStatus !== 'connected'}
              >
                {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={handleEndCall}
                className="rounded-full h-12 w-12 p-0"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </>
          )}
          
          {callStatus === 'ended' && (
            <Button onClick={onClose}>Close</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallInterface;
