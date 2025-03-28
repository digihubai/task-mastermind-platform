
import React, { useState, useEffect, useRef } from "react";
import { 
  Loader, 
  Globe, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Blockquote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Table,
  Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface ContentDisplayProps {
  isGenerating: boolean;
  content: string;
  onRegenerateContent: () => void;
  onContentChange?: (newContent: string) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  isGenerating,
  content,
  onRegenerateContent,
  onContentChange
}) => {
  const [editableContent, setEditableContent] = useState(content);
  const editorRef = useRef<HTMLDivElement>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [embedUrl, setEmbedUrl] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [showEmbedDialog, setShowEmbedDialog] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  
  useEffect(() => {
    setEditableContent(content);
  }, [content]);
  
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode === editorRef.current ||
          editorRef.current?.contains(range.commonAncestorContainer)) {
        setSelectedText(selection.toString());
        return range;
      }
    }
    return null;
  };

  const restoreSelection = (range: Range | null) => {
    if (range) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };
  
  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setEditableContent(newContent);
      if (onContentChange) {
        onContentChange(newContent);
      }
    }
  };
  
  const applyHeading = (level: string) => {
    execCommand('formatBlock', level);
  };
  
  const handleLinkInsert = () => {
    const selection = saveSelection();
    setShowLinkDialog(true);
    
    // If there's selected text, use that for the link text
    if (selectedText) {
      setLinkText(selectedText);
    }
    
    return selection;
  };

  const insertLink = () => {
    if (linkUrl) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText || linkUrl}</a>`;
      execCommand('insertHTML', linkHtml);
      setLinkUrl("");
      setLinkText("");
      setShowLinkDialog(false);
    }
  };
  
  const insertImage = () => {
    if (imageUrl) {
      const imgHtml = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto;" />`;
      execCommand('insertHTML', imgHtml);
      setImageUrl("");
      setImageAlt("");
      setShowImageDialog(false);
    }
  };
  
  const insertTable = () => {
    if (tableRows > 0 && tableCols > 0) {
      let tableHtml = '<table border="1" style="width: 100%; border-collapse: collapse;">';
      
      // Create header row
      tableHtml += '<thead><tr>';
      for (let i = 0; i < tableCols; i++) {
        tableHtml += `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Header ${i+1}</th>`;
      }
      tableHtml += '</tr></thead><tbody>';
      
      // Create table rows
      for (let i = 0; i < tableRows - 1; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < tableCols; j++) {
          tableHtml += `<td style="border: 1px solid #ddd; padding: 8px;">Cell ${i+1}-${j+1}</td>`;
        }
        tableHtml += '</tr>';
      }
      
      tableHtml += '</tbody></table>';
      execCommand('insertHTML', tableHtml);
      setShowTableDialog(false);
    }
  };
  
  const insertEmbed = () => {
    if (embedUrl) {
      let embedHtml = '';
      
      // Handle YouTube embeds
      if (embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be')) {
        const videoId = embedUrl.includes('youtu.be') 
          ? embedUrl.split('/').pop() 
          : new URLSearchParams(new URL(embedUrl).search).get('v');
        
        if (videoId) {
          embedHtml = `<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
              src="https://www.youtube.com/embed/${videoId}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>`;
        }
      } else {
        // Generic iframe embed
        embedHtml = `<iframe src="${embedUrl}" width="100%" height="400" frameborder="0"></iframe>`;
      }
      
      execCommand('insertHTML', embedHtml);
      setEmbedUrl("");
      setShowEmbedDialog(false);
    }
  };
  
  const handleContentChange = () => {
    if (editorRef.current && onContentChange) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Loader className="h-12 w-12 animate-spin mb-4 opacity-70" />
        <h3 className="text-lg font-medium mb-2">Generating SEO-optimized content</h3>
        <p className="text-muted-foreground max-w-md">
          We're creating a comprehensive article based on your selected topic, keywords, title, 
          and outline structure. This may take a moment...
        </p>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Globe className="h-12 w-12 text-primary/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">No content generated yet</h3>
        <p className="text-muted-foreground max-w-md mb-4">
          Click the button below to create SEO-optimized content based on your selected title and outline.
        </p>
        <Button 
          onClick={onRegenerateContent}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
        >
          Generate Content Now
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Text formatting toolbar */}
      <div className="sticky top-0 z-10 bg-background p-3 border rounded-md shadow-sm">
        <div className="flex flex-wrap gap-1">
          <TooltipProvider>
            {/* Text formatting section */}
            <div className="flex flex-wrap gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('bold')}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('italic')}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('underline')}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('strikeThrough')}
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Strikethrough</TooltipContent>
              </Tooltip>
            </div>
            
            <Separator orientation="vertical" className="mx-1 h-8" />
            
            {/* Heading section */}
            <div className="flex flex-wrap gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => applyHeading('h1')}
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 1</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => applyHeading('h2')}
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 2</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => applyHeading('h3')}
                  >
                    <Heading3 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 3</TooltipContent>
              </Tooltip>
            </div>
            
            <Separator orientation="vertical" className="mx-1 h-8" />
            
            {/* List section */}
            <div className="flex flex-wrap gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('insertUnorderedList')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bullet List</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('insertOrderedList')}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Numbered List</TooltipContent>
              </Tooltip>
            </div>
            
            <Separator orientation="vertical" className="mx-1 h-8" />
            
            {/* Content section */}
            <div className="flex flex-wrap gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('formatBlock', '<blockquote>')}
                  >
                    <Blockquote className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Blockquote</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('formatBlock', '<pre>')}
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Code Block</TooltipContent>
              </Tooltip>
            </div>
            
            <Separator orientation="vertical" className="mx-1 h-8" />
            
            {/* Alignment section */}
            <div className="flex flex-wrap gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('justifyLeft')}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Left</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('justifyCenter')}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Center</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('justifyRight')}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Right</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => execCommand('justifyFull')}
                  >
                    <AlignJustify className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Justify</TooltipContent>
              </Tooltip>
            </div>
            
            <Separator orientation="vertical" className="mx-1 h-8" />
            
            {/* Media section */}
            <div className="flex flex-wrap gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={handleLinkInsert}
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Link</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => setShowImageDialog(true)}
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Image</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => setShowTableDialog(true)}
                  >
                    <Table className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Table</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => setShowEmbedDialog(true)}
                  >
                    <Youtube className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Embed</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>
              Enter the URL and text for your link.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link-url" className="text-right">
                URL
              </Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                className="col-span-3"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link-text" className="text-right">
                Text
              </Label>
              <Input
                id="link-text"
                placeholder="Link text"
                className="col-span-3"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={insertLink}>Insert Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Enter the image details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                className="col-span-3"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-alt" className="text-right">
                Alt Text
              </Label>
              <Input
                id="image-alt"
                placeholder="Image description"
                className="col-span-3"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={insertImage}>Insert Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Table Dialog */}
      <Dialog open={showTableDialog} onOpenChange={setShowTableDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Table</DialogTitle>
            <DialogDescription>
              Select the number of rows and columns.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="table-rows" className="text-right">
                Rows
              </Label>
              <Input
                id="table-rows"
                type="number"
                min="1"
                max="10"
                className="col-span-3"
                value={tableRows}
                onChange={(e) => setTableRows(parseInt(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="table-cols" className="text-right">
                Columns
              </Label>
              <Input
                id="table-cols"
                type="number"
                min="1"
                max="10"
                className="col-span-3"
                value={tableCols}
                onChange={(e) => setTableCols(parseInt(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={insertTable}>Insert Table</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Embed Dialog */}
      <Dialog open={showEmbedDialog} onOpenChange={setShowEmbedDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Embed</DialogTitle>
            <DialogDescription>
              Enter the URL of the content to embed.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="youtube">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="custom">Custom Embed</TabsTrigger>
            </TabsList>
            <TabsContent value="youtube" className="mt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="youtube-url" className="text-right">
                    YouTube URL
                  </Label>
                  <Input
                    id="youtube-url"
                    placeholder="https://youtube.com/watch?v=..."
                    className="col-span-3"
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="custom" className="mt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="custom-embed" className="text-right">
                    Embed URL
                  </Label>
                  <Input
                    id="custom-embed"
                    placeholder="https://example.com/embed"
                    className="col-span-3"
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-4">
            <Button type="submit" onClick={insertEmbed}>Insert Embed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Editable content area */}
      <div 
        className="border rounded-lg p-6 prose prose-sm max-w-none dark:prose-invert min-h-[500px]"
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: editableContent }}
        ref={editorRef}
        onBlur={handleContentChange}
        onInput={handleContentChange}
      />
    </div>
  );
};

export default ContentDisplay;

