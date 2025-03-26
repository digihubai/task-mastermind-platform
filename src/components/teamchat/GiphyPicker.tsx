
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GiphyPickerProps {
  onSelect: (gifUrl: string) => void;
  onClose: () => void;
}

// Mocked Giphy data for the UI
const mockTrendingGifs = [
  { id: "1", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHh3aDlwdWc3a3V0OXNwMHI0dXQwZGgwNG94dHlmeXo3cjNpM2FhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohzdIrB4Ri2RnGuJy/giphy.gif" },
  { id: "2", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5jNWQzYzc3cmh3cXB5dnhodGhranM5Z2dpc3l2d2llZHNyeDBhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g96QRNjWUvdKw/giphy.gif" },
  { id: "3", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWp5MzR4c3ZzZXRwenU4OXYybWU5YnAyZDd1bjg5bmFreThpZ3ExaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2R06WPHU4ae0H4LC/giphy.gif" },
  { id: "4", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDU2a2dkcjV5dzdobG84dzEzbXB3M3N0ZmxtYnZpcXF0ODN0bTI2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QX15lZJbifeaA/giphy.gif" },
  { id: "5", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmh2anQ3a2M2cHduM2k0ZGhzOXY3ODFrdWptdGVtMnk0aG8yZnRwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QYkX9IMHthYn0Y3pcG/giphy.gif" },
  { id: "6", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGJqcWdvYzNxMHNpbmRieWhxOHB6bTcxZXptbzNlODk5bG9pM21jbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hrO9r5G0Af0aA/giphy.gif" },
  { id: "7", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamw0cmljMHRyZGh4NWQ5a2Jkem5tdTU1OHZkdHFtOHRpMWJhd3k1cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vR16pONf8R7pDLW/giphy.gif" },
  { id: "8", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmE2MjN1bjNqNnF6OThodHM0NnExdmNmNzNjMzR6ejVxbDJhN2gybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378zKVk7Eh3yHoJi/giphy.gif" },
];

const GiphyPicker: React.FC<GiphyPickerProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; url: string }>>([]);
  const [loading, setLoading] = useState(false);

  // This would be replaced with an actual Giphy API call
  const searchGifs = (query: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // For demo, just filter the trending gifs based on the query
      const results = mockTrendingGifs.filter((_, index) => index % 2 === 0);
      setSearchResults(results);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchGifs(searchQuery);
    }
  };

  useEffect(() => {
    // Load trending gifs on initial render
    setSearchResults(mockTrendingGifs);
  }, []);

  return (
    <div className="bg-background border rounded-lg shadow-lg p-4 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">GIF Picker</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search GIFs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <Tabs defaultValue="trending">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="reactions">Reactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="mt-2">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
              {searchResults.map((gif) => (
                <div 
                  key={gif.id}
                  className="cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-colors"
                  onClick={() => onSelect(gif.url)}
                >
                  <img
                    src={gif.url}
                    alt="GIF"
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reactions" className="mt-2">
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
            {mockTrendingGifs.slice(4).map((gif) => (
              <div 
                key={gif.id}
                className="cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-colors"
                onClick={() => onSelect(gif.url)}
              >
                <img
                  src={gif.url}
                  alt="GIF"
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground mt-4 text-center">
        Powered by Giphy
      </div>
    </div>
  );
};

export default GiphyPicker;
