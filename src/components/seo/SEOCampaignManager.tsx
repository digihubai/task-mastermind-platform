
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SEOCampaign } from '@/services/seo/types';
import { fetchSEOCampaigns } from '@/services/seo/campaignService';
import { Target, BarChart3, Globe, PlusCircle, ArrowRight, Calendar, ChevronDown, Loader } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const SEOCampaignManager: React.FC = () => {
  const [campaigns, setCampaigns] = useState<SEOCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    keywordCount: 10,
    pageCount: 4,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: ''
  });

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const data = await fetchSEOCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error("Error loading campaigns:", error);
      toast.error("Failed to load SEO campaigns. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name) {
      toast.error("Campaign name required. Please enter a name for your SEO campaign.");
      return;
    }

    setLoading(true);
    try {
      // In a real implementation, we would call the API to create the campaign
      const mockCampaign: SEOCampaign = {
        id: Math.random().toString(36).substring(2, 11),
        name: newCampaign.name,
        keywordCount: newCampaign.keywordCount,
        pageCount: newCampaign.pageCount,
        status: "active",
        startDate: newCampaign.startDate,
        endDate: newCampaign.endDate || null,
        metrics: {
          backlinks: Math.floor(Math.random() * 100),
          avgPosition: Math.floor(Math.random() * 10) + 1
        },
        userId: "user123"
      };
      
      setCampaigns([mockCampaign, ...campaigns]);
      setShowNewCampaignDialog(false);
      setNewCampaign({
        name: '',
        keywordCount: 10,
        pageCount: 4,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: ''
      });
      
      toast.success("Campaign created successfully.");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "active": 
        return "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400";
      case "in_progress": 
        return "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400";
      case "completed": 
        return "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400";
      default: 
        return "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case "active": return "Active";
      case "in_progress": return "In Progress";
      case "completed": return "Completed";
      default: return "Inactive";
    }
  };

  const handleViewCampaignDetails = (campaignId: string) => {
    toast.info(`Viewing details for campaign ${campaignId}`);
    // In a real app, we would navigate to the campaign details page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">SEO Campaigns</h2>
          <p className="text-muted-foreground">Manage your SEO campaigns and track their performance</p>
        </div>
        
        <Button onClick={() => setShowNewCampaignDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          {renderCampaigns(campaigns.filter(c => c.status === "active" || c.status === "in_progress"))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-4">
          {renderCampaigns(campaigns.filter(c => c.status === "completed"))}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {renderCampaigns(campaigns)}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New SEO Campaign</DialogTitle>
            <DialogDescription>
              Create a new SEO campaign to track and optimize your content
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input 
                id="campaign-name" 
                placeholder="Q4 Product Landing Pages" 
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="keyword-count">Number of Keywords</Label>
                <Input 
                  id="keyword-count" 
                  type="number" 
                  min={1}
                  placeholder="10" 
                  value={newCampaign.keywordCount}
                  onChange={(e) => setNewCampaign({...newCampaign, keywordCount: parseInt(e.target.value) || 10})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="page-count">Number of Pages</Label>
                <Input 
                  id="page-count" 
                  type="number"
                  min={1}
                  placeholder="4" 
                  value={newCampaign.pageCount}
                  onChange={(e) => setNewCampaign({...newCampaign, pageCount: parseInt(e.target.value) || 4})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input 
                  id="start-date" 
                  type="date" 
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date (Optional)</Label>
                <Input 
                  id="end-date" 
                  type="date" 
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCampaignDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateCampaign} disabled={loading}>
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  function renderCampaigns(campaignList: SEOCampaign[]) {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }
    
    if (campaignList.length === 0) {
      return (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No campaigns found</p>
            <Button 
              variant="outline" 
              onClick={() => setShowNewCampaignDialog(true)}
            >
              <PlusCircle size={16} className="mr-2" />
              Create your first campaign
            </Button>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <div className="space-y-4">
        {campaignList.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">{campaign.name}</h3>
                      <Badge className={getStatusBadgeClass(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {campaign.keywordCount} keywords • {campaign.pageCount} pages
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span>Started: {new Date(campaign.startDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Globe size={14} className="text-muted-foreground" />
                    <span>Position: {campaign.metrics.avgPosition}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart3 size={14} className="text-muted-foreground" />
                    <span>{campaign.metrics.backlinks} backlinks</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 pt-4 border-t">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewCampaignDetails(campaign.id)}
                  className="gap-1"
                >
                  View details <ArrowRight size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
};

export default SEOCampaignManager;
