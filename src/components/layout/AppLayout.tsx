
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-background">
      <TopBar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          collapsed={isMobile ? !mobileSidebarOpen : sidebarCollapsed} 
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
        />
        
        <main className={`flex-1 overflow-auto transition-all duration-300 ease-in-out`}>
          <div className="container mx-auto px-4 py-4 md:py-6 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
