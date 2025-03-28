
import { useState, useEffect } from 'react';
import { ChatBotMessage, ChatConfig } from '@/types/support';
import { useToast } from '@/hooks/use-toast';

const defaultConfig: ChatConfig = {
  initialMessage: "Hi there! 👋 I'm your AI assistant. How can I help you today?",
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
      
      // Enhanced response logic based on user input
      let botResponse = "I'm not sure how to respond to that. Can you try asking something else? 🤔";
      const lowercasedInput = userMessage.toLowerCase();
      
      // General greetings
      if (lowercasedInput.match(/hello|hi|hey|greetings|good (morning|afternoon|evening)/i)) {
        botResponse = "Hello! 👋 How can I assist you today with Digihub?";
      }
      // Help related
      else if (lowercasedInput.includes('help')) {
        botResponse = "I'd be happy to help! 😊 You can ask me about Digihub's features, pricing plans, or how to use specific tools like our AI bots, marketing automation, or CRM features.";
      }
      // Features
      else if (lowercasedInput.match(/feature|capability|can you|what.*(do|does)|function/i)) {
        botResponse = "Digihub offers a comprehensive suite of AI-powered tools including CRM, marketing automation, sales automation, customer support, project management, accounting, and HR. 🚀 Our AI agents can handle repetitive tasks while still allowing for human intervention when needed. Which area would you like to know more about?";
      }
      // Pricing related
      else if (lowercasedInput.match(/price|cost|subscription|plan|payment|billing/i)) {
        botResponse = "Digihub offers flexible pricing tiers to suit businesses of all sizes. 💰 Our plans start at $29/month for essential features, with advanced plans at $79/month and enterprise solutions at $199/month. All plans include AI agents, with varying levels of capability and customization. Would you like specific details about any plan?";
      }
      // Support related
      else if (lowercasedInput.match(/support|contact|help desk|ticket|issue|problem/i)) {
        botResponse = "We offer 24/7 support for all Digihub users. 🛟 You can create a support ticket directly from your dashboard, use our knowledge base, or chat with our support team. Enterprise customers receive dedicated account managers for priority assistance. How can I help with your support needs?";
      }
      // AI capabilities
      else if (lowercasedInput.match(/ai|artificial intelligence|machine learning|automation|bot/i)) {
        botResponse = "Digihub's AI technology can automate numerous tasks across your business. 🤖 Our AI agents can manage customer data, handle support queries, qualify leads, create content, analyze data, and more. They're designed to handle routine tasks while allowing human takeover for complex situations. Would you like a demo of a specific AI capability?";
      }
      // CRM related
      else if (lowercasedInput.match(/crm|customer relationship|lead|contact|sales pipeline/i)) {
        botResponse = "Digihub's CRM integrates with popular platforms like Salesforce and HubSpot. 📊 Our AI can autonomously manage customer data, track sales pipelines, and handle routine communications. For high-value accounts or complex scenarios, the system allows seamless handoff to human team members. Would you like to know about specific CRM features?";
      }
      // Marketing related
      else if (lowercasedInput.match(/marketing|campaign|email|lead generation|audience/i)) {
        botResponse = "Our marketing automation tools integrate with platforms like Marketo and ActiveCampaign. 📧 The AI can segment audiences, score leads, optimize send times, and analyze campaign performance. Human marketers can take over to refine campaigns or handle complex marketing strategies when needed. What specific marketing capabilities are you interested in?";
      }
      // Thanks/gratitude
      else if (lowercasedInput.match(/thanks|thank you|appreciate|grateful/i)) {
        botResponse = "You're welcome! 😄 I'm happy to help. Is there anything else you'd like to know about Digihub?";
      }
      // Refunds or cancellations
      else if (lowercasedInput.match(/refund|cancel|money back|return/i)) {
        botResponse = "A refund will be provided after we process your return item at our facilities. It may take additional time for your financial institution to process the refund. 😊 Do you need help with initiating this process?";
      }
      // Understanding current tools
      else if (lowercasedInput.match(/current|using|tool|software/i)) {
        botResponse = "Digihub can integrate with many of your existing tools! 🔄 We support connections with CRMs like Salesforce, marketing platforms like Marketo, accounting systems like QuickBooks, and project management tools like Jira or Asana. This allows for a smooth transition while enhancing your capabilities with AI. Which systems are you currently using?";
      }
      // Demo request
      else if (lowercasedInput.match(/demo|demonstration|show me|example/i)) {
        botResponse = "I'd be happy to arrange a personalized demo of Digihub! 🎯 Our product specialists can show you how our AI-powered platform can streamline your specific workflows. Would you prefer a live demo session or a recorded walkthrough of particular features?";
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
