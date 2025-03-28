
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, ShoppingCart, Search } from "lucide-react";
import { CMSFilterProps } from './types';

const CMSFilter: React.FC<CMSFilterProps> = ({ 
  filter, 
  searchQuery, 
  onFilterChange,
  onSearchChange 
}) => {
  return (
    <div className="space-y-3 mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search platforms..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
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
    </div>
  );
};

export default CMSFilter;
