
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface ContentEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onSave: (content: string) => void;
}

const ContentEditorDialog: React.FC<ContentEditorDialogProps> = ({
  isOpen,
  onClose,
  content,
  onSave
}) => {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  
  // Update local state when content prop changes
  useEffect(() => {
    if (isOpen) {
      setEditedContent(content);
    }
  }, [content, isOpen]);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      onSave(editedContent);
      setIsSaving(false);
    }, 500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto min-h-[60vh]">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-full min-h-[60vh] p-4 border rounded-md font-mono text-sm"
          />
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader size={16} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentEditorDialog;
