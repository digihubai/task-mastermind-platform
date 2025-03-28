
import React from 'react';
import OmnichannelInbox from '@/components/communication/OmnichannelInbox';
import { Conversation } from '@/types/omnichannel';
import { toast } from '@/hooks/use-toast';

interface OmnichannelInboxTabProps {
  onAssignToHuman: (assignedConversation: Conversation) => void;
}

const OmnichannelInboxTab: React.FC<OmnichannelInboxTabProps> = ({ onAssignToHuman }) => {
  return (
    <OmnichannelInbox onAssignToHuman={onAssignToHuman} />
  );
};

export default OmnichannelInboxTab;
