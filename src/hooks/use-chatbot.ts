
import { useState, useEffect } from 'react';
import { ChatBotMessage, ChatConfig } from '@/types/support';
import { useToast } from '@/hooks/use-toast';

const defaultConfig: ChatConfig = {
  initialMessage: "Hi there! I'm your AI assistant. How can I help you today?",
  modelName: "gpt-4",
  maxTokens: 150,
  temperature: 0.7
};

export function useChatbot(customConfig?: Partial<ChatConfig>) {
  const [messages, setMessages] = useState<ChatBotMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Merge default config with custom config
  const config = { ...defaultConfig, ...customConfig };
  
  useEffect(() => {
    // Add the initial bot message when the component mounts
    const initialMessage: ChatBotMessage = {
      id: Date.now().toString(),
      content: config.initialMessage,
      timestamp: new Date().toISOString(),
      sender: 'bot'
    };
    
    setMessages([initialMessage]);
  }, [config.initialMessage]);
  
  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;
    
    // Add user message to the chat
    const userMessageObj: ChatBotMessage = {
      id: Date.now().toString(),
      content: userMessage,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessageObj]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate AI response (in a real app, this would be an API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample responses based on user input
      let botResponse = "I'm not sure how to respond to that. Can you try asking something else?";
      
      if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        botResponse = "Hello! How can I assist you today?";
      } else if (userMessage.toLowerCase().includes('help')) {
        botResponse = "I'd be happy to help! What specific information or assistance do you need?";
      } else if (userMessage.toLowerCase().includes('feature') || userMessage.toLowerCase().includes('plan')) {
        botResponse = "We offer several plans with different features. The Starter plan includes basic features, while Professional and Enterprise plans offer more advanced capabilities. Would you like more specific information about any plan?";
      } else if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
        botResponse = "Our pricing starts at $29/month for the Starter plan, $79/month for Professional, and $199/month for Enterprise. All plans have annual options with discounts.";
      } else if (userMessage.toLowerCase().includes('support')) {
        botResponse = "We offer 24/7 customer support for all plans. Enterprise customers get priority support with dedicated account managers.";
      }
      
      // Add bot response to the chat
      const botMessageObj: ChatBotMessage = {
        id: Date.now().toString(),
        content: botResponse,
        timestamp: new Date().toISOString(),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessageObj]);
    } catch (err) {
      setError("Failed to get response. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearChat = () => {
    // Reset to just the initial message
    const initialMessage: ChatBotMessage = {
      id: Date.now().toString(),
      content: config.initialMessage,
      timestamp: new Date().toISOString(),
      sender: 'bot'
    };
    
    setMessages([initialMessage]);
    setError(null);
  };
  
  return {
    messages,
    sendMessage,
    clearChat,
    isLoading,
    error
  };
}
