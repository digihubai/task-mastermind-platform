
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/Index'
import NotFound from './pages/NotFound'

// Authentication
import AuthPage from './pages/auth/AuthPage'

// Marketing
import MarketingPage from './pages/MarketingPage'
import BrandVoicePage from './pages/marketing/BrandVoicePage'
import CampaignsPage from './pages/marketing/CampaignsPage'
import EmailMarketingPage from './pages/marketing/EmailMarketingPage'
import SocialMediaPage from './pages/marketing/SocialMediaPage'

// AI Tools
import AIToolsHub from './pages/ai/AIToolsHub'
import AIRewriterPage from './pages/ai/AIRewriterPage'
import AISEOPage from './pages/ai/AISEOPage'
import AICopywriterPage from './pages/ai/AICopywriterPage'
import AIVisionPage from './pages/ai/AIVisionPage'
import PDFInsightPage from './pages/ai/PDFInsightPage'

// User pages
import Dashboard from './pages/user/Dashboard'
import AICopywriter from './pages/user/AICopywriter'
import AIRewriter from './pages/user/AIRewriter'
import AISEOWriter from './pages/user/AISEOWriter'
import AIVision from './pages/user/AIVision'
import PDFInsight from './pages/user/PDFInsight'
import BrandVoice from './pages/user/BrandVoice'
import ChatSettings from './pages/user/ChatSettings'
import Documents from './pages/user/Documents'
import Favorites from './pages/user/Favorites'
import Integration from './pages/user/Integration'
import Support from './pages/user/Support'
import Workbook from './pages/user/Workbook'
import Links from './pages/user/Links'
import AIBots from './pages/user/AIBots'
import AIEditor from './pages/user/AIEditor'
import Affiliates from './pages/user/Affiliates'

// Communication
import ChatPage from './pages/ChatPage'
import ChatbotPage from './pages/ChatbotPage'
import TeamChatPage from './pages/TeamChatPage'
import CustomersPage from './pages/CustomersPage'
import ProjectsPage from './pages/ProjectsPage'
import SettingsPage from './pages/SettingsPage'

// Analytics
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard'

// Automation
import Workflows from './pages/automation/Workflows';
import WorkflowEditor from './pages/automation/WorkflowEditor';
import ApiConnector from './pages/automation/ApiConnector';
import WorkflowTemplates from './pages/automation/WorkflowTemplates';
import IndustryTemplates from './pages/automation/IndustryTemplates';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminSettings from './pages/admin/Settings'
import AdminAPIIntegration from './pages/admin/APIIntegration'
import AdminChatSettings from './pages/admin/ChatSettings'
import AdminAffiliates from './pages/admin/Affiliates'
import AdminAnnouncements from './pages/admin/Announcements'
import AdminBlog from './pages/admin/Blog'
import AdminCoupons from './pages/admin/Coupons'
import AdminCredits from './pages/admin/Credits'
import AdminEmailTemplates from './pages/admin/EmailTemplates'
import AdminFinance from './pages/admin/Finance'
import AdminFrontend from './pages/admin/Frontend'
import AdminGoogleAdsense from './pages/admin/GoogleAdsense'
import AdminMarketplace from './pages/admin/Marketplace'
import AdminPages from './pages/admin/Pages'
import AdminSiteHealth from './pages/admin/SiteHealth'
import AdminSupportRequests from './pages/admin/SupportRequests'
import AdminTemplates from './pages/admin/Templates'
import AdminThemes from './pages/admin/Themes'
import AdminUserManagement from './pages/admin/UserManagement'

// Module pages
import ModuleCRM from './pages/modules/CRM'
import ModuleProjectManagement from './pages/modules/ProjectManagement'
import ModuleWorkflow from './pages/modules/Workflow'
import ModuleFunnelCreator from './pages/modules/FunnelCreator'

// Phone system
import IVRSystem from './pages/phone/IVRSystem'
import OutboundCalls from './pages/outbound/OutboundCalls'

// Finance
import FinanceDashboard from './pages/finance/FinanceDashboard'
import TaxCalculator from './pages/finance/TaxCalculator'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<IndexPage />} />
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Analytics routes */}
      <Route path="/analytics/dashboard" element={<AnalyticsDashboard />} />
      
      {/* Marketing routes */}
      <Route path="/marketing" element={<MarketingPage />} />
      <Route path="/marketing/brand-voice" element={<BrandVoicePage />} />
      <Route path="/marketing/campaigns" element={<CampaignsPage />} />
      <Route path="/marketing/email" element={<EmailMarketingPage />} />
      <Route path="/marketing/social" element={<SocialMediaPage />} />
      
      {/* AI Tools routes */}
      <Route path="/ai-tools" element={<AIToolsHub />} />
      <Route path="/ai-tools/rewriter" element={<AIRewriterPage />} />
      <Route path="/ai-tools/seo" element={<AISEOPage />} />
      <Route path="/ai-tools/copywriter" element={<AICopywriterPage />} />
      <Route path="/ai-tools/vision" element={<AIVisionPage />} />
      <Route path="/ai-tools/pdf-insight" element={<PDFInsightPage />} />
      
      {/* User routes */}
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/user/ai-copywriter" element={<AICopywriter />} />
      <Route path="/user/ai-rewriter" element={<AIRewriter />} />
      <Route path="/user/ai-seo-writer" element={<AISEOWriter />} />
      <Route path="/user/ai-vision" element={<AIVision />} />
      <Route path="/user/pdf-insight" element={<PDFInsight />} />
      <Route path="/user/brand-voice" element={<BrandVoice />} />
      <Route path="/user/chat-settings" element={<ChatSettings />} />
      <Route path="/user/documents" element={<Documents />} />
      <Route path="/user/favorites" element={<Favorites />} />
      <Route path="/user/integration" element={<Integration />} />
      <Route path="/user/support" element={<Support />} />
      <Route path="/user/workbook" element={<Workbook />} />
      <Route path="/user/links" element={<Links />} />
      <Route path="/user/ai-bots" element={<AIBots />} />
      <Route path="/user/ai-editor" element={<AIEditor />} />
      <Route path="/user/affiliates" element={<Affiliates />} />
      
      {/* Communication routes */}
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/team-chat" element={<TeamChatPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Automation routes */}
      <Route path="/automation/workflows" element={<Workflows />} />
      <Route path="/automation/workflow-editor" element={<WorkflowEditor />} />
      <Route path="/automation/api-connector" element={<ApiConnector />} />
      <Route path="/automation/workflow-templates" element={<WorkflowTemplates />} />
      <Route path="/automation/industry-templates" element={<IndustryTemplates />} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/api-integration" element={<AdminAPIIntegration />} />
      <Route path="/admin/chat-settings" element={<AdminChatSettings />} />
      <Route path="/admin/affiliates" element={<AdminAffiliates />} />
      <Route path="/admin/announcements" element={<AdminAnnouncements />} />
      <Route path="/admin/blog" element={<AdminBlog />} />
      <Route path="/admin/coupons" element={<AdminCoupons />} />
      <Route path="/admin/credits" element={<AdminCredits />} />
      <Route path="/admin/email-templates" element={<AdminEmailTemplates />} />
      <Route path="/admin/finance" element={<AdminFinance />} />
      <Route path="/admin/frontend" element={<AdminFrontend />} />
      <Route path="/admin/google-adsense" element={<AdminGoogleAdsense />} />
      <Route path="/admin/marketplace" element={<AdminMarketplace />} />
      <Route path="/admin/pages" element={<AdminPages />} />
      <Route path="/admin/site-health" element={<AdminSiteHealth />} />
      <Route path="/admin/support-requests" element={<AdminSupportRequests />} />
      <Route path="/admin/templates" element={<AdminTemplates />} />
      <Route path="/admin/themes" element={<AdminThemes />} />
      <Route path="/admin/user-management" element={<AdminUserManagement />} />

      {/* Module routes */}
      <Route path="/modules/crm" element={<ModuleCRM />} />
      <Route path="/modules/project-management" element={<ModuleProjectManagement />} />
      <Route path="/modules/workflow" element={<ModuleWorkflow />} />
      <Route path="/modules/funnel-creator" element={<ModuleFunnelCreator />} />

      {/* Phone system routes */}
      <Route path="/phone/ivr-system" element={<IVRSystem />} />
      <Route path="/outbound/calls" element={<OutboundCalls />} />
      
      {/* Finance routes */}
      <Route path="/finance/dashboard" element={<FinanceDashboard />} />
      <Route path="/finance/tax-calculator" element={<TaxCalculator />} />

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
