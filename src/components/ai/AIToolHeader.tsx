
import React from "react";

interface AIToolHeaderProps {
  title: string;
  description: string;
}

const AIToolHeader = ({ title, description }: AIToolHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-1">
        {description}
      </p>
    </div>
  );
};

export default AIToolHeader;
