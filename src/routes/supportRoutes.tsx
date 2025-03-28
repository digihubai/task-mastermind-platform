
import React from 'react';
import { RouteObject } from 'react-router-dom';
import CallCenterPage from '@/pages/support/CallCenterPage';
import OmnichannelSupportPage from '@/pages/support/OmnichannelSupportPage';
import SupportDashboardPage from '@/pages/support/SupportDashboardPage';
import InboundCallsPage from '@/pages/support/InboundCallsPage';
import OutboundCallsPage from '@/pages/support/OutboundCallsPage';
import TicketsPage from '@/pages/support/TicketsPage';
import CustomerSupportPage from '@/pages/support/CustomerSupportPage';

const supportRoutes: RouteObject[] = [
  {
    path: '/support',
    element: <SupportDashboardPage />,
  },
  {
    path: '/support/dashboard',
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
  {
    path: '/support/customer',
    element: <CustomerSupportPage />,
  },
];

export default supportRoutes;
