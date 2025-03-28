
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OmnichannelInbox from "@/components/communication/OmnichannelInbox";
import { useNavigate } from 'react-router-dom';

const InboxTabContent: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Communication Inbox</CardTitle>
        <Button size="sm" onClick={() => navigate('/support/omnichannel')}>
          Full Inbox
        </Button>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        <OmnichannelInbox />
      </CardContent>
    </Card>
  );
};

export default InboxTabContent;
