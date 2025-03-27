import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import {
  PenTool,
  Edit,
  FileText,
  Image,
  FileSpreadsheet,
  Bot,
  Sparkles,
  Globe,
  Headphones,
  MessageSquare
} from "lucide-react";

import AIToolHeader from "@/components/ai/AIToolHeader";
import AIToolSearch from "@/components/ai/AIToolSearch";
import AIToolCategoryFilter from "@/components/ai/AIToolCategoryFilter";
import AIToolGrid from "@/components/ai/AIToolGrid";
import AIToolRecentUsage from "@/components/ai/AIToolRecentUsage";

const AIToolsHub = () => {
  const navigate = useNavigate();
  
  const aiTools = [
    {
      id: "copywriter",
      name: "AI Copywriter",
      description: "Generate marketing copy, product descriptions, and ad content",
      icon: <PenTool className="h-6 w-6" />,
      path: "/ai-copywriter",
      category: "Content",
      badge: "Popular",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      id: "seo-writer",
      name: "AI SEO Writer",
      description: "Create SEO-optimized content that ranks well on search engines",
      icon: <Globe className="h-6 w-6" />,
      path: "/ai-seo",
      category: "Content",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    },
    {
      id: "rewriter",
      name: "AI Rewriter",
      description: "Rewrite and improve content with different tones and styles",
      icon: <Edit className="h-6 w-6" />,
      path: "/ai-rewriter",
      category: "Content",
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
    },
    {
      id: "vision",
      name: "AI Vision",
      description: "Analyze images, generate image descriptions, and visual content",
      icon: <Image className="h-6 w-6" />,
      path: "/ai-vision",
      category: "Media",
      badge: "New",
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
    },
    {
      id: "pdf-insight",
      name: "PDF Insight",
      description: "Extract and analyze information from PDF documents",
      icon: <FileSpreadsheet className="h-6 w-6" />,
      path: "/pdf-insight",
      category: "Documents",
      color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
    },
    {
      id: "chatbot",
      name: "AI Chatbot",
      description: "Create custom chatbots for your website or application",
      icon: <Bot className="h-6 w-6" />,
      path: "/chatbot",
      category: "Automation",
      badge: "Popular",
      color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
    },
    {
      id: "brand-voice",
      name: "Brand Voice",
      description: "Develop and maintain a consistent brand voice across all content",
      icon: <Headphones className="h-6 w-6" />,
      path: "/brand-voice",
      category: "Content",
      color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
    },
    {
      id: "conversation-ai",
      name: "Conversation AI",
      description: "Create realistic AI conversations for customer support",
      icon: <MessageSquare className="h-6 w-6" />,
      path: "/conversation-ai",
      category: "Automation",
      badge: "Coming Soon",
      color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
    },
    {
      id: "product-descriptions",
      name: "Product Descriptions",
      description: "Generate compelling product descriptions for e-commerce",
      icon: <FileText className="h-6 w-6" />,
      path: "/product-descriptions",
      category: "Content",
      badge: "Coming Soon",
      color: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400"
    },
    {
      id: "content-enhancer",
      name: "Content Enhancer",
      description: "Expand, improve, and add more depth to existing content",
      icon: <Sparkles className="h-6 w-6" />,
      path: "/content-enhancer",
      category: "Content",
      badge: "Coming Soon",
      color: "bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-600 dark:text-fuchsia-400"
    }
  ];
  
  const categories = [
    { id: "all", name: "All Tools" },
    { id: "content", name: "Content" },
    { id: "media", name: "Media" },
    { id: "documents", name: "Documents" },
    { id: "automation", name: "Automation" }
  ];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  const handleToolClick = (path: string) => {
    if (path === "/ai-rewriter") {
      navigate("/ai-rewriter");
      return;
    }
    if (path === "/ai-seo") {
      navigate("/ai-seo");
      return;
    }
    if (path.includes("coming-soon")) {
      return;
    }
    navigate(path);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <AIToolHeader 
          title="AI Tools" 
          description="Powerful AI-powered tools to enhance your productivity" 
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <AIToolSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <AIToolCategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>
        
        <AIToolGrid tools={filteredTools} onToolClick={handleToolClick} />
        
        <AIToolRecentUsage />
      </div>
    </AppLayout>
  );
};

export default AIToolsHub;
