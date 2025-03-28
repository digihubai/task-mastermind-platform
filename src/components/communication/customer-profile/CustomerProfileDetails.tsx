
import React, { useState } from 'react';
import { CustomerProfile } from '@/types/omnichannel';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Clock,
  Mail,
  Phone,
  Smartphone,
  Globe,
  MapPin,
  Building,
  Network,
  Monitor,
  LucideIcon,
  Calendar,
  Languages,
  CreditCard,
  Link as LinkIcon,
  Send,
  Tag,
  User,
  CheckCircle
} from 'lucide-react';

interface ProfileDetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const ProfileDetailItem: React.FC<ProfileDetailItemProps> = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="bg-muted w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
};

interface CustomerProfileDetailsProps {
  profile: CustomerProfile;
}

const CustomerProfileDetails: React.FC<CustomerProfileDetailsProps> = ({ profile }) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedNotes, setSavedNotes] = useState<string>('');
  
  const handleSaveNotes = () => {
    setIsSaving(true);
    
    // In a real application, you would save the notes to your backend
    setTimeout(() => {
      setSavedNotes(notes);
      setIsSaving(false);
      
      toast({
        title: 'Notes saved',
        description: 'Customer notes have been saved successfully.',
        variant: 'default'
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg bg-primary/10 text-primary">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="outline">{profile.type}</Badge>
            <Badge variant="secondary">Customer</Badge>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          <Mail className="mr-2 h-4 w-4" />
          Email
        </Button>
        <Button size="sm" className="flex-1">
          <Phone className="mr-2 h-4 w-4" />
          Call
        </Button>
        <Button size="sm" className="flex-1">
          <Send className="mr-2 h-4 w-4" />
          Message
        </Button>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium mb-4">Conversation Details</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <ProfileDetailItem icon={Tag} label="Conversation ID" value={profile.conversationId} />
          <ProfileDetailItem icon={User} label="User ID" value={profile.userId} />
          <ProfileDetailItem icon={Calendar} label="Creation Time" value={profile.createdAt} />
          <ProfileDetailItem icon={Clock} label="Last Activity" value={profile.lastActivity} />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium mb-4">Customer Information</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <ProfileDetailItem icon={Mail} label="Email" value={profile.email} />
          <ProfileDetailItem icon={Phone} label="Phone" value={profile.phone} />
          <ProfileDetailItem icon={Building} label="Company" value={profile.company} />
          <ProfileDetailItem icon={CreditCard} label="Currency" value={profile.currency} />
          <ProfileDetailItem icon={MapPin} label="Location" value={profile.location} />
          <ProfileDetailItem icon={Clock} label="Timezone" value={profile.timezone} />
          <ProfileDetailItem icon={Languages} label="Language" value={profile.language} />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium mb-4">Technical Information</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <ProfileDetailItem icon={Monitor} label="Browser" value={profile.browser} />
          <ProfileDetailItem icon={Monitor} label="OS" value={profile.os} />
          <ProfileDetailItem icon={LinkIcon} label="Current URL" value={profile.currentUrl} />
          <ProfileDetailItem icon={Network} label="IP" value={profile.ip} />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Returning Customer</Badge>
          <Badge variant="outline">Paid Account</Badge>
          <Badge variant="secondary">Sales</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Notes</h3>
        <textarea 
          className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background" 
          placeholder="Add notes about this customer..."
          value={notes || savedNotes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex justify-end">
          <Button 
            size="sm" 
            onClick={handleSaveNotes} 
            disabled={isSaving || (!notes && !savedNotes)}
          >
            {isSaving ? (
              <span className="flex items-center">
                <span className="mr-2">Saving...</span>
              </span>
            ) : (
              <span className="flex items-center">
                {savedNotes && notes === savedNotes && <CheckCircle className="mr-2 h-3 w-3" />}
                Save Notes
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileDetails;
