
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  PencilRuler, 
  HelpCircle,
  AlignLeft, 
  AlignCenter, 
  AlignJustify, 
  Heading1, 
  Heading2, 
  Heading3, 
  ListOrdered, 
  List, 
  Bold, 
  Italic,
  Underline,
  Link,
  Image,
  TextQuote,
  Code,
  Table,
  Strikethrough,
  Undo,
  Redo
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [editableContent, setEditableContent] = useState(content);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [editHistory, setEditHistory] = useState<string[]>([content]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Update editable content when the content prop changes
  useEffect(() => {
    setEditableContent(content);
    setEditHistory([content]);
    setHistoryIndex(0);
  }, [content]);
  
  // Handle save action
  const handleSave = () => {
    onSave(editableContent);
  };

  // Add to history
  const addToHistory = (newContent: string) => {
    // Only add to history if content has changed
    if (editableContent !== newContent) {
      const newHistory = editHistory.slice(0, historyIndex + 1);
      newHistory.push(newContent);
      
      // Limit history to 50 items
      if (newHistory.length > 50) {
        newHistory.shift();
      }
      
      setEditHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };
  
  // Undo/Redo functions
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEditableContent(editHistory[historyIndex - 1]);
    }
  };
  
  const handleRedo = () => {
    if (historyIndex < editHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEditableContent(editHistory[historyIndex + 1]);
    }
  };
  
  // Fix common formatting issues automatically
  const handleAutoFix = () => {
    let fixedContent = editableContent;
    
    // Replace double <br> tags with proper paragraph spacing
    fixedContent = fixedContent.replace(/<br\s*\/?>\s*<br\s*\/?>/g, '</p>\n\n<p>');
    
    // Fix missing spacing after headings
    fixedContent = fixedContent.replace(/<\/h([1-6])>(?!\s|<)/g, '</h$1>\n\n');
    
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
    
    // Make sure paragraphs have proper tags
    fixedContent = fixedContent.replace(/(\n\n|^)([^<\n][^\n<]+)(\n\n|$)/g, '$1<p>$2</p>$3');
    
    // Create proper heading hierarchy if missing
    if (!fixedContent.includes('<h1>') && !fixedContent.includes('<h1 ')) {
      const titleMatch = fixedContent.match(/<h([2-6])[^>]*>(.+?)<\/h\1>/);
      if (titleMatch) {
        fixedContent = fixedContent.replace(/<h([2-6])[^>]*>(.+?)<\/h\1>/, '<h1>$2</h1>');
      }
    }
    
    // Add proper spacing between HTML elements
    fixedContent = fixedContent
      .replace(/(<\/[^>]+>)(<[^\/][^>]*>)/g, '$1\n$2')
      .replace(/(<[^\/][^>]*>)(<[^\/][^>]*>)/g, '$1\n$2');
    
    setEditableContent(fixedContent);
    addToHistory(fixedContent);
    toast.success("Content formatting has been fixed");
  };
  
  const insertFormatting = (tag: string, startAttribute = '', endTag?: string) => {
    const textArea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = editableContent.substring(start, end);
    
    const finalEndTag = endTag || tag;
    const formattedText = `<${tag}${startAttribute}>${selectedText}</${finalEndTag}>`;
    
    const newContent = editableContent.substring(0, start) + formattedText + editableContent.substring(end);
    setEditableContent(newContent);
    addToHistory(newContent);
    
    // Restore focus after state update
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  // Insert an image
  const insertImage = () => {
    const imgUrl = window.prompt('Enter image URL', 'https://');
    const imgAlt = window.prompt('Enter image alt text (for accessibility)', 'Image description');
    
    if (imgUrl) {
      const imageTag = `<img src="${imgUrl}" alt="${imgAlt || 'Image'}" class="rounded-lg w-full my-4" />`;
      
      const textArea = document.getElementById('content-editor') as HTMLTextAreaElement;
      if (!textArea) return;
      
      const cursorPos = textArea.selectionStart;
      const newContent = editableContent.substring(0, cursorPos) + imageTag + editableContent.substring(cursorPos);
      
      setEditableContent(newContent);
      addToHistory(newContent);
      
      // Set cursor position after the inserted image
      setTimeout(() => {
        textArea.focus();
        textArea.setSelectionRange(cursorPos + imageTag.length, cursorPos + imageTag.length);
      }, 0);
    }
  };
  
  // Insert a table
  const insertTable = () => {
    const rows = parseInt(window.prompt('Enter number of rows', '3') || '3', 10);
    const cols = parseInt(window.prompt('Enter number of columns', '3') || '3', 10);
    
    let tableHtml = '<table class="w-full border-collapse my-4">\n';
    
    // Table header
    tableHtml += '  <thead>\n    <tr>\n';
    for (let j = 0; j < cols; j++) {
      tableHtml += `      <th class="border border-gray-300 p-2">Header ${j+1}</th>\n`;
    }
    tableHtml += '    </tr>\n  </thead>\n';
    
    // Table body
    tableHtml += '  <tbody>\n';
    for (let i = 0; i < rows; i++) {
      tableHtml += '    <tr>\n';
      for (let j = 0; j < cols; j++) {
        tableHtml += `      <td class="border border-gray-300 p-2">Cell ${i+1},${j+1}</td>\n`;
      }
      tableHtml += '    </tr>\n';
    }
    tableHtml += '  </tbody>\n';
    tableHtml += '</table>';
    
    const textArea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textArea) return;
    
    const cursorPos = textArea.selectionStart;
    const newContent = editableContent.substring(0, cursorPos) + tableHtml + editableContent.substring(cursorPos);
    
    setEditableContent(newContent);
    addToHistory(newContent);
  };
  
  const renderPreview = () => {
    return (
      <div 
        className="bg-white dark:bg-black p-4 border rounded-md min-h-[400px] overflow-auto prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: editableContent }}
      />
    );
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background rounded-lg p-6 w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Edit Content</h3>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")} className="w-auto">
            <TabsList>
              <TabsTrigger value="edit">Edit HTML</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <TabsContent value="edit" className="flex-1 flex flex-col">
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <div className="flex flex-wrap gap-1">
              <TooltipProvider>
                <div className="flex gap-1 mr-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleUndo} 
                        disabled={historyIndex <= 0}
                      >
                        <Undo size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Undo</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleRedo}
                        disabled={historyIndex >= editHistory.length - 1}
                      >
                        <Redo size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Redo</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex gap-1 mr-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('h1')}>
                        <Heading1 size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Heading 1</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('h2')}>
                        <Heading2 size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Heading 2</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('h3')}>
                        <Heading3 size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Heading 3</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex gap-1 mr-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('p')}>
                        <AlignLeft size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Paragraph</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('blockquote')}>
                        <TextQuote size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Blockquote</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex gap-1 mr-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('strong')}>
                        <Bold size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('em')}>
                        <Italic size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('u')}>
                        <Underline size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Underline</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('s')}>
                        <Strikethrough size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Strikethrough</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex gap-1 mr-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => {
                        const url = window.prompt('Enter URL', 'https://');
                        if (url) insertFormatting('a', ` href="${url}"`)
                      }}>
                        <Link size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Link</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={insertImage}>
                        <Image size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Image</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex gap-1 mr-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => {
                        insertFormatting('ul', '', 'ul');
                        insertFormatting('li', '', 'li');
                      }}>
                        <List size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bullet List</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => {
                        insertFormatting('ol', '', 'ol');
                        insertFormatting('li', '', 'li');
                      }}>
                        <ListOrdered size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Numbered List</TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => insertFormatting('code')}>
                        <Code size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Inline Code</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={insertTable}>
                        <Table size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Table</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
            
            <Button variant="secondary" size="sm" onClick={handleAutoFix} className="gap-1">
              <PencilRuler size={16} />
              Auto Fix Formatting
            </Button>
          </div>
          
          <textarea
            id="content-editor"
            value={editableContent}
            onChange={(e) => {
              setEditableContent(e.target.value);
              // Debounce adding to history to prevent too many history entries
              clearTimeout((window as any).editHistoryTimeout);
              (window as any).editHistoryTimeout = setTimeout(() => {
                addToHistory(e.target.value);
              }, 500);
            }}
            className="flex-1 w-full p-4 border rounded-md font-mono text-sm resize-none min-h-[400px]"
            spellCheck={false}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="flex-1">
          {renderPreview()}
        </TabsContent>
        
        <div className="mt-4 flex flex-col">
          <p className="text-xs text-muted-foreground mb-4">
            <HelpCircle className="inline-block mr-1 h-3 w-3" />
            <strong>Tip:</strong> Use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, 
            etc. Use the toolbar above to insert common elements or click Auto Fix to correct spacing and formatting issues.
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
