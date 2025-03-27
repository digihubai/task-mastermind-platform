
import React from "react";
import { Edit } from "lucide-react";

interface TipsListProps {
  tips: string[];
}

const TipsList: React.FC<TipsListProps> = ({ tips }) => {
  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {tips.map((tip, index) => (
        <li key={index} className="flex gap-2">
          <Edit className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  );
};

export default TipsList;
