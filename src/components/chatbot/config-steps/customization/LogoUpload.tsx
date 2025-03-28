
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface LogoUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const LogoUpload: React.FC<LogoUploadProps> = ({ fileInputRef }) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload logic here
      const file = e.target.files[0];
      console.log("File selected:", file.name);
      setSelectedFileName(file.name);
      toast.success(`File "${file.name}" selected successfully`);
      // In a real implementation, you would upload this file to a server
      // and get back a URL to store in chatbotInfo.logo
    }
  };

  return (
    <div>
      <Label htmlFor="logo">Upload Logo</Label>
      <p className="text-sm text-muted-foreground mb-2">Upload your brand logo to display in the chatbot.</p>
      <div className="mt-2">
        <Input 
          id="logo"
          type="file" 
          ref={fileInputRef}
          onChange={handleLogoUpload}
          className="hidden"
          accept="image/*, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between"
            onClick={() => fileInputRef.current?.click()}
          >
            <span>{selectedFileName || "Choose File"}</span>
            <Upload size={16} />
          </Button>
          <p className="text-xs text-muted-foreground">
            {selectedFileName ? `Selected: ${selectedFileName}` : "No file chosen"}
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, SVG, GIF, PDF, Excel, etc.
          </p>
        </div>
      </div>
    </div>
  );
};
