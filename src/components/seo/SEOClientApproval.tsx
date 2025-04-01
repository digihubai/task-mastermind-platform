
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X, MessageSquare, FileText, Clock, User, SendHorizontal, ThumbsUp, AlertTriangle, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { ContentApproval } from '@/services/seo/types';
import { getClientContent, addContentComment, updateContentStatus } from '@/services/seo/clientApprovalService';

const SEOClientApproval: React.FC = () => {
  const [approvals, setApprovals] = useState<ContentApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedContent, setSelectedContent] = useState<ContentApproval | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await getClientContent('client123'); // In production, use the actual client ID
      setApprovals(data);
    } catch (error) {
      console.error("Error loading content approvals:", error);
      toast.error("Failed to load content approvals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedContent) return;
    
    try {
      await updateContentStatus(selectedContent.id, 'approved');
      
      if (comment) {
        await addContentComment(
          selectedContent.id,
          'admin123',
          'Admin User',
          'admin',
          comment
        );
      }
      
      // Update the local state
      setApprovals(approvals.map(approval => 
        approval.id === selectedContent.id 
          ? { ...approval, status: 'approved' }
          : approval
      ));
      
      setShowApprovalDialog(false);
      setComment('');
      toast.success("Content approved successfully");
    } catch (error) {
      console.error("Error approving content:", error);
      toast.error("Failed to approve content. Please try again.");
    }
  };

  const handleReject = async () => {
    if (!selectedContent || !comment) {
      toast.error("Please provide feedback when rejecting content");
      return;
    }
    
    try {
      await updateContentStatus(selectedContent.id, 'rejected');
      
      await addContentComment(
        selectedContent.id,
        'admin123',
        'Admin User',
        'admin',
        comment
      );
      
      // Update the local state
      setApprovals(approvals.map(approval => 
        approval.id === selectedContent.id 
          ? { 
              ...approval, 
              status: 'rejected',
              comments: [
                ...approval.comments,
                {
                  id: `comment_${Date.now()}`,
                  contentId: approval.id,
                  userId: 'admin123',
                  userName: 'Admin User',
                  userRole: 'admin',
                  comment: comment,
                  timestamp: new Date().toISOString()
                }
              ] 
            }
          : approval
      ));
      
      setShowRejectionDialog(false);
      setComment('');
      toast.success("Content rejected with feedback");
    } catch (error) {
      console.error("Error rejecting content:", error);
      toast.error("Failed to reject content. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rejected</Badge>;
      case 'published':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Published</Badge>;
      case 'pending_approval':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending Approval</Badge>;
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  const filteredApprovals = {
    all: approvals,
    pending: approvals.filter(a => a.status === 'pending_approval'),
    approved: approvals.filter(a => a.status === 'approved'),
    rejected: approvals.filter(a => a.status === 'rejected'),
    published: approvals.filter(a => a.status === 'published')
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Client Content Approvals</h2>
          <p className="text-muted-foreground">Manage content approvals and feedback from clients</p>
        </div>
        
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Preview as Client
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Approval
            <Badge variant="secondary" className="ml-2">
              {filteredApprovals.pending.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {loading ? (
            <Card>
              <CardContent className="flex justify-center items-center py-8">
                <p className="text-muted-foreground">Loading content approvals...</p>
              </CardContent>
            </Card>
          ) : filteredApprovals[activeTab].length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No {activeTab} content</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  {activeTab === 'pending' 
                    ? "No content is currently waiting for approval." 
                    : `No ${activeTab} content is available.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredApprovals[activeTab].map((content) => (
                <Card key={content.id} className="overflow-hidden">
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{content.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{content.contentType}</Badge>
                          {getStatusBadge(content.status)}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(content.updatedAt).toLocaleDateString()}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">
                              {content.comments.length} comments
                            </span>
                          </span>
                        </CardDescription>
                      </div>
                      
                      {content.status === 'pending_approval' && (
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              setSelectedContent(content);
                              setShowRejectionDialog(true);
                            }}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => {
                              setSelectedContent(content);
                              setShowApprovalDialog(true);
                            }}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      )}
                      
                      {content.status === 'approved' && (
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Publish
                        </Button>
                      )}
                      
                      {content.status === 'rejected' && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Revise
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="prose prose-sm max-w-none line-clamp-3 mb-4">
                      <div dangerouslySetInnerHTML={{ 
                        __html: content.content.length > 300 
                          ? content.content.substring(0, 300) + '...' 
                          : content.content 
                      }} />
                    </div>
                    
                    {content.comments.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium mb-3">Recent Comments</h4>
                        <div className="space-y-4">
                          {content.comments.slice(-2).map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {comment.userName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{comment.userName}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {comment.userRole === 'admin' ? 'Team' : 'Client'}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(comment.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.comment}</p>
                              </div>
                            </div>
                          ))}
                          
                          {content.comments.length > 2 && (
                            <Button variant="ghost" size="sm" className="w-full">
                              View all {content.comments.length} comments
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Tabs>
      
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center">
                <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                Approve Content
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="font-medium mb-3">
              {selectedContent?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add an optional comment with your approval
            </p>
            
            <Textarea 
              placeholder="Great work! The content looks good and is ready for publication."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>Cancel</Button>
            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              <Check className="mr-2 h-4 w-4" />
              Approve Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Reject Content
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="font-medium mb-3">
              {selectedContent?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please provide feedback on why the content is being rejected
            </p>
            
            <Textarea 
              placeholder="This content needs revisions. Please address the following issues..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleReject} 
              variant="destructive"
              disabled={!comment}
            >
              <X className="mr-2 h-4 w-4" />
              Reject With Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SEOClientApproval;
