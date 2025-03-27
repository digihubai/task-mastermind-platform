
import React from "react";
import { Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface TextEditorProps {
  originalText: string;
  setOriginalText: (text: string) => void;
  rewrittenText: string;
  handleReset: () => void;
  handleCopyToClipboard: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  originalText,
  setOriginalText,
  rewrittenText,
  handleReset,
  handleCopyToClipboard,
}) => {
  return (
    <Tabs defaultValue="input" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="input">Original Text</TabsTrigger>
        <TabsTrigger value="output">Rewritten Text</TabsTrigger>
      </TabsList>
      
      <TabsContent value="input">
        <Textarea
          placeholder="Enter the text you want to rewrite..."
          className="min-h-[300px] resize-none"
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
        />
      </TabsContent>
      
      <TabsContent value="output">
        <Textarea
          placeholder="Rewritten text will appear here..."
          className="min-h-[300px] resize-none"
          value={rewrittenText}
          readOnly
        />
      </TabsContent>
      
      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
        
        {rewrittenText && (
          <Button 
            variant="outline" 
            onClick={handleCopyToClipboard}
            className="gap-2"
          >
            <Copy size={16} />
            Copy
          </Button>
        )}
      </div>
    </Tabs>
  );
};

export default TextEditor;
