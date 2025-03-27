
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';

// Import existing pages
import Index from './Index';
import NotFound from './NotFound';
import ProjectsPage from './ProjectsPage';
import SettingsPage from './SettingsPage';
import TeamChatPage from './TeamChatPage';
import AuthPage from './auth/AuthPage';

// AI pages
import AIVisionPage from './ai/AIVisionPage';
import PDFInsightPage from './ai/PDFInsightPage';
import AICopywriterPage from './ai/AICopywriterPage';
import AISEOWriterPage from './ai/AISEOWriterPage';

// User pages
import AIVision from './user/AIVision';

// Marketing pages
import MarketingPage from './MarketingPage';
import MarketingSEOPage from './MarketingSEOPage';

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
const FinancePage = () => <div>Finance Page</div>;
const TaxCalculatorPage = () => <div>Tax Calculator Page</div>;
const InvoicesPage = () => <div>Invoices Page</div>;
const ExpensesPage = () => <div>Expenses Page</div>;
const ReportsPage = () => <div>Reports Page</div>;
const WorkflowsPage = () => <div>Workflows Page</div>;
const TemplatesPage = () => <div>Templates Page</div>;
const EditorPage = () => <div>Editor Page</div>;
const IndustryTemplatesPage = () => <div>Industry Templates Page</div>;
const APIConnectorPage = () => <div>API Connector Page</div>;
const SocialPage = () => <div>Social Page</div>;
const CampaignsPage = () => <div>Campaigns Page</div>;
const BrandVoicePage = () => <div>Brand Voice Page</div>;
const KnowledgePage = () => <div>Knowledge Page</div>;

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
      {
        path: '/projects',
        element: <ProjectsPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);

export default router;
