
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EnhancedGiphyPickerProps {
  onSelect: (gifUrl: string) => void;
  onClose: () => void;
}

// Mocked Giphy data for the UI with more extensive options
const mockTrendingGifs = [
  { id: "1", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHh3aDlwdWc3a3V0OXNwMHI0dXQwZGgwNG94dHlmeXo3cjNpM2FhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohzdIrB4Ri2RnGuJy/giphy.gif", alt: "Excited" },
  { id: "2", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5jNWQzYzc3cmh3cXB5dnhodGhranM5Z2dpc3l2d2llZHNyeDBhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g96QRNjWUvdKw/giphy.gif", alt: "Thumbs up" },
  { id: "3", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWp5MzR4c3ZzZXRwenU4OXYybWU5YnAyZDd1bjg5bmFreThpZ3ExaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2R06WPHU4ae0H4LC/giphy.gif", alt: "Dancing" },
  { id: "4", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDU2a2dkcjV5dzdobG84dzEzbXB3M3N0ZmxtYnZpcXF0ODN0bTI2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QX15lZJbifeaA/giphy.gif", alt: "Celebration" },
  { id: "5", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmh2anQ3a2M2cHduM2k0ZGhzOXY3ODFrdWptdGVtMnk0aG8yZnRwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QYkX9IMHthYn0Y3pcG/giphy.gif", alt: "Coding" },
  { id: "6", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGJqcWdvYzNxMHNpbmRieWhxOHB6bTcxZXptbzNlODk5bG9pM21jbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hrO9r5G0Af0aA/giphy.gif", alt: "Mind blown" },
  { id: "7", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamw0cmljMHRyZGh4NWQ5a2Jkem5tdTU1OHZkdHFtOHRpMWJhd3k1cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vR16pONf8R7pDLW/giphy.gif", alt: "Happy" },
  { id: "8", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmE2MjN1bjNqNnF6OThodHM0NnExdmNmNzNjMzR6ejVxbDJhN2gybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378zKVk7Eh3yHoJi/giphy.gif", alt: "Working" },
];

const mockReactionGifs = [
  { id: "r1", url: "https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif", alt: "OMG" },
  { id: "r2", url: "https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif", alt: "Working" },
  { id: "r3", url: "https://media.giphy.com/media/3oEjHYibHwRL7mrNyo/giphy.gif", alt: "Love it" },
  { id: "r4", url: "https://media.giphy.com/media/ejJmQ6FPJrQKVy5QVz/giphy.gif", alt: "Thumbs up" },
  { id: "r5", url: "https://media.giphy.com/media/3ohzdIrB4Ri2RnGuJy/giphy.gif", alt: "Excited" },
  { id: "r6", url: "https://media.giphy.com/media/YrBRYRDN4M5ryrNOND/giphy.gif", alt: "Funny" },
  { id: "r7", url: "https://media.giphy.com/media/ghuvaCOI6GOoTX0RmH/giphy.gif", alt: "Shocked" },
  { id: "r8", url: "https://media.giphy.com/media/uFymf8Kke4mTVlvwtg/giphy.gif", alt: "Thanks" },
];

const mockEmoticonGifs = [
  { id: "e1", url: "https://media.giphy.com/media/11HkufO2i4WR7W/giphy.gif", alt: "Laughing" },
  { id: "e2", url: "https://media.giphy.com/media/XFudH8zVnGfWE/giphy.gif", alt: "Crying" },
  { id: "e3", url: "https://media.giphy.com/media/3o72F8t9TDi2xVnxOE/giphy.gif", alt: "Angry" },
  { id: "e4", url: "https://media.giphy.com/media/l2YWrZKAM4JRbhsGY/giphy.gif", alt: "Surprised" },
  { id: "e5", url: "https://media.giphy.com/media/10LKovKon8DENq/giphy.gif", alt: "Tired" },
  { id: "e6", url: "https://media.giphy.com/media/q1MeAPDDMb43K/giphy.gif", alt: "Thinking" },
];

const EnhancedGiphyPicker: React.FC<EnhancedGiphyPickerProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; url: string; alt?: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");

  // This would be replaced with an actual Giphy API call
  const searchGifs = (query: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // For demo, just filter the trending gifs based on the query
      const results = mockTrendingGifs.filter(gif => 
        gif.alt?.toLowerCase().includes(query.toLowerCase())
      );
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
    // Set initial content based on active tab
    if (activeTab === "trending") {
      setSearchResults(mockTrendingGifs);
    } else if (activeTab === "reactions") {
      setSearchResults(mockReactionGifs);
    } else if (activeTab === "emoticons") {
      setSearchResults(mockEmoticonGifs);
    }
  }, [activeTab]);

  return (
    <div className="bg-background border rounded-lg shadow-lg p-4 w-full max-w-md animate-fade-in">
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

      <Tabs defaultValue="trending" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="reactions">Reactions</TabsTrigger>
          <TabsTrigger value="emoticons">Emoticons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="mt-2">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ScrollArea className="h-[300px]">
              <div className="grid grid-cols-2 gap-2">
                {searchResults.map((gif) => (
                  <div 
                    key={gif.id}
                    className="cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-colors relative group"
                    onClick={() => onSelect(gif.url)}
                  >
                    <img
                      src={gif.url}
                      alt={gif.alt || "GIF"}
                      className="w-full h-24 object-cover"
                    />
                    {gif.alt && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {gif.alt}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
        
        <TabsContent value="reactions" className="mt-2">
          <ScrollArea className="h-[300px]">
            <div className="grid grid-cols-2 gap-2">
              {mockReactionGifs.map((gif) => (
                <div 
                  key={gif.id}
                  className="cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-colors relative group"
                  onClick={() => onSelect(gif.url)}
                >
                  <img
                    src={gif.url}
                    alt={gif.alt || "GIF"}
                    className="w-full h-24 object-cover"
                  />
                  {gif.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {gif.alt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="emoticons" className="mt-2">
          <ScrollArea className="h-[300px]">
            <div className="grid grid-cols-2 gap-2">
              {mockEmoticonGifs.map((gif) => (
                <div 
                  key={gif.id}
                  className="cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-colors relative group"
                  onClick={() => onSelect(gif.url)}
                >
                  <img
                    src={gif.url}
                    alt={gif.alt || "GIF"}
                    className="w-full h-24 object-cover"
                  />
                  {gif.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {gif.alt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground mt-4 text-center">
        Powered by Giphy
      </div>
    </div>
  );
};

export default EnhancedGiphyPicker;
