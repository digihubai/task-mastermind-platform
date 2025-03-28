
import { ReactNode } from 'react';

export interface AnalyticsServiceProps {
  service: string;
  name: string;
  description: string;
  icon: ReactNode;
  backgroundColor: string;
  apiKey: string;
  connected: boolean;
  connecting: boolean;
  onInputChange: (value: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export interface SEOAnalyticsServiceState {
  connected: {[key: string]: boolean};
  apiKeys: {[key: string]: string};
}
