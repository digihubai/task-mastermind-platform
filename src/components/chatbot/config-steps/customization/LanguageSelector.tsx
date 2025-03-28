
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  language: string;
  updateInfo: (key: string, value: any) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, updateInfo }) => {
  // Define language options
  const languageOptions = [
    { value: "auto", label: "Auto (Browser Default)" },
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "pt", label: "Portuguese" },
    { value: "it", label: "Italian" },
    { value: "ru", label: "Russian" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "ar", label: "Arabic" },
  ];

  return (
    <div>
      <Label htmlFor="language">Language</Label>
      <Select
        value={language}
        onValueChange={(value) => updateInfo("language", value)}
      >
        <SelectTrigger className="w-full mt-2">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground mt-1">
        This affects date formatting and language detection.
      </p>
    </div>
  );
};
