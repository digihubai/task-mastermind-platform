
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Eye,
  Code,
  Save,
  Download,
  Copy,
  Maximize2
} from 'lucide-react';

interface ContentEditorProps {
  initialContent: string;
  onContentChange: (content: string) => void;
  onSave?: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ initialContent, onContentChange, onSave }) => {
  const [content, setContent] = useState(initialContent || '');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const editorRef = useRef<HTMLDivElement>(null);
  const [historyStack, setHistoryStack] = useState<string[]>([initialContent || '']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  
  useEffect(() => {
    // Initialize editor content
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);
  
  // Update the content when initialContent changes
  useEffect(() => {
    if (initialContent !== content) {
      setContent(initialContent || '');
      if (editorRef.current) {
        editorRef.current.innerHTML = initialContent || '';
      }
      
      // Reset history
      setHistoryStack([initialContent || '']);
      setHistoryIndex(0);
    }
  }, [initialContent]);
  
  // Handle fullscreen mode
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreen) {
        setFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [fullscreen]);
  
  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onContentChange(newContent);
      
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
        setContent(previousContent);
        onContentChange(previousContent);
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
        setContent(nextContent);
        onContentChange(nextContent);
      }
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard");
  };
  
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded as HTML");
  };
  
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  
  return (
    <Card className={`border shadow-sm ${fullscreen ? 'fixed inset-0 z-50 p-4' : ''}`}>
      <div className="border-b p-2 bg-muted/40">
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
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={insertImage} title="Insert Image">
            <ImageIcon className="h-4 w-4" />
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
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={undo} disabled={historyIndex <= 0} title="Undo">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={redo} disabled={historyIndex >= historyStack.length - 1} title="Redo">
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={(val: string) => setActiveTab(val as 'edit' | 'preview')}>
        <div className="px-4 pt-2">
          <TabsList className="w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="m-0">
          <div
            ref={editorRef}
            className={`min-h-[${fullscreen ? '80vh' : '400px'}] p-4 outline-none prose dark:prose-invert max-w-none`}
            contentEditable
            onInput={handleEditorChange}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="m-0">
          <div 
            className={`min-h-[${fullscreen ? '80vh' : '400px'}] p-4 prose dark:prose-invert max-w-none`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TabsContent>
      </Tabs>
      
      <div className="border-t p-2 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleCopyToClipboard} title="Copy to Clipboard">
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload} title="Download as HTML">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        {onSave && (
          <Button size="sm" onClick={onSave} title="Save Content">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ContentEditor;
