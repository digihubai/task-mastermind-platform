
import React from 'react';
import { RouteObject } from 'react-router-dom';
import CallCenterPage from '@/pages/support/CallCenterPage';
import OmnichannelSupportPage from '@/pages/support/OmnichannelSupportPage';
import SupportDashboardPage from '@/pages/support/SupportDashboardPage';
import InboundCallsPage from '@/pages/support/InboundCallsPage';
import OutboundCallsPage from '@/pages/support/OutboundCallsPage';
import TicketsPage from '@/pages/support/TicketsPage';
import CustomerSupportPage from '@/pages/support/CustomerSupportPage';
import EmbedTicketPage from '@/pages/support/EmbedTicketPage';
import { EmbeddableTicketForm } from '@/components/support/EmbeddableTicketForm';
import { Navigate } from 'react-router-dom';

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
  {
    path: '/support/embed',
    element: <EmbedTicketPage />,
  },
  {
    path: '/support/embed-chatbot',
    element: <Navigate to="/ai/chatbots" replace />,
  },
  {
    path: '/support/ticket-form',
    element: <EmbeddableTicketForm />,
  },
  {
    path: '/support/analytics',
    element: <Navigate to="/analytics/support" replace />,
  }
];

export default supportRoutes;
