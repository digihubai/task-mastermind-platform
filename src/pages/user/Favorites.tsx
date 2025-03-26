
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Star, 
  Edit, 
  Trash2, 
  FileText, 
  MessageSquare, 
  PenTool,
  Image,
  ExternalLink,
  Bot,
  Pencil,
  Search,
  RefreshCw
} from "lucide-react";

const Favorites = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Favorites</h1>
          <p className="text-muted-foreground mt-1">
            Quick access to your favorited items
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Heart size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Favorites</p>
                <h3 className="text-2xl font-semibold">12</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <h3 className="text-2xl font-semibold">5</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <Bot size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">AI Bots</p>
                <h3 className="text-2xl font-semibold">3</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-border/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Pencil size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Templates</p>
                <h3 className="text-2xl font-semibold">4</h3>
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 border border-border/40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recently Favorited</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  <h4 className="font-medium">Project Proposal</h4>
                </div>
                <Heart size={16} className="text-rose-500 fill-rose-500" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Document template for client proposals</p>
              <Button variant="outline" size="sm" className="w-full">Open</Button>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-purple-600" />
                  <h4 className="font-medium">Sales Assistant</h4>
                </div>
                <Heart size={16} className="text-rose-500 fill-rose-500" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">AI bot for generating sales responses</p>
              <Button variant="outline" size="sm" className="w-full">Open</Button>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-green-600" />
                  <h4 className="font-medium">SEO Template</h4>
                </div>
                <Heart size={16} className="text-rose-500 fill-rose-500" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Optimized content structure for blogs</p>
              <Button variant="outline" size="sm" className="w-full">Open</Button>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bot size={20} className="text-primary" />
              </div>
              <h3 className="font-medium">Favorite Bots</h3>
            </div>
            
            <div className="space-y-3">
              {['Customer Support Bot', 'Content Creator', 'Data Analyzer'].map((bot, i) => (
                <div key={i} className="flex justify-between items-center p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Bot size={14} />
                    <span className="text-sm">{bot}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <ExternalLink size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <RefreshCw size={20} className="text-primary" />
              </div>
              <h3 className="font-medium">Favorite Templates</h3>
            </div>
            
            <div className="space-y-3">
              {['Email Template', 'Blog Post', 'Product Description', 'Social Media Post'].map((template, i) => (
                <div key={i} className="flex justify-between items-center p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <RefreshCw size={14} />
                    <span className="text-sm">{template}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <ExternalLink size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 border border-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Image size={20} className="text-primary" />
              </div>
              <h3 className="font-medium">Favorite Media</h3>
            </div>
            
            <div className="space-y-3">
              {['Banner Image', 'Logo Design', 'Product Photo'].map((media, i) => (
                <div key={i} className="flex justify-between items-center p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Image size={14} />
                    <span className="text-sm">{media}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <ExternalLink size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Favorites;
