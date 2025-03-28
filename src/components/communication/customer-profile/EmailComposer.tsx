
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Paperclip, Send } from 'lucide-react';

interface EmailComposerProps {
  open: boolean;
  onClose: () => void;
  recipientEmail: string;
  recipientName?: string;
}

const EmailComposer: React.FC<EmailComposerProps> = ({ 
  open, 
  onClose, 
  recipientEmail, 
  recipientName 
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!subject || !message) {
      toast({
        title: "Missing information",
        description: "Please provide both subject and message.",
        variant: "destructive"
      });
      return;
    }
    
    setSending(true);
    
    // In a real application, you would send the email via your backend service
    setTimeout(() => {
      setSending(false);
      onClose();
      
      toast({
        title: "Email sent",
        description: `Email to ${recipientEmail} has been sent successfully.`,
      });
      
      // Reset form
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span>Compose Email</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="to" className="text-right">To:</Label>
            <div className="col-span-3">
              <Input 
                id="to" 
                value={recipientName ? `${recipientName} <${recipientEmail}>` : recipientEmail} 
                readOnly 
                className="bg-muted"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="subject" className="text-right">Subject:</Label>
            <div className="col-span-3">
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Label htmlFor="message" className="text-right pt-2">Message:</Label>
            <div className="col-span-3">
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                placeholder="Type your email message here..."
                className="min-h-[120px] resize-y"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <div></div>
            <div className="col-span-3">
              <Button variant="outline" size="sm" className="gap-1">
                <Paperclip className="h-4 w-4" />
                Attach File
              </Button>
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
                Send Email
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailComposer;
