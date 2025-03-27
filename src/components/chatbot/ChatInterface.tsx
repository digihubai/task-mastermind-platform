
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useChatbot } from '@/hooks/use-chatbot';
import { Bot, Send, RefreshCw, X, ChevronUp, ChevronDown } from 'lucide-react';
import { ChatConfig } from '@/types/support';
import { Avatar } from '@/components/ui/avatar';

interface ChatInterfaceProps {
  config?: Partial<ChatConfig>;
  className?: string;
  title?: string;
  showHeader?: boolean;
  showBranding?: boolean;
  avatarUrl?: string;
  variant?: 'default' | 'embedded' | 'minimalist';
  onClose?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  config, 
  className = '',
  title = 'AI Assistant',
  showHeader = true,
  showBranding = false,
  avatarUrl,
  variant = 'default',
  onClose
}) => {
  const { messages, sendMessage, clearChat, isLoading } = useChatbot(config);
  const [inputValue, setInputValue] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <Card className={`flex flex-col ${variant === 'embedded' ? 'h-full' : 'h-[500px]'} border border-border/40 rounded-lg overflow-hidden ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot size={18} className="text-white" />
            </div>
            <span className="font-medium">{title}</span>
          </div>
          <div className="flex gap-1">
            {variant !== 'embedded' && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            )}
            {onClose && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={onClose}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>
      )}
      
      {!isCollapsed && (
        <>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="mr-2 flex-shrink-0">
                      <Avatar className="h-8 w-8 border">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="Bot" />
                        ) : (
                          <Bot size={16} />
                        )}
                      </Avatar>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t border-border/60 bg-card">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="bg-primary text-primary-foreground rounded-full h-9 w-9 p-2"
              >
                <Send size={16} />
                <span className="sr-only">Send</span>
              </Button>
            </div>
            
            {showBranding && (
              <div className="mt-2 text-center">
                <span className="text-xs text-muted-foreground">
                  Powered by <span className="font-semibold">Digihub</span>
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
};
