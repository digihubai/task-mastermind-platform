
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Edit, Settings, ExternalLink, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Pages = () => {
  const { toast } = useToast();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Pages</h1>
            <p className="text-muted-foreground mt-1">
              Manage static pages and content
            </p>
          </div>
          
          <Button 
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Create page",
                description: "Page editor will be available soon",
              });
            }}
          >
            <Plus size={18} />
            <span>New Page</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Home", slug: "/", status: "Published" },
            { title: "About Us", slug: "/about", status: "Published" },
            { title: "Services", slug: "/services", status: "Published" },
            { title: "Pricing", slug: "/pricing", status: "Published" },
            { title: "Contact", slug: "/contact", status: "Published" },
            { title: "Terms of Service", slug: "/terms", status: "Published" },
            { title: "Privacy Policy", slug: "/privacy", status: "Published" },
            { title: "FAQ", slug: "/faq", status: "Draft" }
          ].map((page, i) => (
            <Card key={i} className="border border-border/40 hover-lift">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{page.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{page.slug}</p>
                    </div>
                  </div>
                  
                  <Badge variant={page.status === "Published" ? "default" : "secondary"}>
                    {page.status}
                  </Badge>
                </div>
                
                <div className="flex justify-between mt-4 pt-4 border-t border-border/40">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => {
                      toast({
                        title: "View page",
                        description: `Viewing ${page.title} page`,
                      });
                    }}
                  >
                    <Eye size={14} />
                    <span>Preview</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => {
                      toast({
                        title: "Edit page",
                        description: `Editing ${page.title} page`,
                      });
                    }}
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          <Card className="border border-dashed border-border h-full flex items-center justify-center cursor-pointer" onClick={() => {
            toast({
              title: "Create page",
              description: "Page editor will be available soon",
            });
          }}>
            <div className="p-6 text-center">
              <div className="bg-secondary rounded-full p-3 text-primary mx-auto">
                <Plus size={24} />
              </div>
              <h3 className="font-medium mt-4">Create New Page</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Add a new static page to your website
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Pages;
