
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FooterLinkInputProps {
  footerLink: string;
  updateInfo: (key: string, value: any) => void;
}

export const FooterLinkInput: React.FC<FooterLinkInputProps> = ({ footerLink, updateInfo }) => {
  return (
    <div>
      <Label htmlFor="footerLink">Footer Link</Label>
      <Input
        id="footerLink"
        value={footerLink}
        onChange={(e) => updateInfo("footerLink", e.target.value)}
        placeholder="https://digihub.ai"
        className="mt-2"
      />
    </div>
  );
};
