
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  language: string;
  updateInfo: (key: string, value: any) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, updateInfo }) => {
  return (
    <div>
      <Label htmlFor="language">Language</Label>
      <Select
        value={language}
        onValueChange={(value) => updateInfo("language", value)}
      >
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Auto</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="de">German</SelectItem>
          <SelectItem value="it">Italian</SelectItem>
          <SelectItem value="pt">Portuguese</SelectItem>
          <SelectItem value="ru">Russian</SelectItem>
          <SelectItem value="zh">Chinese</SelectItem>
          <SelectItem value="ja">Japanese</SelectItem>
          <SelectItem value="ko">Korean</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
