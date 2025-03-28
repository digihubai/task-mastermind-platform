
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, BookOpen, Globe, Database, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export const TrainingStep: React.FC = () => {
  const { toast } = useToast();
  const [showKnowledgeDialog, setShowKnowledgeDialog] = useState(false);
  const [showWebsiteDialog, setShowWebsiteDialog] = useState(false);
  const [showApiDialog, setShowApiDialog] = useState(false);
  
  const [knowledgeSources, setKnowledgeSources] = useState<string[]>([]);
  const [websites, setWebsites] = useState<string[]>([]);
  const [apis, setApis] = useState<string[]>([]);
  
  const [newKnowledgeSource, setNewKnowledgeSource] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newApiEndpoint, setNewApiEndpoint] = useState("");

  const handleAddKnowledgeSource = () => {
    if (newKnowledgeSource.trim()) {
      setKnowledgeSources([...knowledgeSources, newKnowledgeSource.trim()]);
      setNewKnowledgeSource("");
      toast({
        title: "Knowledge source added",
        description: "The knowledge source has been added to your chatbot.",
      });
      setShowKnowledgeDialog(false);
    }
  };

  const handleAddWebsite = () => {
    if (newWebsite.trim()) {
      setWebsites([...websites, newWebsite.trim()]);
      setNewWebsite("");
      toast({
        title: "Website added",
        description: "The website has been added for crawling.",
      });
      setShowWebsiteDialog(false);
    }
  };

  const handleAddApi = () => {
    if (newApiEndpoint.trim()) {
      setApis([...apis, newApiEndpoint.trim()]);
      setNewApiEndpoint("");
      toast({
        title: "API connection added",
        description: "The API endpoint has been added to your chatbot.",
      });
      setShowApiDialog(false);
    }
  };

  const removeKnowledgeSource = (index: number) => {
    setKnowledgeSources(knowledgeSources.filter((_, i) => i !== index));
  };

  const removeWebsite = (index: number) => {
    setWebsites(websites.filter((_, i) => i !== index));
  };

  const removeApi = (index: number) => {
    setApis(apis.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Train Your Chatbot</h2>
      <p className="text-muted-foreground">
        Train your chatbot by providing knowledge or connecting data sources.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="border transition-all hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-full">
                <BookOpen size={18} className="text-violet-600 dark:text-violet-400" />
              </div>
              <CardTitle className="text-base font-medium">Knowledge Base</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Add documents, FAQs, or other text-based knowledge</p>
            
            {knowledgeSources.length > 0 && (
              <div className="mb-3 space-y-2">
                {knowledgeSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <span className="text-sm truncate max-w-[80%]">{source}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 rounded-full"
                      onClick={() => removeKnowledgeSource(index)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowKnowledgeDialog(true)}
            >
              <PlusCircle size={16} className="mr-2" />
              Add Knowledge Source
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border transition-all hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Globe size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-base font-medium">Website Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Let the chatbot crawl your website for knowledge</p>
            
            {websites.length > 0 && (
              <div className="mb-3 space-y-2">
                {websites.map((site, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <span className="text-sm truncate max-w-[80%]">{site}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 rounded-full"
                      onClick={() => removeWebsite(index)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowWebsiteDialog(true)}
            >
              <PlusCircle size={16} className="mr-2" />
              Add Website URL
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border transition-all hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <Database size={18} className="text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-base font-medium">API Connections</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Connect to external APIs for dynamic data</p>
            
            {apis.length > 0 && (
              <div className="mb-3 space-y-2">
                {apis.map((api, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <span className="text-sm truncate max-w-[80%]">{api}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 rounded-full"
                      onClick={() => removeApi(index)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowApiDialog(true)}
            >
              <PlusCircle size={16} className="mr-2" />
              Configure API
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Knowledge Source Dialog */}
      <Dialog open={showKnowledgeDialog} onOpenChange={setShowKnowledgeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Knowledge Source</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Knowledge Source Name</label>
              <Input 
                placeholder="e.g., Company FAQ, Product Manual" 
                value={newKnowledgeSource}
                onChange={(e) => setNewKnowledgeSource(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full gap-2">
                <Upload size={16} />
                <span>Upload Document</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddKnowledgeSource}>Add Source</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Website URL Dialog */}
      <Dialog open={showWebsiteDialog} onOpenChange={setShowWebsiteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Website for Crawling</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Website URL</label>
              <Input 
                placeholder="https://example.com" 
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the full URL including https:// or http://
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddWebsite}>Add Website</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* API Configuration Dialog */}
      <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure API Connection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">API Endpoint</label>
              <Input 
                placeholder="https://api.example.com/v1/data" 
                value={newApiEndpoint}
                onChange={(e) => setNewApiEndpoint(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Authentication Type</label>
              <select className="w-full p-2 border rounded-md">
                <option>None</option>
                <option>API Key</option>
                <option>OAuth 2.0</option>
                <option>Basic Auth</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddApi}>Add API</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
