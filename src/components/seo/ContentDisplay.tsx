
import React, { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image as ImageIcon,
  Table,
  Youtube,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  RotateCcw
} from "lucide-react";
import { toast } from "sonner";
import ContentEditorDialog from "./ContentEditorDialog";
import { searchStockPhotos, generateAIImages } from "@/services/seo/imageService";

interface ContentDisplayProps {
  isGenerating: boolean;
  content: string;
  onRegenerateContent: () => void;
  onContentChange: (newContent: string) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  isGenerating,
  content,
  onRegenerateContent,
  onContentChange
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editableContent, setEditableContent] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isSearchingImages, setIsSearchingImages] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchType, setSearchType] = useState<'stock' | 'ai'>('stock');
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedImageSize, setSelectedImageSize] = useState<'small' | 'medium' | 'large' | 'full'>('medium');
  const [isAdditionalDialogOpen, setIsAdditionalDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'link' | 'table' | 'youtube'>('link');
  const [dialogInput, setDialogInput] = useState({ text: '', url: '', rows: '3', cols: '3', youtubeId: '' });
  const [selectedText, setSelectedText] = useState('');
  
  // Update editable content when content prop changes
  useEffect(() => {
    setEditableContent(content);
  }, [content]);
  
  // Handle text selection in the content area
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        setSelectedText(selection.toString());
      } else {
        setSelectedText('');
      }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);
  
  const handleOpenEditDialog = () => {
    setEditableContent(content);
    setIsEditDialogOpen(true);
  };
  
  const handleSaveEditDialog = (newContent: string) => {
    onContentChange(newContent);
    setIsEditDialogOpen(false);
    toast.success("Content has been updated");
  };
  
  // Image dialog handlers
  const handleOpenImageDialog = () => {
    setIsImageDialogOpen(true);
    setSearchQuery("");
    setSearchResults([]);
  };
  
  const handleSearchImages = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    setIsSearchingImages(true);
    
    try {
      let results: string[] = [];
      
      if (searchType === 'stock') {
        results = await searchStockPhotos(searchQuery, 'unsplash', 8);
      } else {
        results = await generateAIImages(searchQuery, 4, 'landscape');
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching images:", error);
      toast.error("Failed to search for images. Please try again.");
    } finally {
      setIsSearchingImages(false);
    }
  };
  
  const handleSelectImage = (imageUrl: string) => {
    // Get image size class based on selection
    let sizeClass = 'w-full';
    if (selectedImageSize === 'small') sizeClass = 'w-1/3 mx-auto';
    if (selectedImageSize === 'medium') sizeClass = 'w-1/2 mx-auto';
    if (selectedImageSize === 'large') sizeClass = 'w-3/4 mx-auto';
    
    // Insert image HTML at cursor position or append to content
    const imageHtml = `\n<img src="${imageUrl}" alt="${searchQuery}" class="${sizeClass} rounded-lg my-6" />\n`;
    
    onContentChange(content + imageHtml);
    setIsImageDialogOpen(false);
    toast.success("Image added to content");
  };
  
  // Format handlers
  const applyFormat = (format: string) => {
    let newContent = content;
    const selection = window.getSelection();
    
    if (!selection || selection.rangeCount === 0) {
      toast.error("Please select some text to format");
      return;
    }
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText) {
      toast.error("Please select some text to format");
      return;
    }
    
    // Get the actual HTML content
    const htmlContent = contentRef.current?.innerHTML || '';
    
    // Apply formatting based on the format type
    switch (format) {
      case 'bold':
        newContent = htmlContent.replace(selectedText, `<strong>${selectedText}</strong>`);
        break;
      case 'italic':
        newContent = htmlContent.replace(selectedText, `<em>${selectedText}</em>`);
        break;
      case 'underline':
        newContent = htmlContent.replace(selectedText, `<u>${selectedText}</u>`);
        break;
      case 'strikethrough':
        newContent = htmlContent.replace(selectedText, `<s>${selectedText}</s>`);
        break;
      case 'h1':
        newContent = htmlContent.replace(selectedText, `<h1>${selectedText}</h1>`);
        break;
      case 'h2':
        newContent = htmlContent.replace(selectedText, `<h2>${selectedText}</h2>`);
        break;
      case 'h3':
        newContent = htmlContent.replace(selectedText, `<h3>${selectedText}</h3>`);
        break;
      case 'quote':
        newContent = htmlContent.replace(selectedText, `<blockquote>${selectedText}</blockquote>`);
        break;
      case 'code':
        newContent = htmlContent.replace(selectedText, `<code>${selectedText}</code>`);
        break;
      case 'alignLeft':
        newContent = htmlContent.replace(selectedText, `<div style="text-align: left;">${selectedText}</div>`);
        break;
      case 'alignCenter':
        newContent = htmlContent.replace(selectedText, `<div style="text-align: center;">${selectedText}</div>`);
        break;
      case 'alignRight':
        newContent = htmlContent.replace(selectedText, `<div style="text-align: right;">${selectedText}</div>`);
        break;
      case 'alignJustify':
        newContent = htmlContent.replace(selectedText, `<div style="text-align: justify;">${selectedText}</div>`);
        break;
      default:
        break;
    }
    
    // Update content with new formatted content
    onContentChange(newContent);
  };

  // Additional dialog handlers
  const openAdditionalDialog = (type: 'link' | 'table' | 'youtube') => {
    setDialogType(type);
    // Pre-fill text with selection if any
    setDialogInput({
      ...dialogInput,
      text: selectedText || ''
    });
    setIsAdditionalDialogOpen(true);
  };
  
  const handleAdditionalDialogSave = () => {
    let insertHtml = '';
    
    switch (dialogType) {
      case 'link':
        if (!dialogInput.url) {
          toast.error("Please enter a URL");
          return;
        }
        insertHtml = `<a href="${dialogInput.url}" target="_blank" rel="noopener noreferrer">${dialogInput.text || dialogInput.url}</a>`;
        break;
      
      case 'table':
        const rows = parseInt(dialogInput.rows) || 3;
        const cols = parseInt(dialogInput.cols) || 3;
        
        insertHtml = '<table class="w-full border-collapse border border-gray-300 my-4">\n';
        
        // Create header row
        insertHtml += '  <thead>\n    <tr>\n';
        for (let i = 0; i < cols; i++) {
          insertHtml += '      <th class="border border-gray-300 px-4 py-2 bg-gray-100">Header ' + (i + 1) + '</th>\n';
        }
        insertHtml += '    </tr>\n  </thead>\n';
        
        // Create body rows
        insertHtml += '  <tbody>\n';
        for (let i = 0; i < rows - 1; i++) {
          insertHtml += '    <tr>\n';
          for (let j = 0; j < cols; j++) {
            insertHtml += '      <td class="border border-gray-300 px-4 py-2">Cell ' + (i + 1) + '-' + (j + 1) + '</td>\n';
          }
          insertHtml += '    </tr>\n';
        }
        insertHtml += '  </tbody>\n</table>';
        break;
      
      case 'youtube':
        if (!dialogInput.youtubeId) {
          toast.error("Please enter a YouTube video ID");
          return;
        }
        
        // Extract YouTube ID from various formats
        let videoId = dialogInput.youtubeId;
        
        // If it's a full URL, extract the ID
        if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
          const url = new URL(videoId);
          if (videoId.includes('youtube.com')) {
            videoId = url.searchParams.get('v') || '';
          } else {
            videoId = url.pathname.substring(1);
          }
        }
        
        if (!videoId) {
          toast.error("Invalid YouTube URL or ID");
          return;
        }
        
        insertHtml = `<div class="aspect-w-16 aspect-h-9 my-6">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen
    class="w-full h-[400px]"
  ></iframe>
</div>`;
        break;
    }
    
    // Insert the HTML at cursor position or append to content
    onContentChange(content + '\n' + insertHtml + '\n');
    setIsAdditionalDialogOpen(false);
    setDialogInput({ text: '', url: '', rows: '3', cols: '3', youtubeId: '' });
    toast.success(`${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} added to content`);
  };
  
  if (isGenerating) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-8 text-center space-y-4">
        <RotateCcw className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-medium">No content generated yet</h3>
          <p className="text-muted-foreground mt-1">Click "Generate Content" to create SEO-optimized content</p>
        </div>
        <Button onClick={onRegenerateContent}>Generate Content</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Formatting toolbar */}
      <div className="border rounded-md p-2 bg-background">
        <div className="flex flex-wrap gap-1">
          <div className="flex items-center border-r pr-2">
            <Button variant="ghost" size="sm" onClick={() => applyFormat('bold')} title="Bold">
              <Bold size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('italic')} title="Italic">
              <Italic size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('underline')} title="Underline">
              <Underline size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('strikethrough')} title="Strikethrough">
              <Strikethrough size={18} />
            </Button>
          </div>
          
          <div className="flex items-center border-r pr-2">
            <Button variant="ghost" size="sm" onClick={() => applyFormat('h1')} title="Heading 1">
              <Heading1 size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('h2')} title="Heading 2">
              <Heading2 size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('h3')} title="Heading 3">
              <Heading3 size={18} />
            </Button>
          </div>
          
          <div className="flex items-center border-r pr-2">
            <Button variant="ghost" size="sm" onClick={() => applyFormat('list')} title="Bullet List">
              <List size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('listOrdered')} title="Numbered List">
              <ListOrdered size={18} />
            </Button>
          </div>
          
          <div className="flex items-center border-r pr-2">
            <Button variant="ghost" size="sm" onClick={() => applyFormat('alignLeft')} title="Align Left">
              <AlignLeft size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('alignCenter')} title="Align Center">
              <AlignCenter size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('alignRight')} title="Align Right">
              <AlignRight size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyFormat('alignJustify')} title="Justify">
              <AlignJustify size={18} />
            </Button>
          </div>
          
          <div className="flex items-center border-r pr-2">
            <Button variant="ghost" size="sm" onClick={() => openAdditionalDialog('link')} title="Add Link">
              <Link size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleOpenImageDialog} title="Add Image">
              <ImageIcon size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => openAdditionalDialog('table')} title="Add Table">
              <Table size={18} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => openAdditionalDialog('youtube')} title="Add YouTube Video">
              <Youtube size={18} />
            </Button>
          </div>
          
          <div className="flex-grow"></div>
          <Button variant="secondary" onClick={handleOpenEditDialog} className="ml-auto">
            Fix Formatting
          </Button>
        </div>
      </div>
      
      {/* Content display area */}
      <div
        ref={contentRef}
        className="prose prose-stone dark:prose-invert max-w-none border rounded-md p-6 min-h-[400px] bg-card"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {/* Full content edit dialog */}
      <ContentEditorDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        content={editableContent}
        onSave={handleSaveEditDialog}
      />
      
      {/* Image search/generation dialog */}
      {isImageDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-medium mb-4">Add Image</h3>
            
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant={searchType === 'stock' ? 'default' : 'outline'}
                onClick={() => setSearchType('stock')}
                className="flex-1"
              >
                Stock Photos
              </Button>
              <Button
                variant={searchType === 'ai' ? 'default' : 'outline'}
                onClick={() => setSearchType('ai')}
                className="flex-1"
              >
                AI Generated
              </Button>
            </div>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'stock' ? "Search for stock photos..." : "Describe the image you want..."}
                className="flex-1 px-3 py-2 border rounded-md"
                onKeyDown={(e) => e.key === 'Enter' && handleSearchImages()}
              />
              <Button onClick={handleSearchImages} disabled={isSearchingImages}>
                {isSearchingImages ? "Searching..." : "Search"}
              </Button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Image Size</h4>
              <div className="flex gap-2">
                <Button
                  variant={selectedImageSize === 'small' ? 'default' : 'outline'}
                  onClick={() => setSelectedImageSize('small')}
                  size="sm"
                >
                  Small
                </Button>
                <Button
                  variant={selectedImageSize === 'medium' ? 'default' : 'outline'}
                  onClick={() => setSelectedImageSize('medium')}
                  size="sm"
                >
                  Medium
                </Button>
                <Button
                  variant={selectedImageSize === 'large' ? 'default' : 'outline'}
                  onClick={() => setSelectedImageSize('large')}
                  size="sm"
                >
                  Large
                </Button>
                <Button
                  variant={selectedImageSize === 'full' ? 'default' : 'outline'}
                  onClick={() => setSelectedImageSize('full')}
                  size="sm"
                >
                  Full Width
                </Button>
              </div>
            </div>
            
            {isSearchingImages && (
              <div className="grid place-items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
            
            {!isSearchingImages && searchResults.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {searchResults.map((image, index) => (
                  <div
                    key={index}
                    className="relative border rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleSelectImage(image)}
                  >
                    <img src={image} alt={`Search result ${index + 1}`} className="w-full h-40 object-cover" />
                  </div>
                ))}
              </div>
            )}
            
            {!isSearchingImages && searchResults.length === 0 && searchQuery && (
              <div className="text-center py-10 text-muted-foreground">
                <p>No images found. Try a different search term.</p>
              </div>
            )}
            
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Additional dialog for links, tables, etc. */}
      {isAdditionalDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-medium mb-4">
              {dialogType === 'link' ? 'Add Link' : dialogType === 'table' ? 'Add Table' : 'Add YouTube Video'}
            </h3>
            
            {dialogType === 'link' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Link Text</label>
                  <input
                    type="text"
                    value={dialogInput.text}
                    onChange={(e) => setDialogInput({ ...dialogInput, text: e.target.value })}
                    placeholder="Text to display"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    type="text"
                    value={dialogInput.url}
                    onChange={(e) => setDialogInput({ ...dialogInput, url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}
            
            {dialogType === 'table' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rows</label>
                  <input
                    type="number"
                    value={dialogInput.rows}
                    onChange={(e) => setDialogInput({ ...dialogInput, rows: e.target.value })}
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Columns</label>
                  <input
                    type="number"
                    value={dialogInput.cols}
                    onChange={(e) => setDialogInput({ ...dialogInput, cols: e.target.value })}
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}
            
            {dialogType === 'youtube' && (
              <div>
                <label className="block text-sm font-medium mb-1">YouTube Video URL or ID</label>
                <input
                  type="text"
                  value={dialogInput.youtubeId}
                  onChange={(e) => setDialogInput({ ...dialogInput, youtubeId: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID or VIDEO_ID"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ
                </p>
              </div>
            )}
            
            <div className="flex justify-end mt-6 gap-2">
              <Button variant="outline" onClick={() => setIsAdditionalDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdditionalDialogSave}>
                Add {dialogType === 'link' ? 'Link' : dialogType === 'table' ? 'Table' : 'Video'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
