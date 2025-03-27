
import { useCallback } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { setCookie } from "@/lib/cookies";
import { SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME } from "@/components/ui/sidebar/sidebar-context";

/**
 * A hook for controlling sidebar behavior from anywhere in the application.
 * This centralizes sidebar interactions and can be used in any component.
 */
export function useSidebarControl() {
  const sidebar = useSidebar();
  
  // Expand the sidebar
  const expandSidebar = useCallback(() => {
    if (sidebar.state === "collapsed") {
      sidebar.toggleSidebar();
    }
  }, [sidebar]);
  
  // Collapse the sidebar
  const collapseSidebar = useCallback(() => {
    if (sidebar.state === "expanded") {
      sidebar.toggleSidebar();
    }
  }, [sidebar]);
  
  // Directly set sidebar state with cookie persistence
  const setSidebarState = useCallback((newState: "expanded" | "collapsed") => {
    if (sidebar.state !== newState) {
      // Set cookie directly since this bypasses the normal toggle
      setCookie(SIDEBAR_COOKIE_NAME, newState, SIDEBAR_COOKIE_MAX_AGE);
      
      // Handle mobile toggling differently
      if (sidebar.isMobile) {
        sidebar.setOpenMobile(newState === "expanded");
      } else {
        sidebar.setOpen(newState === "expanded");
      }
    }
  }, [sidebar]);
  
  // Toggle mobile sidebar specifically
  const toggleMobileSidebar = useCallback(() => {
    sidebar.setOpenMobile(!sidebar.openMobile);
  }, [sidebar]);
  
  // Set theme with type safety
  const setSidebarTheme = useCallback((theme: typeof sidebar.theme) => {
    sidebar.setTheme(theme);
  }, [sidebar]);

  // Keyboard shortcut registration
  const registerSidebarKeyboardShortcut = useCallback((key: string = "b") => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering in input fields
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Check for keyboard shortcut (Alt+Key)
      if (e.altKey && e.key.toLowerCase() === key.toLowerCase()) {
        sidebar.toggleSidebar();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebar]);
  
  return {
    ...sidebar,
    expandSidebar,
    collapseSidebar,
    setSidebarState,
    toggleMobileSidebar,
    setSidebarTheme,
    registerSidebarKeyboardShortcut,
  };
}
