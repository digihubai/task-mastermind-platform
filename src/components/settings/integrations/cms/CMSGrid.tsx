
import React from 'react';
import CMSCard from './CMSCard';
import { cmsPlatforms, CMSPlatform } from './cms-platforms-data';

interface CMSGridProps {
  urls: Record<string, string>;
  connected: Record<string, boolean>;
  connecting: string | null;
  onInputChange: (platform: string, value: string) => void;
  onConnect: (platform: string) => void;
  onDisconnect: (platform: string) => void;
  filter?: 'all' | 'cms' | 'ecommerce';
  searchQuery?: string;
}

const CMSGrid: React.FC<CMSGridProps> = ({
  urls,
  connected,
  connecting,
  onInputChange,
  onConnect,
  onDisconnect,
  filter = 'all',
  searchQuery = ''
}) => {
  // First filter by type (cms/ecommerce)
  const typeFilteredPlatforms = filter === 'all' 
    ? cmsPlatforms
    : cmsPlatforms.filter(platform => platform.type === filter);
  
  // Then apply the search filter if there's a query
  const filteredPlatforms = searchQuery.trim() === ''
    ? typeFilteredPlatforms
    : typeFilteredPlatforms.filter(platform => 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        platform.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredPlatforms.length > 0 ? (
        filteredPlatforms.map((platform: CMSPlatform) => (
          <CMSCard
            key={platform.id}
            platform={platform.id}
            name={platform.name}
            description={platform.description}
            icon={platform.icon}
            backgroundColor={platform.backgroundColor}
            textColor={platform.textColor}
            url={urls[platform.id]}
            connected={connected[platform.id]}
            connecting={connecting === platform.id}
            onInputChange={(value) => onInputChange(platform.id, value)}
            onConnect={() => onConnect(platform.id)}
            onDisconnect={() => onDisconnect(platform.id)}
          />
        ))
      ) : (
        <div className="col-span-3 py-8 text-center">
          <p className="text-muted-foreground">No platforms match your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default CMSGrid;
