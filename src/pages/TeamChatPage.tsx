
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { TeamChat } from '@/components/teamchat/TeamChat';

const TeamChatPage = () => {
  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        <TeamChat />
      </div>
    </AppLayout>
  );
};

export default TeamChatPage;
