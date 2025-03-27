
import React from "react";
import {
  Bot,
  MessageSquare,
  Image,
  PenTool,
  Search,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react";
import { SidebarItemType } from "@/types/sidebar";

// AI Tools items
export const aiToolsItems = [
  { name: "AI Tools Hub", path: "/ai-tools", icon: <Bot size={20} /> },
  { name: "AI Bots", path: "/ai-bots", icon: <Bot size={20} /> },
  { name: "AI Chatbots", path: "/chatbots", icon: <MessageSquare size={20} /> },
  { name: "AI Vision", path: "/vision", icon: <Image size={20} /> },
  { name: "AI Copywriter", path: "/ai-copywriter", icon: <PenTool size={20} /> },
  { name: "AI SEO Writer", path: "/ai-seo", icon: <Search size={20} /> },
  { name: "AI ReWriter", path: "/ai-rewriter", icon: <RefreshCw size={20} /> },
  { name: "PDF Insight", path: "/pdf-insight", icon: <FileSpreadsheet size={20} /> },
];

// AI Tools section for sidebar
export const aiToolsSection = {
  title: "AI Tools",
  items: [
    {
      title: "AI Chatbot",
      href: "/chatbot",
      icon: <MessageSquare size={20} />,
    },
    {
      title: "AI Chatbots",
      href: "/chatbots",
      icon: <MessageSquare size={20} />,
    },
    {
      title: "AI Vision",
      href: "/vision",
      icon: <Image size={20} />,
    },
    {
      title: "AI Copywriter",
      href: "/ai-copywriter",
      icon: <PenTool size={20} />,
    },
    {
      title: "AI SEO Writer",
      href: "/ai-seo",
      icon: <Search size={20} />,
    },
    {
      title: "AI Rewriter",
      href: "/ai-rewriter",
      icon: <RefreshCw size={20} />,
    },
    {
      title: "PDF Insight",
      href: "/pdf-insight",
      icon: <FileSpreadsheet size={20} />,
    },
  ] as SidebarItemType[],
};
