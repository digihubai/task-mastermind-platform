
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Loader, Calendar, Clock } from "lucide-react";
import { toast } from 'sonner';

interface PublishToCMSDialogProps {
  isOpen: boolean;
  onClose: () => void;
  seoData: any;
}

const PublishToCMSDialog: React.FC<PublishToCMSDialogProps> = ({ isOpen, onClose, seoData }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMode, setPublishMode] = useState('now');
  const [selectedPlatform, setSelectedPlatform] = useState('wordpress');
  const [categoryValue, setCategoryValue] = useState('');
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [scheduledTime, setScheduledTime] = useState('12:00');
  const [includeFeaturedImage, setIncludeFeaturedImage] = useState(true);
  const [enableComments, setEnableComments] = useState(true);
  const [addTags, setAddTags] = useState(true);
  
  const handlePublish = () => {
    if (publishMode === 'schedule' && (!scheduledDate || !scheduledTime)) {
      toast.error("Please select both date and time for scheduled publishing");
      return;
    }
    
    setIsPublishing(true);
    
    // Simulate publishing to CMS
    setTimeout(() => {
      setIsPublishing(false);
      
      let message = "";
      if (publishMode === 'now') {
        message = `Content published to ${selectedPlatform} successfully!`;
      } else if (publishMode === 'schedule') {
        message = `Content scheduled for publication on ${scheduledDate} at ${scheduledTime}`;
      } else {
        message = `Content saved as draft on ${selectedPlatform}`;
      }
      
      toast.success(message);
      onClose();
    }, 2000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publish to CMS</DialogTitle>
          <DialogDescription>
            Publish your SEO content to your content management system
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="platform" className="text-right">
              Platform
            </Label>
            <Select 
              value={selectedPlatform} 
              onValueChange={setSelectedPlatform}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wordpress">WordPress</SelectItem>
                <SelectItem value="shopify">Shopify Blog</SelectItem>
                <SelectItem value="webflow">Webflow</SelectItem>
                <SelectItem value="ghost">Ghost</SelectItem>
                <SelectItem value="contentful">Contentful</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={seoData.selectedTitle}
              className="col-span-3"
              readOnly
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              placeholder="e.g., Marketing, Technology"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <Tabs defaultValue={publishMode} className="w-full" onValueChange={setPublishMode}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Publish</Label>
              <div className="col-span-3">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="now">Publish Now</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="draft">Save as Draft</TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="schedule" className="pt-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-1"></div>
                <div className="col-span-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="schedule-date" className="text-sm">Date</Label>
                  </div>
                  <Input
                    id="schedule-date"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="schedule-time" className="text-sm">Time</Label>
                  </div>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-4 items-start gap-4 pt-2">
            <Label className="text-right pt-2">Options</Label>
            <div className="col-span-3 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured-image" 
                  checked={includeFeaturedImage}
                  onCheckedChange={() => setIncludeFeaturedImage(!includeFeaturedImage)}
                />
                <label 
                  htmlFor="featured-image" 
                  className="text-sm cursor-pointer"
                >
                  Include featured image from selected images
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="add-tags" 
                  checked={addTags}
                  onCheckedChange={() => setAddTags(!addTags)}
                />
                <label 
                  htmlFor="add-tags" 
                  className="text-sm cursor-pointer"
                >
                  Add keywords as tags/categories
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enable-comments" 
                  checked={enableComments}
                  onCheckedChange={() => setEnableComments(!enableComments)}
                />
                <label 
                  htmlFor="enable-comments" 
                  className="text-sm cursor-pointer"
                >
                  Enable comments on published content
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPublishing}>
            Cancel
          </Button>
          <Button 
            onClick={handlePublish} 
            disabled={isPublishing}
            className="gap-2"
          >
            {isPublishing ? (
              <>
                <Loader size={16} className="animate-spin" />
                {publishMode === 'now' ? 'Publishing...' : publishMode === 'schedule' ? 'Scheduling...' : 'Saving...'}
              </>
            ) : (
              <>
                <Globe size={16} />
                {publishMode === 'now' ? 'Publish Now' : publishMode === 'schedule' ? 'Schedule Publication' : 'Save as Draft'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishToCMSDialog;
