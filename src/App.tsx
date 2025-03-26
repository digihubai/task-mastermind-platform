
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";
import ChatPage from "./pages/ChatPage";
import CustomersPage from "./pages/CustomersPage";
import ChatbotPage from "./pages/ChatbotPage";
import MarketingPage from "./pages/MarketingPage";
import SettingsPage from "./pages/SettingsPage";

// User pages
import Dashboard from "./pages/user/Dashboard";
import AIBots from "./pages/user/AIBots";
import Documents from "./pages/user/Documents";
import AIEditor from "./pages/user/AIEditor";
import AICopywriter from "./pages/user/AICopywriter";
import ChatSettings from "./pages/user/ChatSettings";
import AISEOWriter from "./pages/user/AISEOWriter";
import PDFInsight from "./pages/user/PDFInsight";
import AIVision from "./pages/user/AIVision";
import AIRewriter from "./pages/user/AIRewriter";
import BrandVoice from "./pages/user/BrandVoice";
import Affiliates from "./pages/user/Affiliates";
import Support from "./pages/user/Support";
import Integration from "./pages/user/Integration";
import Links from "./pages/user/Links";
import Favorites from "./pages/user/Favorites";
import Workbook from "./pages/user/Workbook";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import Marketplace from "./pages/admin/Marketplace";
import Themes from "./pages/admin/Themes";
import UserManagement from "./pages/admin/UserManagement";
import Announcements from "./pages/admin/Announcements";
import GoogleAdsense from "./pages/admin/GoogleAdsense";
import SupportRequests from "./pages/admin/SupportRequests";
import Templates from "./pages/admin/Templates";
import AdminChatSettings from "./pages/admin/ChatSettings";
import Frontend from "./pages/admin/Frontend";
import Finance from "./pages/admin/Finance";
import Pages from "./pages/admin/Pages";
import Blog from "./pages/admin/Blog";
import AdminAffiliates from "./pages/admin/Affiliates";
import Coupons from "./pages/admin/Coupons";
import EmailTemplates from "./pages/admin/EmailTemplates";
import APIIntegration from "./pages/admin/APIIntegration";
import AdminSettings from "./pages/admin/Settings";
import SiteHealth from "./pages/admin/SiteHealth";
import Credits from "./pages/admin/Credits";

// New module pages
import ProjectManagement from "./pages/modules/ProjectManagement";
import CRM from "./pages/modules/CRM";
import Workflow from "./pages/modules/Workflow";
import FunnelCreator from "./pages/modules/FunnelCreator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Current routes */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* User routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bots" element={<AIBots />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/editor" element={<AIEditor />} />
          <Route path="/copywriter" element={<AICopywriter />} />
          <Route path="/chat-settings" element={<ChatSettings />} />
          <Route path="/seo-writer" element={<AISEOWriter />} />
          <Route path="/pdf-insight" element={<PDFInsight />} />
          <Route path="/vision" element={<AIVision />} />
          <Route path="/rewriter" element={<AIRewriter />} />
          <Route path="/brand-voice" element={<BrandVoice />} />
          <Route path="/affiliates" element={<Affiliates />} />
          <Route path="/support" element={<Support />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/links" element={<Links />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/workbook" element={<Workbook />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/marketplace" element={<Marketplace />} />
          <Route path="/admin/themes" element={<Themes />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/announcements" element={<Announcements />} />
          <Route path="/admin/adsense" element={<GoogleAdsense />} />
          <Route path="/admin/support-requests" element={<SupportRequests />} />
          <Route path="/admin/templates" element={<Templates />} />
          <Route path="/admin/chat-settings" element={<AdminChatSettings />} />
          <Route path="/admin/frontend" element={<Frontend />} />
          <Route path="/admin/finance" element={<Finance />} />
          <Route path="/admin/pages" element={<Pages />} />
          <Route path="/admin/blog" element={<Blog />} />
          <Route path="/admin/affiliates" element={<AdminAffiliates />} />
          <Route path="/admin/coupons" element={<Coupons />} />
          <Route path="/admin/email-templates" element={<EmailTemplates />} />
          <Route path="/admin/api-integration" element={<APIIntegration />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/site-health" element={<SiteHealth />} />
          <Route path="/admin/credits" element={<Credits />} />
          
          {/* New modules */}
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/funnel-creator" element={<FunnelCreator />} />
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
