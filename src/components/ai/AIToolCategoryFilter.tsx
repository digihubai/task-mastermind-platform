
import React from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
}

interface AIToolCategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const AIToolCategoryFilter = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}: AIToolCategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          onClick={() => setActiveCategory(category.id)}
          className="whitespace-nowrap"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default AIToolCategoryFilter;
