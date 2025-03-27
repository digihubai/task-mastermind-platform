
import React from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import AIToolsHub from '@/pages/ai/AIToolsHub';
import CRMDashboard from '@/pages/modules/CRM';
import ProjectManagement from '@/pages/modules/ProjectManagement';
import WorkflowPage from '@/pages/modules/Workflow';
import FunnelCreator from '@/pages/modules/FunnelCreator';
import AISEOPage from '@/pages/ai/AISEOPage';
import AIVisionPage from '@/pages/ai/AIVisionPage';
import ChatbotsPage from '@/pages/ai/ChatbotsPage';
import SettingsIntegrationsPage from '@/pages/settings/SettingsIntegrationsPage';

// Create placeholder components for new support routes
const CallCenterPage = () => <div>Call Center Dashboard</div>;
const InboundCallsPage = () => <div>Inbound Calls Management</div>;
const OutboundCallsPage = () => <div>Outbound Calls Management</div>;
const OmnichannelSupportPage = () => <div>Omnichannel Support Dashboard</div>;
const TicketsPage = () => <div>Support Tickets Management</div>;

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/ai-tools',
    element: <AIToolsHub />,
  },
  {
    path: '/ai-seo',
    element: <AISEOPage />,
  },
  {
    path: '/vision',
    element: <AIVisionPage />,
  },
  {
    path: '/crm',
    element: <CRMDashboard />,
  },
  {
    path: '/project-management',
    element: <ProjectManagement />,
  },
  {
    path: '/workflow',
    element: <WorkflowPage />,
  },
  {
    path: '/funnel-creator',
    element: <FunnelCreator />,
  },
  {
    path: '/chatbots',
    element: <ChatbotsPage />,
  },
  {
    path: '/settings/integrations',
    element: <SettingsIntegrationsPage />,
  },
  // New Support routes
  {
    path: '/support/call-center',
    element: <CallCenterPage />,
  },
  {
    path: '/support/call-center/inbound',
    element: <InboundCallsPage />,
  },
  {
    path: '/support/call-center/outbound',
    element: <OutboundCallsPage />,
  },
  {
    path: '/support/omnichannel',
    element: <OmnichannelSupportPage />,
  },
  {
    path: '/support/tickets',
    element: <TicketsPage />,
  },
];

export default mainRoutes;
