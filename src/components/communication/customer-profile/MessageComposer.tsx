
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Send } from 'lucide-react';

interface MessageComposerProps {
  open: boolean;
  onClose: () => void;
  recipientPhone: string;
  recipientName?: string;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ 
  open, 
  onClose, 
  recipientPhone, 
  recipientName 
}) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const [charCount, setCharCount] = useState(0);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSend = () => {
    if (!message) {
      toast({
        title: "Missing message",
        description: "Please enter a message to send.",
        variant: "destructive"
      });
      return;
    }
    
    setSending(true);
    
    // In a real application, you would send the message via your backend service
    setTimeout(() => {
      setSending(false);
      onClose();
      
      toast({
        title: "Message sent",
        description: `Message to ${recipientName || recipientPhone} has been sent successfully.`,
      });
      
      // Reset form
      setMessage('');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>Send Message</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="to" className="text-right">To:</Label>
            <div className="col-span-3">
              <Input 
                id="to" 
                value={recipientName ? `${recipientName} (${recipientPhone})` : recipientPhone} 
                readOnly 
                className="bg-muted"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Label htmlFor="message" className="text-right pt-2">Message:</Label>
            <div className="col-span-3">
              <Textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                rows={5}
                placeholder="Type your message here..."
                className="min-h-[100px] resize-y"
                maxLength={160}
              />
              <div className="text-xs text-right mt-1 text-muted-foreground">
                {charCount}/160 characters
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending}>
            {sending ? (
              <span className="flex items-center gap-1">
                <span className="animate-spin">◌</span>
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Send className="h-4 w-4" />
                Send Message
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageComposer;
