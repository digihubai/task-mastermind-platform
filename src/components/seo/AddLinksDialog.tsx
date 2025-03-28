
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, LinkIcon, Loader } from "lucide-react";

interface AddLinksDialogProps {
  isOpen: boolean;
  onClose: () => void;
  linkType: 'internal' | 'external' | 'both';
  setLinkType: (type: 'internal' | 'external' | 'both') => void;
  internalLinks: Array<{title: string, url: string}>;
  externalLinks: Array<{title: string, url: string}>;
  isLoadingLinks: boolean;
  onAddLinks: () => void;
}

const AddLinksDialog: React.FC<AddLinksDialogProps> = ({
  isOpen,
  onClose,
  linkType,
  setLinkType,
  internalLinks,
  externalLinks,
  isLoadingLinks,
  onAddLinks
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Links to Content</DialogTitle>
          <DialogDescription>
            Add relevant internal and external links to improve SEO performance
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center space-x-4">
            <Label>Link Types to Add:</Label>
            <Tabs defaultValue={linkType} onValueChange={(value) => setLinkType(value as 'internal' | 'external' | 'both')}>
              <TabsList>
                <TabsTrigger value="internal">Internal Links</TabsTrigger>
                <TabsTrigger value="external">External Links</TabsTrigger>
                <TabsTrigger value="both">Both</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {isLoadingLinks ? (
            <div className="flex justify-center py-8">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              {(linkType === 'internal' || linkType === 'both') && (
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <LinkIcon size={16} className="text-blue-500" />
                    Internal Links
                  </h3>
                  <div className="border rounded-md divide-y">
                    {internalLinks.map((link, i) => (
                      <div key={i} className="p-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{link.url}</p>
                        </div>
                        <Switch defaultChecked id={`internal-${i}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {(linkType === 'external' || linkType === 'both') && (
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <ExternalLink size={16} className="text-green-500" />
                    External Authority Links
                  </h3>
                  <div className="border rounded-md divide-y">
                    {externalLinks.map((link, i) => (
                      <div key={i} className="p-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{link.url}</p>
                        </div>
                        <Switch defaultChecked id={`external-${i}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={onAddLinks}
            disabled={isLoadingLinks}
          >
            Add Selected Links
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinksDialog;
