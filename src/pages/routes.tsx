
import React from "react";
import { RouteObject, Navigate } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import ChatPage from "@/pages/ChatPage";
import CustomersPage from "@/pages/CustomersPage";
import MarketingPage from "@/pages/MarketingPage";
import ProjectsPage from "@/pages/ProjectsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";
import TeamChatPage from "@/pages/TeamChatPage";
import ChatbotPage from "@/pages/ChatbotPage";
import MarketingSEOPage from "@/pages/MarketingSEOPage";
import AIRewriterPage from "@/pages/ai/AIRewriterPage";
import AIToolsHub from "@/pages/ai/AIToolsHub";
import AIVisionPage from "@/pages/ai/AIVisionPage";
import AISEOPage from "@/pages/ai/AISEOPage";
import PDFInsightPage from "@/pages/ai/PDFInsightPage";
import AICopywriterPage from "@/pages/ai/AICopywriterPage";
import ChatbotsPage from "@/pages/ai/ChatbotsPage";
import NewChatbotPage from "@/pages/ai/NewChatbotPage";
import ChatbotEditPage from "@/pages/ai/ChatbotEditPage";
import ChatbotConfigPage from "@/pages/ai/ChatbotConfigPage";
import authRoutes from "@/routes/authRoutes";
import mainRoutes from "@/routes/mainRoutes";
import aiRoutes from "@/routes/aiRoutes";
import marketingRoutes from "@/routes/marketingRoutes";
import supportRoutes from "@/routes/supportRoutes";
import financeRoutes from "@/routes/financeRoutes";
import crmRoutes from "@/routes/crmRoutes";
import automationRoutes from "@/routes/automationRoutes";
import Workflow from "@/pages/modules/Workflow";
import CampaignsPage from "@/pages/marketing/CampaignsPage";
import SocialMediaPage from "@/pages/marketing/SocialMediaPage";
import FinanceDashboard from "@/pages/finance/FinanceDashboard";

// Main application routes
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/chat/:id",
    element: <ChatPage />,
  },
  {
    path: "/customers",
    element: <CustomersPage />,
  },
  {
    path: "/marketing",
    element: <MarketingPage />,
  },
  {
    path: "/marketing/seo",
    element: <MarketingSEOPage />,
  },
  {
    path: "/marketing/campaigns",
    element: <CampaignsPage />,
  },
  {
    path: "/marketing/social-media",
    element: <SocialMediaPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/settings/*",
    element: <SettingsPage />,
  },
  {
    path: "/teamchat",
    element: <TeamChatPage />,
  },
  {
    path: "/chatbot",
    element: <ChatbotPage />,
  },
  {
    path: "/workflow",
    element: <Workflow />,
  },
  {
    path: "/finance",
    element: <FinanceDashboard />,
  },
  {
    path: "/ai/rewriter",
    element: <AIRewriterPage />,
  },
  {
    path: "/ai",
    element: <AIToolsHub />,
  },
  {
    path: "/ai/vision",
    element: <AIVisionPage />,
  },
  {
    path: "/ai/seo",
    element: <AISEOPage />,
  },
  {
    path: "/ai/pdf",
    element: <PDFInsightPage />,
  },
  {
    path: "/ai/copywriter",
    element: <AICopywriterPage />,
  },
  {
    path: "/ai/chatbots",
    element: <ChatbotsPage />,
  },
  {
    path: "/ai/chatbots/new",
    element: <NewChatbotPage />,
  },
  {
    path: "/ai/chatbots/edit/:id",
    element: <ChatbotEditPage />,
  },
  {
    path: "/ai/chatbots/configure/:id",
    element: <ChatbotConfigPage />,
  },
  ...mainRoutes,
  ...authRoutes,
  ...aiRoutes,
  ...marketingRoutes,
  ...supportRoutes,
  ...financeRoutes,
  ...crmRoutes,
  ...automationRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
