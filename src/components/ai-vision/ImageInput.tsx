
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ImageInputProps {
  imagePreview: string | null;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isAnalyzing: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearImage: () => void;
  handleAnalyze: () => void;
}

const ImageInput = ({
  imagePreview,
  prompt,
  setPrompt,
  isAnalyzing,
  handleFileChange,
  handleClearImage,
  handleAnalyze
}: ImageInputProps) => {
  return (
    <>
      {imagePreview ? (
        <div className="space-y-4">
          <div className="relative border rounded-md overflow-hidden">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-auto max-h-[300px] object-contain bg-black/5"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={handleClearImage}
            >
              <RotateCcw size={16} />
            </Button>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Analysis Prompt (Optional)</label>
            <Textarea 
              placeholder="E.g., 'What objects are in this image?' or 'Generate a product description from this image'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-24 resize-none"
            />
          </div>
          
          <Button 
            className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>Analyzing image...</>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Analyze Image
              </>
            )}
          </Button>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-base font-medium">Upload an image</h4>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Drag and drop or click to browse
            </p>
            <Button variant="outline" size="sm">
              Select Image
            </Button>
            <input 
              type="file" 
              id="image-upload" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageInput;
