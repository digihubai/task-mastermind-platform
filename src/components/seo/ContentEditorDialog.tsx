
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
  const [editableContent, setEditableContent] = useState(content);
  
  // Update editable content when the content prop changes
  useEffect(() => {
    setEditableContent(content);
  }, [content]);
  
  // Handle save action
  const handleSave = () => {
    onSave(editableContent);
  };
  
  // Fix common formatting issues automatically
  const handleAutoFix = () => {
    let fixedContent = editableContent;
    
    // Fix missing spacing after headings
    fixedContent = fixedContent.replace(/<\/h[1-6]>(?!\s|<)/g, '</h$&>\n\n');
    
    // Fix missing spacing after paragraphs
    fixedContent = fixedContent.replace(/<\/p>(?!\s|<)/g, '</p>\n\n');
    
    // Fix missing spacing after lists
    fixedContent = fixedContent.replace(/<\/ul>(?!\s|<)/g, '</ul>\n\n');
    fixedContent = fixedContent.replace(/<\/ol>(?!\s|<)/g, '</ol>\n\n');
    
    // Fix missing spacing after blockquotes
    fixedContent = fixedContent.replace(/<\/blockquote>(?!\s|<)/g, '</blockquote>\n\n');
    
    // Fix missing spacing after tables
    fixedContent = fixedContent.replace(/<\/table>(?!\s|<)/g, '</table>\n\n');
    
    // Fix missing spacing after images
    fixedContent = fixedContent.replace(/<\/img>(?!\s|<)/g, '</img>\n\n');
    fixedContent = fixedContent.replace(/(<img[^>]*>)(?!\s|<)/g, '$1\n\n');
    
    // Remove excessive line breaks (more than 2)
    fixedContent = fixedContent.replace(/\n{3,}/g, '\n\n');
    
    // Format HTML for better readability
    fixedContent = fixedContent
      .replace(/<([a-z][a-z0-9]*)[^>]*?(\/?)>/gi, '\n<$1$2>')
      .replace(/<\/([a-z][a-z0-9]*)[^>]*?>/gi, '</$1>\n');
    
    setEditableContent(fixedContent);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg p-6 w-full max-w-4xl max-h-[90vh] flex flex-col">
        <h3 className="text-xl font-medium mb-4">Edit Content</h3>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Edit HTML directly. Use proper HTML tags for formatting.
          </p>
          <Button variant="outline" size="sm" onClick={handleAutoFix}>
            Auto Fix Formatting
          </Button>
        </div>
        
        <textarea
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
          className="flex-1 w-full p-4 border rounded-md font-mono text-sm resize-none min-h-[400px]"
          spellCheck={false}
        />
        
        <div className="mt-4 flex flex-col">
          <p className="text-xs text-muted-foreground mb-4">
            <strong>Tip:</strong> You can use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
            Make sure to add proper spacing between paragraphs and sections.
          </p>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditorDialog;
