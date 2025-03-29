
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Eye,
  Code,
  Loader
} from "lucide-react";
import { toast } from "sonner";

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
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const editorRef = useRef<HTMLDivElement>(null);
  const [historyStack, setHistoryStack] = useState<string[]>([content]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Update local state when content prop changes
  useEffect(() => {
    if (isOpen) {
      setEditedContent(content);
      setHistoryStack([content]);
      setHistoryIndex(0);
      
      // Set editor content when component mounts
      if (editorRef.current) {
        editorRef.current.innerHTML = content;
      }
    }
  }, [content, isOpen]);
  
  const handleSave = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML;
        onSave(newContent);
      } else {
        onSave(editedContent);
      }
      setIsSaving(false);
      toast.success("Content saved successfully");
    }, 500);
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setEditedContent(newContent);
      
      // Add to history if different from last entry
      if (newContent !== historyStack[historyIndex]) {
        const newHistoryStack = [...historyStack.slice(0, historyIndex + 1), newContent];
        setHistoryStack(newHistoryStack);
        setHistoryIndex(newHistoryStack.length - 1);
      }
    }
  };
  
  const executeCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleEditorChange();
    }
  };
  
  const insertHeading = (level: 1 | 2 | 3) => {
    executeCommand('formatBlock', `<h${level}>`);
  };
  
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };
  
  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      executeCommand('insertHTML', `<img src="${url}" alt="Image" style="max-width: 100%;" />`);
    }
  };
  
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousContent = historyStack[newIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = previousContent;
        setEditedContent(previousContent);
      }
    }
  };
  
  const redo = () => {
    if (historyIndex < historyStack.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextContent = historyStack[newIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = nextContent;
        setEditedContent(nextContent);
      }
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        
        <div className="border-b p-2 bg-muted/40 mb-4">
          <div className="flex flex-wrap gap-1">
            <Button variant="ghost" size="icon" onClick={() => executeCommand('bold')} title="Bold">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => executeCommand('italic')} title="Italic">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => executeCommand('underline')} title="Underline">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertHeading(1)} title="Heading 1">
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertHeading(2)} title="Heading 2">
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertHeading(3)} title="Heading 3">
              <Heading3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => executeCommand('insertUnorderedList')} title="Bullet List">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => executeCommand('insertOrderedList')} title="Numbered List">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={insertLink} title="Insert Link">
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={insertImage} title="Insert Image">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => executeCommand('justifyLeft')} title="Align Left">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => executeCommand('justifyCenter')} title="Align Center">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => executeCommand('justifyRight')} title="Align Right">
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => executeCommand('formatBlock', '<pre>')} title="Code Block">
              <Code className="h-4 w-4" />
            </Button>
            <div className="ml-auto flex gap-1">
              <Button variant="ghost" size="icon" onClick={undo} disabled={historyIndex <= 0} title="Undo">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={redo} disabled={historyIndex >= historyStack.length - 1} title="Redo">
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={(val: string) => setActiveTab(val as "edit" | "preview")} className="flex-1">
          <TabsList className="mb-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto min-h-[60vh]">
            <TabsContent value="edit" className="h-full mt-0">
              <div
                ref={editorRef}
                className="w-full h-full min-h-[60vh] p-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary prose dark:prose-invert max-w-none"
                contentEditable
                onInput={handleEditorChange}
                dangerouslySetInnerHTML={{ __html: editedContent }}
              />
            </TabsContent>
            
            <TabsContent value="preview" className="h-full mt-0">
              <div 
                className="w-full h-full min-h-[60vh] p-4 border rounded-md prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: editedContent }}
              />
            </TabsContent>
          </div>
        </Tabs>
        
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
