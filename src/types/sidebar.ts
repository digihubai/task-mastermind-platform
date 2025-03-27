
import React from "react";

export interface SidebarItemType {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  subItems?: SidebarItemType[];
}

export interface SidebarSectionType {
  title: string;
  items: SidebarItemType[];
}
