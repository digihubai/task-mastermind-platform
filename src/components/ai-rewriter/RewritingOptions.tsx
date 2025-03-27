
import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RewritingOptionsProps {
  tone: string;
  setTone: (value: string) => void;
  style: string;
  setStyle: (value: string) => void;
  handleRewrite: () => void;
  isRewriting: boolean;
  hasOriginalText: boolean;
}

const RewritingOptions: React.FC<RewritingOptionsProps> = ({
  tone,
  setTone,
  style,
  setStyle,
  handleRewrite,
  isRewriting,
  hasOriginalText
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1.5 block">Tone</label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger>
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
            <SelectItem value="serious">Serious</SelectItem>
            <SelectItem value="friendly">Friendly</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1.5 block">Style</label>
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="concise">Concise</SelectItem>
            <SelectItem value="detailed">Detailed</SelectItem>
            <SelectItem value="persuasive">Persuasive</SelectItem>
            <SelectItem value="simple">Simple</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="instructional">Instructional</SelectItem>
            <SelectItem value="conversational">Conversational</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        className="w-full mt-4 gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
        onClick={handleRewrite}
        disabled={isRewriting || !hasOriginalText}
      >
        {isRewriting ? (
          <>Processing...</>
        ) : (
          <>
            <Sparkles size={16} />
            Rewrite Content
          </>
        )}
      </Button>
    </div>
  );
};

export default RewritingOptions;
