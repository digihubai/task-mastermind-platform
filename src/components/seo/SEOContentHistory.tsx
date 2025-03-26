
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Copy, 
  ExternalLink,
  ArrowUpRight,
  FileText
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const mockHistoryItems = [
  {
    id: "c1",
    title: "10 Ways AI Chatbots Are Revolutionizing Customer Support",
    date: "2023-09-15T10:30:00Z",
    status: "published",
    platform: "WordPress",
    keywords: ["ai", "chatbot", "customer support"],
    wordCount: 1245,
    seoScore: 87,
    url: "https://example.com/blog/ai-chatbots"
  },
  {
    id: "c2",
    title: "The Ultimate Guide to SEO Content Writing in 2023",
    date: "2023-09-10T14:45:00Z",
    status: "draft",
    platform: "Local",
    keywords: ["seo", "content writing", "guide"],
    wordCount: 2130,
    seoScore: 92,
    url: null
  },
  {
    id: "c3",
    title: "How to Implement AI Solutions for Small Businesses",
    date: "2023-09-05T09:15:00Z",
    status: "published",
    platform: "Wix",
    keywords: ["ai", "small business", "implementation"],
    wordCount: 1750,
    seoScore: 84,
    url: "https://example.com/blog/ai-small-business"
  },
  {
    id: "c4",
    title: "Machine Learning vs. Deep Learning: What's the Difference?",
    date: "2023-08-27T11:20:00Z",
    status: "draft",
    platform: "Local",
    keywords: ["machine learning", "deep learning", "ai"],
    wordCount: 1890,
    seoScore: 89,
    url: null
  }
];

const SEOContentHistory: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    }).format(date);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "draft":
        return <Badge className="bg-amber-100 text-amber-800">Draft</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "WordPress":
        return <Badge className="bg-blue-100 text-blue-800">{platform}</Badge>;
      case "Wix":
        return <Badge className="bg-purple-100 text-purple-800">{platform}</Badge>;
      case "Shopify":
        return <Badge className="bg-green-100 text-green-800">{platform}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{platform}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold">Content History</h2>
        
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Search content..." className="pl-9" />
          </div>
          
          <select className="px-3 py-2 rounded-md border bg-background">
            <option value="all">All Platforms</option>
            <option value="wordpress">WordPress</option>
            <option value="wix">Wix</option>
            <option value="shopify">Shopify</option>
            <option value="local">Local Only</option>
          </select>
        </div>
      </div>
      
      <Card className="border border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Title</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Platform</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Words</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">SEO Score</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockHistoryItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <FileText size={18} className="text-muted-foreground mr-2" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{formatDate(item.date)}</td>
                  <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                  <td className="py-3 px-4">{getPlatformBadge(item.platform)}</td>
                  <td className="py-3 px-4">{item.wordCount}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-secondary rounded-full mr-2">
                        <div 
                          className={`h-full rounded-full ${
                            item.seoScore >= 90 ? "bg-green-500" : 
                            item.seoScore >= 80 ? "bg-blue-500" : 
                            item.seoScore >= 70 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${item.seoScore}%` }}
                        ></div>
                      </div>
                      <span>{item.seoScore}/100</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-1">
                      <Button variant="ghost" size="icon">
                        <Edit size={16} />
                      </Button>
                      
                      {item.url && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <ArrowUpRight size={16} />
                          </a>
                        </Button>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <Copy size={16} className="mr-2" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <ExternalLink size={16} className="mr-2" /> Export
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center text-red-500">
                            <Trash2 size={16} className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SEOContentHistory;
