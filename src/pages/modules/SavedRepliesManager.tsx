import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search, Edit, Trash2, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { SavedReply } from "@/components/communication/mock-data/saved-replies";
import { mockSavedReplies } from "@/components/communication/mock-data/saved-replies";

const SavedRepliesManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [savedReplies, setSavedReplies] = useState<SavedReply[]>(mockSavedReplies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReply, setCurrentReply] = useState<SavedReply | null>(null);
  const [newReply, setNewReply] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState("");

  // Get unique categories
  const categories = Array.from(new Set(savedReplies.map(reply => reply.category)));

  const filteredReplies = savedReplies.filter(reply => {
    const matchesSearch = searchQuery === "" || 
      reply.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reply.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === null || reply.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddReply = () => {
    setIsEditing(false);
    setCurrentReply(null);
    setNewReply({
      title: "",
      content: "",
      category: "",
      tags: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditReply = (reply: SavedReply) => {
    setIsEditing(true);
    setCurrentReply(reply);
    setNewReply({
      title: reply.title,
      content: reply.content,
      category: reply.category,
      tags: [...reply.tags],
    });
    setIsDialogOpen(true);
  };

  const handleDeleteReply = (id: string) => {
    setSavedReplies(savedReplies.filter(reply => reply.id !== id));
    toast({
      title: "Reply deleted",
      description: "The saved reply has been removed"
    });
  };

  const handleSaveReply = () => {
    if (!newReply.title || !newReply.content || !newReply.category) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && currentReply) {
      setSavedReplies(savedReplies.map(reply => 
        reply.id === currentReply.id 
          ? { ...reply, ...newReply }
          : reply
      ));
      toast({
        title: "Reply updated",
        description: "Your saved reply has been updated"
      });
    } else {
      const newId = `reply-${Date.now()}`;
      const currentDate = new Date().toISOString();
      setSavedReplies([
        ...savedReplies,
        {
          id: newId,
          ...newReply,
          createdAt: currentDate
        }
      ]);
      toast({
        title: "Reply created",
        description: "Your new saved reply has been added"
      });
    }
    setIsDialogOpen(false);
  };

  const handleAddTag = () => {
    if (newTag && !newReply.tags.includes(newTag)) {
      setNewReply({
        ...newReply,
        tags: [...newReply.tags, newTag]
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewReply({
      ...newReply,
      tags: newReply.tags.filter(t => t !== tag)
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Saved Replies</h1>
            <p className="text-muted-foreground mt-1">
              Manage your canned responses for quicker customer communication
            </p>
          </div>
          
          <Button 
            onClick={handleAddReply}
            className="flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>New Reply</span>
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search replies..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-2">
                <div className="space-y-1">
                  <button
                    className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${activeCategory === null ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    onClick={() => setActiveCategory(null)}
                  >
                    All Categories
                  </button>
                  
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Replies</TabsTrigger>
                    <TabsTrigger value="recent">Recently Used</TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {filteredReplies.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No saved replies found. Create one to get started.</p>
                      </div>
                    ) : (
                      filteredReplies.map((reply) => (
                        <Card key={reply.id} className="overflow-hidden">
                          <div className="p-4 space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium">{reply.title}</h3>
                              <div className="flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleEditReply(reply)}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteReply(reply.id)}
                                >
                                  <Trash2 size={16} className="text-destructive" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Category: {reply.category}
                            </div>
                            <div className="text-sm border rounded-md p-2 bg-muted/30">
                              {reply.content}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {reply.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                  
                  <TabsContent value="recent">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Recent usage tracking will be available soon.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="favorites">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Favorite replies feature will be available soon.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Saved Reply" : "Create New Reply"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Reply title" 
                  value={newReply.title}
                  onChange={(e) => setNewReply({...newReply, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  placeholder="e.g. Greetings" 
                  value={newReply.category}
                  onChange={(e) => setNewReply({...newReply, category: e.target.value})}
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map(category => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                placeholder="Reply content..."
                value={newReply.content}
                onChange={(e) => setNewReply({...newReply, content: e.target.value})}
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add tag..." 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button type="button" onClick={handleAddTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {newReply.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-muted rounded-full w-4 h-4 inline-flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveReply}>{isEditing ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default SavedRepliesManager;
