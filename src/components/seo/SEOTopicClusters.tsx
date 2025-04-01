
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, FileText, Link, Edit, Trash, Clock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { generateTopicCluster } from '@/services/seo/topicClusterService';
import { TopicCluster } from '@/services/seo/types';

const SEOTopicClusters: React.FC = () => {
  const [clusters, setClusters] = useState<TopicCluster[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCluster, setNewCluster] = useState({
    mainKeyword: '',
    additionalKeywords: ''
  });

  const handleCreateCluster = async () => {
    if (!newCluster.mainKeyword) {
      toast.error("Please enter a main keyword for your cluster");
      return;
    }

    setLoading(true);
    try {
      const additionalKeywords = newCluster.additionalKeywords
        ? newCluster.additionalKeywords.split(',').map(k => k.trim())
        : [];

      const cluster = await generateTopicCluster(newCluster.mainKeyword, additionalKeywords);
      setClusters([cluster, ...clusters]);
      
      setShowCreateDialog(false);
      setNewCluster({
        mainKeyword: '',
        additionalKeywords: ''
      });
      
      toast.success("Topic cluster created successfully");
    } catch (error) {
      console.error("Error creating topic cluster:", error);
      toast.error("Failed to create topic cluster. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Topic Clusters</h2>
          <p className="text-muted-foreground">Create and manage content clusters to build topical authority</p>
        </div>
        
        <Button onClick={() => setShowCreateDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Cluster
        </Button>
      </div>
      
      {clusters.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="bg-muted rounded-full p-4 mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No topic clusters yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Topic clusters help you organize your content around key topics to 
              build authority and improve SEO performance.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Topic Cluster
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {clusters.map(cluster => (
            <Card key={cluster.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{cluster.name}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        {cluster.mainKeyword}
                      </Badge>
                      {cluster.supportingKeywords.slice(0, 5).map((keyword, i) => (
                        <Badge key={i} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                      {cluster.supportingKeywords.length > 5 && (
                        <Badge variant="outline">
                          +{cluster.supportingKeywords.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <h3 className="font-medium mb-3">Content Pieces ({cluster.contentPieces.length})</h3>
                <div className="space-y-3">
                  {cluster.contentPieces.map((content, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          content.status === 'published' ? 'bg-green-50 text-green-600' :
                          content.status === 'draft' ? 'bg-blue-50 text-blue-600' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{content.status}</Badge>
                            {content.status === 'published' && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>Published {content.publishedDate ? new Date(content.publishedDate).toLocaleDateString() : 'N/A'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        {content.status === 'published' ? 'View' : 'Create'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <span>Created {new Date(cluster.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{
                      cluster.contentPieces.filter(c => c.status === 'published').length
                    } of {cluster.contentPieces.length} published</span>
                  </div>
                  
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Topic Cluster</DialogTitle>
            <DialogDescription>
              Enter your main keyword and supporting keywords to generate a topic cluster
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="main-keyword">Main Keyword</Label>
              <Input 
                id="main-keyword" 
                placeholder="e.g. Content Marketing"
                value={newCluster.mainKeyword}
                onChange={(e) => setNewCluster({...newCluster, mainKeyword: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="additional-keywords">Additional Keywords (optional)</Label>
              <Input 
                id="additional-keywords"
                placeholder="e.g. SEO content, blog writing, content strategy"
                value={newCluster.additionalKeywords}
                onChange={(e) => setNewCluster({...newCluster, additionalKeywords: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Enter comma-separated keywords or leave empty to auto-generate them
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateCluster} disabled={loading}>
              {loading ? 'Creating...' : 'Create Cluster'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SEOTopicClusters;
