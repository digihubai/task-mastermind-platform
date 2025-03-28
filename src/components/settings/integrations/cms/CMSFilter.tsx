
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe, ShoppingCart } from "lucide-react";

interface CMSFilterProps {
  filter: 'all' | 'cms' | 'ecommerce';
  onFilterChange: (filter: 'all' | 'cms' | 'ecommerce') => void;
}

const CMSFilter: React.FC<CMSFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('all')}
      >
        All Platforms
      </Button>
      <Button
        variant={filter === 'cms' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('cms')}
      >
        <Globe className="mr-1 h-4 w-4" />
        CMS Only
      </Button>
      <Button
        variant={filter === 'ecommerce' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('ecommerce')}
      >
        <ShoppingCart className="mr-1 h-4 w-4" />
        eCommerce Only
      </Button>
    </div>
  );
};

export default CMSFilter;
