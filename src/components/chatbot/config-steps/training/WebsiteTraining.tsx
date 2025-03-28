
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface WebsiteTrainingProps {
  onSkip: () => void;
}

export const WebsiteTraining: React.FC<WebsiteTrainingProps> = ({ onSkip }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [crawlingDepth, setCrawlingDepth] = useState<number>(2);
  const [savedWebsites, setSavedWebsites] = useState<Array<{id: string, url: string, depth: number, trained: boolean}>>([]);
  
  const handleAddWebsite = () => {
    // Validate URL format
    if (!websiteUrl.trim() || !isValidUrl(websiteUrl)) {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid website URL."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate website processing
    setTimeout(() => {
      setIsLoading(false);
      
      // Save the website
      const newWebsiteId = Date.now().toString();
      setSavedWebsites([...savedWebsites, {
        id: newWebsiteId,
        url: websiteUrl,
        depth: crawlingDepth,
        trained: false
      }]);
      
      // Reset input fields
      setWebsiteUrl("");
      
      toast({
        title: "Website added",
        description: "Website has been added for crawling and training."
      });
    }, 1500);
  };
  
  const handleTrainAll = () => {
    // Simulate training process
    toast({
      title: "Crawling and training started",
      description: "Your websites are being crawled and processed for training."
    });
    
    setTimeout(() => {
      setSavedWebsites(savedWebsites.map(website => ({...website, trained: true})));
      toast({
        title: "Training complete",
        description: "All websites have been successfully crawled and trained."
      });
    }, 2000);
  };
  
  const handleDeleteWebsite = (id: string) => {
    setSavedWebsites(savedWebsites.filter(website => website.id !== id));
    toast({
      title: "Website removed",
      description: "The website has been removed from training."
    });
  };
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4">
        <h3 className="text-base font-medium flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">1</span>
          Add Website
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="website-url" className="mb-2 block">Website URL</Label>
          <Input 
            id="website-url"
            placeholder="https://example.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="crawling-depth" className="mb-2 block">Crawling Depth</Label>
          <select
            id="crawling-depth"
            className="w-full p-2 border rounded-md"
            value={crawlingDepth}
            onChange={(e) => setCrawlingDepth(Number(e.target.value))}
          >
            <option value={1}>1 - Homepage only</option>
            <option value={2}>2 - Homepage + linked pages</option>
            <option value={3}>3 - Deep crawl</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            Higher depth means more pages will be crawled, but will take longer.
          </p>
        </div>
        
        <Button 
          className="w-full"
          onClick={handleAddWebsite}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Plus size={16} className="mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      
      {savedWebsites.length > 0 && (
        <>
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg mb-4 mt-8">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm">2</span>
                Manage Websites
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setSavedWebsites(savedWebsites.map(w => ({...w, selected: true})))}>
                Select All
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {savedWebsites.map((website) => (
              <div key={website.id} className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" checked={website.selected} />
                  <span>{website.url}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${website.trained ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {website.trained ? 'Trained' : 'Not Trained'}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteWebsite(website.id)}>
                    &times;
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleTrainAll}>
            Train GPT
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
