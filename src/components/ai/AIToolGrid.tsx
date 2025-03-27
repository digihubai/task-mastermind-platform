
import React from "react";
import AIToolCard from "./AIToolCard";

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  category: string;
  badge?: string;
  color: string;
}

interface AIToolGridProps {
  tools: AITool[];
  onToolClick: (path: string) => void;
}

const AIToolGrid = ({ tools, onToolClick }: AIToolGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <AIToolCard
          key={tool.id}
          id={tool.id}
          name={tool.name}
          description={tool.description}
          icon={tool.icon}
          path={tool.path}
          category={tool.category}
          badge={tool.badge}
          color={tool.color}
          onClick={onToolClick}
        />
      ))}
    </div>
  );
};

export default AIToolGrid;
