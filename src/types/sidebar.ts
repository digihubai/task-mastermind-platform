
export interface SidebarItemType {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  subItems?: SidebarItemType[];
}

export interface SidebarSectionType {
  title: string;
  items: SidebarItemType[];
}
