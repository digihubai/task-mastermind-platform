
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Check, Save } from 'lucide-react';
import { SavedReply } from '../mock-data/saved-replies';
import { Badge } from "@/components/ui/badge";

interface SavedRepliesSelectorProps {
  savedReplies: SavedReply[];
  onSelectReply: (content: string) => void;
}

const SavedRepliesSelector: React.FC<SavedRepliesSelectorProps> = ({
  savedReplies,
  onSelectReply
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(savedReplies.map(reply => reply.category)));
  
  // Filter replies by selected category
  const filteredReplies = selectedCategory 
    ? savedReplies.filter(reply => reply.category === selectedCategory)
    : savedReplies;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Save className="h-4 w-4" />
          <span>Saved Replies</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search saved replies..." />
          <CommandList>
            <CommandEmpty>No saved replies found.</CommandEmpty>
            <CommandGroup heading="Categories">
              <div className="flex flex-wrap gap-1 p-2">
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Badge>
                {categories.map(category => (
                  <Badge 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CommandGroup>
            <CommandGroup heading="Replies">
              {filteredReplies.map(reply => (
                <CommandItem 
                  key={reply.id}
                  onSelect={() => {
                    onSelectReply(reply.content);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col space-y-1 flex-1">
                    <div className="flex items-center">
                      <Check className={`mr-2 h-4 w-4 ${selectedCategory === reply.category ? "opacity-100" : "opacity-0"}`} />
                      <span className="font-medium">{reply.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{reply.content}</p>
                    <div className="flex gap-1 mt-1">
                      {reply.tags.map(tag => (
                        <span key={tag} className="text-xs bg-muted px-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SavedRepliesSelector;
