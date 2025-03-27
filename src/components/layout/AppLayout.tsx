
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarControl } from "@/hooks/use-sidebar-control";

interface AppLayoutProps {
  children: React.ReactNode;
  defaultSidebarTheme?: "default" | "violet" | "blue" | "gray" | "dark";
  showModuleName?: boolean;
  moduleName?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  defaultSidebarTheme = "default",
  showModuleName = false,
  moduleName
}) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultTheme={defaultSidebarTheme}>
      <AppLayoutContent 
        isMobile={isMobile}
        showModuleName={showModuleName}
        moduleName={moduleName}
      >
        {children}
      </AppLayoutContent>
    </SidebarProvider>
  );
};

// Separate component to use the hook inside the SidebarProvider context
const AppLayoutContent: React.FC<{
  children: React.ReactNode;
  isMobile: boolean;
  showModuleName?: boolean;
  moduleName?: string;
}> = ({ children, isMobile, showModuleName, moduleName }) => {
  const { 
    state, 
    openMobile, 
    toggleSidebar, 
    registerSidebarKeyboardShortcut 
  } = useSidebarControl();
  
  // Set up keyboard shortcut to toggle sidebar with Alt+B
  useEffect(() => {
    const cleanup = registerSidebarKeyboardShortcut("b");
    return cleanup;
  }, [registerSidebarKeyboardShortcut]);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-background">
      <TopBar 
        toggleSidebar={toggleSidebar} 
        moduleName={showModuleName ? moduleName : undefined} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          collapsed={isMobile ? !openMobile : state === "collapsed"} 
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
        />
        
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-4 py-4 md:py-6 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
