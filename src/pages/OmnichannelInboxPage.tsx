
import React from 'react';
import AppLayout from "@/components/layout/AppLayout";
import OmnichannelInbox from "@/components/communication/OmnichannelInbox";

const OmnichannelInboxPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Omnichannel Inbox</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your customer communications in one place
          </p>
        </div>

        <OmnichannelInbox />
      </div>
    </AppLayout>
  );
};

export default OmnichannelInboxPage;
