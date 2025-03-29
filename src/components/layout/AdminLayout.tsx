
import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Palette, 
  Users, 
  Bell, 
  DollarSign, 
  LifeBuoy,
  FileText, 
  MessageSquare, 
  Globe, 
  PiggyBank, 
  FileCode, 
  BookOpen, 
  Share2, 
  Tag, 
  Mail, 
  FileJson,
  Settings, 
  Activity, 
  Sparkles, 
  Coins,
  ArrowLeft
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useRoleBasedSettings from "@/hooks/use-role-based-settings";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, description }) => {
  const { userRole } = useRoleBasedSettings();
  const location = useLocation();
  const navigate = useNavigate();

  // Only super_admin and admin can access admin pages
  const isAuthorized = userRole === "super_admin" || userRole === "admin";

  React.useEffect(() => {
    if (!isAuthorized) {
      toast.error("You don't have permission to access admin pages");
      navigate("/dashboard");
    }
  }, [isAuthorized, navigate]);

  const menuItems = [
    { path: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { path: "/admin/marketplace", icon: <ShoppingBag size={18} />, label: "Marketplace" },
    { path: "/admin/themes", icon: <Palette size={18} />, label: "Themes" },
    { path: "/admin/user-management", icon: <Users size={18} />, label: "User Management" },
    { path: "/admin/announcements", icon: <Bell size={18} />, label: "Announcements" },
    { path: "/admin/google-adsense", icon: <DollarSign size={18} />, label: "Google Adsense" },
    { path: "/admin/support-requests", icon: <LifeBuoy size={18} />, label: "Support Requests" },
    { path: "/admin/templates", icon: <FileText size={18} />, label: "Templates" },
    { path: "/admin/chat-settings", icon: <MessageSquare size={18} />, label: "Chat Settings" },
    { path: "/admin/frontend", icon: <Globe size={18} />, label: "Frontend" },
    { path: "/admin/finance", icon: <PiggyBank size={18} />, label: "Finance" },
    { path: "/admin/pages", icon: <FileCode size={18} />, label: "Pages" },
    { path: "/admin/blog", icon: <BookOpen size={18} />, label: "Blog" },
    { path: "/admin/affiliates", icon: <Share2 size={18} />, label: "Affiliates" },
    { path: "/admin/coupons", icon: <Tag size={18} />, label: "Coupons" },
    { path: "/admin/email-templates", icon: <Mail size={18} />, label: "Email Templates" },
    { path: "/admin/api-integration", icon: <FileJson size={18} />, label: "API Integration" },
    { path: "/admin/settings", icon: <Settings size={18} />, label: "Settings" },
    { path: "/admin/site-health", icon: <Activity size={18} />, label: "Site Health" },
    { path: "/admin/ai-settings", icon: <Sparkles size={18} className="text-purple-500" />, label: "AI Settings" },
    { path: "/admin/credits", icon: <Coins size={18} />, label: "Credits" },
  ];

  return (
    <AppLayout>
      <div className="container py-6 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Admin Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Card className="p-2">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {isAuthorized ? children : (
              <Card className="p-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                  <p className="text-muted-foreground mb-4">
                    You don't have permission to access admin pages.
                  </p>
                  <Button onClick={() => navigate("/dashboard")}>
                    Return to Dashboard
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminLayout;
