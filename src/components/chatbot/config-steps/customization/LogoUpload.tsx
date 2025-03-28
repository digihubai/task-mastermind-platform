
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface LogoUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const LogoUpload: React.FC<LogoUploadProps> = ({ fileInputRef }) => {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload logic here
      // For now, we'll just update the UI to show that a file was selected
      console.log("File selected:", e.target.files[0].name);
      // In a real implementation, you would upload this file to a server
      // and get back a URL to store in chatbotInfo.logo
    }
  };

  return (
    <div>
      <Label htmlFor="logo">Upload Logo</Label>
      <div className="mt-2">
        <Input 
          id="logo"
          type="file" 
          ref={fileInputRef}
          onChange={handleLogoUpload}
          className="hidden"
          accept="image/*"
        />
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between"
          onClick={() => fileInputRef.current?.click()}
        >
          <span>Choose File</span>
          <Upload size={16} />
        </Button>
        <p className="text-xs text-muted-foreground mt-1">No file chosen</p>
      </div>
    </div>
  );
};
