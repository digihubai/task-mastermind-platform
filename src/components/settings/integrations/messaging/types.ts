
export interface MessagingServiceProps {
  connected?: boolean;
  connecting?: string | null;
  onConnect?: (id: string) => void;
  onDisconnect?: (id: string) => void;
}

export interface MessagingService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  connected: boolean;
}

export interface EmailConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  secure: boolean;
}

export interface NumberSearchParams {
  country: string;
  areaCode: string;
  type: string;
}

export interface PhoneNumber {
  id: string;
  number: string;
  capabilities: string[];
  region: string;
  monthlyPrice: number;
}
