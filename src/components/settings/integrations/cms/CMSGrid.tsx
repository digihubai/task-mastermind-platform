
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
}

const CMSGrid: React.FC<CMSGridProps> = ({
  urls,
  connected,
  connecting,
  onInputChange,
  onConnect,
  onDisconnect,
  filter = 'all'
}) => {
  const filteredPlatforms = filter === 'all' 
    ? cmsPlatforms
    : cmsPlatforms.filter(platform => platform.type === filter);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredPlatforms.map((platform: CMSPlatform) => (
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
      ))}
    </div>
  );
};

export default CMSGrid;
