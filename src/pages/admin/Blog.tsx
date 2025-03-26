
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus, FileText, Calendar, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const { toast } = useToast();
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
            <p className="text-muted-foreground mt-1">
              Manage blog content and articles
            </p>
          </div>
          
          <Button 
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Create blog post",
                description: "Blog post editor will be available soon",
              });
            }}
          >
            <Plus size={18} />
            <span>New Post</span>
          </Button>
        </div>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="posts" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="flex flex-col border border-border/40 overflow-hidden hover-lift">
                    <div className="h-40 bg-secondary/40"></div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar size={14} />
                        <span>July {10 + i}, 2023</span>
                        <User size={14} className="ml-2" />
                        <span>Admin</span>
                      </div>
                      <h3 className="font-medium mb-2">Getting Started with AI Assistants</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">
                        Learn how to set up and configure your first AI assistant for your business needs.
                      </p>
                      <div className="flex justify-between mt-auto">
                        <Button variant="ghost" size="sm">Preview</Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit size={14} />
                          <span>Edit</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Card className="border border-dashed border-border h-full flex items-center justify-center cursor-pointer" onClick={() => {
                  toast({
                    title: "Create blog post",
                    description: "Blog post editor will be available soon",
                  });
                }}>
                  <div className="p-6 text-center">
                    <div className="bg-secondary rounded-full p-3 text-primary mx-auto">
                      <Plus size={24} />
                    </div>
                    <h3 className="font-medium mt-4">Create New Post</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Add a new blog post to your website
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["AI Tools", "Tutorials", "News", "Case Studies"].map((category) => (
                  <Card key={category} className="p-6 border border-border/40">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{category}</h3>
                        <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 10) + 1} posts</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-4">
              <Card className="border border-border/40">
                <div className="p-4">
                  <h3 className="font-medium mb-4">Recent Comments</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">John Doe</span>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Great article! This was exactly what I needed to get started with my AI assistant.
                        </p>
                        <p className="text-xs">On: Getting Started with AI Assistants</p>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button variant="ghost" size="sm">Reply</Button>
                          <Button variant="ghost" size="sm">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Blog;
