
import React from "react";
import { Upload as UploadIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface VisionUploaderProps {
  imagePreview: string | null;
  onImageUpload: (file: File) => void;
  onRemoveImage: () => void;
}

const VisionUploader = ({ 
  imagePreview, 
  onImageUpload, 
  onRemoveImage 
}: VisionUploaderProps) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.includes('image/jpeg') || file.type.includes('image/png') || file.type.includes('image/webp'))) {
      onImageUpload(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, or WEBP image.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-6 py-10">
      <div className="flex flex-col items-center mb-6">
        <h3 className="text-lg font-medium mb-2">Upload an image and ask me anything</h3>
        <ChevronDown size={18} className="text-muted-foreground" />
      </div>

      <Card 
        className="w-full max-w-2xl h-64 border-2 border-dashed flex flex-col items-center justify-center p-6"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <div className="relative w-full h-full">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={onRemoveImage}
            >
              Remove
            </Button>
          </div>
        ) : (
          <>
            <UploadIcon size={36} className="text-muted-foreground mb-4" />
            <p className="text-center font-medium mb-1">Drop your image here or browse</p>
            <p className="text-center text-sm text-muted-foreground mb-4">(Only jpg, png and webp will be accepted)</p>
            <Button asChild>
              <label>
                Browse Files
                <input 
                  type="file" 
                  accept="image/jpeg,image/png,image/webp" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default VisionUploader;
