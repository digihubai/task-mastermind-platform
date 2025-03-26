
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  PenTool,
  Edit,
  FileText,
  Image,
  FileSpreadsheet,
  Zap,
  Bot,
  Sparkles,
  Globe,
  Headphones,
  MessageSquare,
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");
  
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  const handleToolClick = (path: string) => {
    if (path.includes("coming-soon")) {
      return;
    }
    navigate(path);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">AI Tools</h1>
          <p className="text-muted-foreground mt-1">
            Powerful AI-powered tools to enhance your productivity
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search AI tools..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className={`hover-lift border border-border/40 p-6 cursor-pointer ${
                tool.badge === "Coming Soon" ? "opacity-80" : ""
              }`}
              onClick={() => handleToolClick(tool.path)}
            >
              <div className="flex gap-4">
                <div className={`${tool.color} p-3 rounded-full`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{tool.name}</h3>
                    {tool.badge && (
                      <Badge variant="outline" className={
                        tool.badge === "New" 
                          ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                          : tool.badge === "Popular"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400"
                      }>
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-muted-foreground">{tool.category}</span>
                    {tool.badge !== "Coming Soon" && (
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <span>Use Tool</span>
                        <Zap size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Usage</h2>
          <Card className="border border-border/40 p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 last:pb-0 last:border-0 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      i === 1 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" :
                      i === 2 ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" :
                      "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    }`}>
                      {i === 1 ? <PenTool size={16} /> : 
                       i === 2 ? <Image size={16} /> : 
                       <Bot size={16} />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {i === 1 ? "Created marketing copy" : 
                         i === 2 ? "Generated product images" : 
                         "Trained customer service chatbot"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i === 1 ? "AI Copywriter" : 
                         i === 2 ? "AI Vision" : 
                         "AI Chatbot"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-muted-foreground">
                      {i === 1 ? "2 hours ago" : 
                       i === 2 ? "Yesterday" : 
                       "3 days ago"}
                    </p>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIToolsHub;
