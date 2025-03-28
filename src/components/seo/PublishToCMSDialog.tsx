
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Globe, Loader } from "lucide-react";
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
  
  const handlePublish = () => {
    setIsPublishing(true);
    
    // Simulate publishing to CMS
    setTimeout(() => {
      setIsPublishing(false);
      toast.success(`Content ${publishMode === 'now' ? 'published' : publishMode === 'schedule' ? 'scheduled' : 'saved as draft'} successfully!`);
      onClose();
    }, 2000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
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
                <Label htmlFor="schedule-date" className="text-right">
                  Date
                </Label>
                <div className="col-span-3">
                  <div className="flex gap-2">
                    <Input
                      id="schedule-date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      id="schedule-time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-[100px]"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Options</Label>
            <div className="col-span-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured-image" 
                  checked={includeFeaturedImage} 
                  onCheckedChange={(checked: boolean) => setIncludeFeaturedImage(checked)} 
                />
                <label
                  htmlFor="featured-image"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use first image as featured image
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="comments" 
                  checked={enableComments} 
                  onCheckedChange={(checked: boolean) => setEnableComments(checked)} 
                />
                <label
                  htmlFor="comments"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Enable comments
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPublishing}>
            Cancel
          </Button>
          <Button onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                {publishMode === 'now' ? 'Publishing...' : 
                 publishMode === 'schedule' ? 'Scheduling...' : 
                 'Saving...'}
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                {publishMode === 'now' ? 'Publish Now' : 
                 publishMode === 'schedule' ? 'Schedule' : 
                 'Save as Draft'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishToCMSDialog;
