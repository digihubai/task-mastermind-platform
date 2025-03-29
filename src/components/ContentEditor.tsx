
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
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
  Copy
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
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedContent = range.toString();
      
      // Create heading element
      const heading = document.createElement(`h${level}`);
      heading.textContent = selectedContent;
      
      // Replace the selection with the heading
      range.deleteContents();
      range.insertNode(heading);
      
      // Update editor content
      handleEditorChange();
    } else {
      executeCommand('formatBlock', `<h${level}>`);
    }
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
  
  return (
    <Card className="border shadow-sm">
      <div className="border-b p-2 bg-muted/40">
        <div className="flex flex-wrap gap-1">
          <Button variant="ghost" size="icon" onClick={() => executeCommand('bold')}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => executeCommand('italic')}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertHeading(1)}>
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => insertHeading(2)}>
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => executeCommand('insertUnorderedList')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={insertLink}>
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={insertImage}>
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => executeCommand('justifyLeft')}>
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => executeCommand('justifyCenter')}>
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => executeCommand('justifyRight')}>
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => executeCommand('formatBlock', '<pre>')}>
            <Code className="h-4 w-4" />
          </Button>
          <div className="ml-auto flex gap-1">
            <Button variant="ghost" size="icon" onClick={undo} disabled={historyIndex <= 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={redo} disabled={historyIndex >= historyStack.length - 1}>
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
            className="min-h-[400px] p-4 outline-none prose dark:prose-invert max-w-none"
            contentEditable
            onInput={handleEditorChange}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="m-0">
          <div 
            className="min-h-[400px] p-4 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TabsContent>
      </Tabs>
      
      <div className="border-t p-2 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        {onSave && (
          <Button size="sm" onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ContentEditor;
