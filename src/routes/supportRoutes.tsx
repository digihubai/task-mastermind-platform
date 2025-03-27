
import React from 'react';
import { RouteObject } from 'react-router-dom';
import CallCenterPage from '@/pages/support/CallCenterPage';

// Create placeholder components for support routes
const SupportDashboardPage = () => <div>Support Dashboard</div>;
const InboundCallsPage = () => <div>Inbound Calls Management</div>;
const OutboundCallsPage = () => <div>Outbound Calls Management</div>;
const OmnichannelSupportPage = () => <div>Omnichannel Support Dashboard</div>;
const TicketsPage = () => <div>Support Tickets Management</div>;

const supportRoutes: RouteObject[] = [
  {
    path: '/support',
    element: <SupportDashboardPage />,
  },
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

export default supportRoutes;
