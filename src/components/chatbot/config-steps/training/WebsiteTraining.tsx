
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, RefreshCw, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface WebsiteTrainingProps {
  onSkip: () => void;
}

interface WebsitePage {
  id: string;
  url: string;
  title: string;
  depth: number;
  trained: boolean;
  selected?: boolean;
}

export const WebsiteTraining: React.FC<WebsiteTrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [depth, setDepth] = useState<number>(1);
  const [pages, setPages] = useState<WebsitePage[]>([]);
  
  const handleScanWebsite = () => {
    if (!url.trim()) {
      toast({
        variant: "destructive",
        title: "URL required",
        description: "Please enter a website URL to continue."
      });
      return;
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate website scanning
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate mock pages for the website
      const siteName = new URL(url).hostname.replace('www.', '');
      const mockPages: WebsitePage[] = [
        // Generate some mock pages based on common site structure
        ...Array(Math.floor(Math.random() * 5) + 3).fill(null).map((_, i) => ({
          id: Date.now().toString() + i,
          url: `${url}${i === 0 ? '' : '/' + ['about', 'contact', 'services', 'products', 'blog', 'faq'][i % 6]}`,
          title: `${siteName} | ${i === 0 ? 'Home' : ['About', 'Contact', 'Services', 'Products', 'Blog', 'FAQ'][i % 6]}`,
          depth: 1,
          trained: false,
          selected: false
        }))
      ];
      
      setPages(mockPages);
      
      toast({
        title: "Website scanned",
        description: `Found ${mockPages.length} pages on ${siteName}.`
      });
    }, 2000);
  };
  
  const handleTrainAll = () => {
    // Simulate training process
    toast({
      title: "Training started",
      description: "Your web pages are being processed for training."
    });
    
    setTimeout(() => {
      setPages(pages.map(page => ({...page, trained: true})));
      toast({
        title: "Training complete",
        description: "All web pages have been successfully trained."
      });
    }, 2000);
  };
  
  const handleDeletePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
    toast({
      title: "Page removed",
      description: "The page has been removed from training."
    });
  };

  const handleSelectAll = () => {
    setPages(pages.map(page => ({ ...page, selected: true })));
  };

  const handleToggleSelect = (id: string) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, selected: !page.selected } : page
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">1</span>
          <h3 className="text-base font-medium">Add URL</h3>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="flex space-x-1 mb-2">
              <button 
                className={`px-2 py-1 text-xs ${!url.includes('/') || new URL(url || 'https://example.com').pathname === '/' ? 'bg-purple-100 text-purple-800 font-medium rounded' : 'text-gray-500'}`}
                onClick={() => setUrl(url.split('/').slice(0, 3).join('/'))}
              >
                Website
              </button>
              <button 
                className={`px-2 py-1 text-xs ${url.includes('/') && new URL(url || 'https://example.com').pathname !== '/' ? 'bg-purple-100 text-purple-800 font-medium rounded' : 'text-gray-500'}`}
                onClick={() => {
                  if (!url.includes('/') || new URL(url || 'https://example.com').pathname === '/') {
                    setUrl(url + '/page');
                  }
                }}
              >
                Single URL
              </button>
            </div>
            <div className="relative">
              <Input 
                placeholder="https://www.digihub.ai"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pr-10"
              />
              {url && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setUrl("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <Button 
            className="self-end"
            onClick={handleScanWebsite}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {pages.length > 0 && (
        <>
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">2</span>
                Select Pages
              </h3>
              <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center gap-2 overflow-hidden">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4" 
                    checked={page.selected || false}
                    onChange={() => handleToggleSelect(page.id)}
                  />
                  <div className="truncate">
                    <span className="font-medium text-sm block truncate">{page.title}</span>
                    <span className="text-xs text-muted-foreground truncate">{page.url}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${page.trained ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {page.trained ? 'Trained' : 'Not Trained'}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleDeletePage(page.id)}>
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleTrainAll}>
            Train Chatbot
          </Button>
        </>
      )}
      
      <Button 
        variant="secondary" 
        className="w-full mt-4"
        onClick={() => onSkip()}
      >
        Next
      </Button>
    </div>
  );
};
