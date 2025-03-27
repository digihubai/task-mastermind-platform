
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import ProjectsPage from '@/pages/ProjectsPage';
import SettingsPage from '@/pages/SettingsPage';
import TeamChatPage from '@/pages/TeamChatPage';

// Create placeholder components for missing pages
const DashboardPage = () => <Index />;
const AnalyticsPage = () => <div>Analytics Page</div>;
const CalendarPage = () => <div>Calendar Page</div>;
const ChatPage = () => <div>Chat Page</div>;
const SupportPage = () => <div>Support Page</div>;
const ChatbotPage = () => <div>Chatbot Page</div>;
const PhonePage = () => <div>Phone Page</div>;
const OutboundPage = () => <div>Outbound Page</div>;
const TeamChatChannelsPage = () => <div>Team Chat Channels Page</div>;
const TeamChatCanvasPage = () => <div>Team Chat Canvas Page</div>;
const TeamChatPinnedPage = () => <div>Team Chat Pinned Page</div>;
const TeamChatGifsPage = () => <div>Team Chat Gifs Page</div>;
const ProjectManagementPage = () => <div>Project Management Page</div>;
const CRMPage = () => <div>CRM Page</div>;
const KnowledgePage = () => <div>Knowledge Page</div>;

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/analytics',
    element: <AnalyticsPage />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/support',
    element: <SupportPage />,
  },
  {
    path: '/chatbot',
    element: <ChatbotPage />,
  },
  {
    path: '/phone',
    element: <PhonePage />,
  },
  {
    path: '/outbound',
    element: <OutboundPage />,
  },
  {
    path: '/team-chat',
    element: <TeamChatPage />,
  },
  {
    path: '/team-chat/channels',
    element: <TeamChatChannelsPage />,
  },
  {
    path: '/team-chat/canvas',
    element: <TeamChatCanvasPage />,
  },
  {
    path: '/team-chat/pinned',
    element: <TeamChatPinnedPage />,
  },
  {
    path: '/team-chat/gifs',
    element: <TeamChatGifsPage />,
  },
  {
    path: '/project-management',
    element: <ProjectManagementPage />,
  },
  {
    path: '/crm',
    element: <CRMPage />,
  },
  {
    path: '/knowledge',
    element: <KnowledgePage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
];

export default mainRoutes;
