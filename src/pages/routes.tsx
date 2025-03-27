import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';

// Import pages
import DashboardPage from './DashboardPage';
import AnalyticsPage from './AnalyticsPage';
import CalendarPage from './CalendarPage';
import ChatPage from './ChatPage';
import SupportPage from './SupportPage';
import ChatbotPage from './ChatbotPage';
import PhonePage from './PhonePage';
import OutboundPage from './OutboundPage';
import TeamChatPage from './TeamChatPage';
import TeamChatChannelsPage from './TeamChatChannelsPage';
import TeamChatCanvasPage from './TeamChatCanvasPage';
import TeamChatPinnedPage from './TeamChatPinnedPage';
import TeamChatGifsPage from './TeamChatGifsPage';
import ProjectManagementPage from './ProjectManagementPage';
import CRMPage from './CRMPage';
import FinancePage from './FinancePage';
import TaxCalculatorPage from './TaxCalculatorPage';
import InvoicesPage from './InvoicesPage';
import ExpensesPage from './ExpensesPage';
import ReportsPage from './ReportsPage';
import WorkflowsPage from './WorkflowsPage';
import TemplatesPage from './TemplatesPage';
import EditorPage from './EditorPage';
import IndustryTemplatesPage from './IndustryTemplatesPage';
import APIConnectorPage from './APIConnectorPage';
import MarketingPage from './MarketingPage';
import SocialPage from './SocialPage';
import CampaignsPage from './CampaignsPage';
import BrandVoicePage from './BrandVoicePage';
import AICopywriterPage from './AICopywriterPage';
import AISEOWriterPage from './AISEOWriterPage';
// AI pages
import AIVisionPage from './ai/AIVisionPage';
import PDFInsightPage from './ai/PDFInsightPage';

// User pages
import AIVision from './user/AIVision';

// Marketing pages
import MarketingSEOPage from './MarketingSEOPage';

import KnowledgePage from './KnowledgePage';
import SettingsPage from './SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
        path: '/finance',
        element: <FinancePage />,
      },
      {
        path: '/finance/tax-calculator',
        element: <TaxCalculatorPage />,
      },
      {
        path: '/finance/invoices',
        element: <InvoicesPage />,
      },
      {
        path: '/finance/expenses',
        element: <ExpensesPage />,
      },
      {
        path: '/finance/reports',
        element: <ReportsPage />,
      },
      {
        path: '/automation/workflows',
        element: <WorkflowsPage />,
      },
      {
        path: '/automation/templates',
        element: <TemplatesPage />,
      },
      {
        path: '/automation/editor',
        element: <EditorPage />,
      },
      {
        path: '/automation/industry-templates',
        element: <IndustryTemplatesPage />,
      },
      {
        path: '/automation/api-connector',
        element: <APIConnectorPage />,
      },
      {
        path: '/marketing',
        element: <MarketingPage />,
      },
      {
        path: '/marketing/seo',
        element: <MarketingSEOPage />,
      },
      {
        path: '/social',
        element: <SocialPage />,
      },
      {
        path: '/campaigns',
        element: <CampaignsPage />,
      },
      {
        path: '/brand-voice',
        element: <BrandVoicePage />,
      },
      {
        path: '/ai-copywriter',
        element: <AICopywriterPage />,
      },
      {
        path: '/ai-seo',
        element: <AISEOWriterPage />,
      },
      // AI routes
      {
        path: '/ai-vision',
        element: <AIVisionPage />,
      },
      {
        path: '/pdf-insight',
        element: <PDFInsightPage />,
      },
      
      // User routes
      {
        path: '/vision',
        element: <AIVision />,
      },
      {
        path: '/knowledge',
        element: <KnowledgePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;
