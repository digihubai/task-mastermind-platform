
"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { getCookie, setCookie } from "@/lib/cookies"
import { cn } from "@/lib/utils"
import { SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SidebarContext, SidebarTheme } from "./sidebar-context"

export type SidebarProviderProps = {
  defaultState?: "expanded" | "collapsed"
  defaultTheme?: SidebarTheme
  children: React.ReactNode
}

export function SidebarProvider({
  defaultState = "expanded",
  defaultTheme = "default",
  children,
}: SidebarProviderProps) {
  const [theme, setTheme] = React.useState<SidebarTheme>(defaultTheme)
  const [state, setState] = React.useState<"expanded" | "collapsed">(() => {
    const storedState = getCookie(SIDEBAR_COOKIE_NAME)
    return storedState === "expanded" || storedState === "collapsed"
      ? storedState
      : defaultState
  })
  const [open, setOpen] = React.useState(false)
  const [openMobile, setOpenMobile] = React.useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const toggleSidebar = React.useCallback(() => {
    const newState = state === "expanded" ? "collapsed" : "expanded"
    setState(newState)
    setCookie(SIDEBAR_COOKIE_NAME, newState, SIDEBAR_COOKIE_MAX_AGE)
  }, [state])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [
      theme,
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    ]
  )

  const themeClassName = React.useMemo(() => {
    switch (theme) {
      case "violet":
        return "sidebar-theme-violet"
      case "blue":
        return "sidebar-theme-blue"
      case "gray":
        return "sidebar-theme-gray"
      case "dark":
        return "sidebar-theme-dark"
      default:
        return "sidebar-theme-default"
    }
  }, [theme])

  return (
    <SidebarContext.Provider value={value}>
      <div className={cn("min-h-screen w-full", themeClassName)}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
