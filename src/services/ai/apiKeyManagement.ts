
import { toast } from "sonner";

// Store the API key in memory for the session
let openAIApiKey: string | null = null;

// Helper to get the stored key
export const getOpenAIApiKey = (): string | null => {
  // Try to get from memory first
  if (openAIApiKey) return openAIApiKey;
  
  // Try to get from localStorage
  const storedKey = localStorage.getItem("openai_api_key");
  if (storedKey) {
    openAIApiKey = storedKey;
    return storedKey;
  }
  
  return null;
};

// Helper to set the API key
export const setOpenAIApiKey = (key: string): void => {
  openAIApiKey = key;
  localStorage.setItem("openai_api_key", key);
};

// Helper to clear the API key
export const clearOpenAIApiKey = (): void => {
  openAIApiKey = null;
  localStorage.removeItem("openai_api_key");
};

// Validate the API key format
export const isValidOpenAIApiKey = (key: string): boolean => {
  // Simple validation - OpenAI keys usually start with "sk-" and have a minimum length
  return key.startsWith("sk-") && key.length > 20;
};

// Test the API key by making a simple request
export const testOpenAIApiKey = async (key: string): Promise<boolean> => {
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error("Error testing OpenAI API key:", error);
    return false;
  }
};

// Validate the API key - this function is used by multiple components
export const validateAPIKey = async (key: string): Promise<boolean> => {
  if (!isValidOpenAIApiKey(key)) {
    toast.error("Invalid API key format. OpenAI keys start with 'sk-'");
    return false;
  }

  try {
    const isValid = await testOpenAIApiKey(key);
    
    if (isValid) {
      setOpenAIApiKey(key);
      return true;
    } else {
      toast.error("API key validation failed. Please check your key and try again.");
      return false;
    }
  } catch (error) {
    console.error("Error validating API key:", error);
    toast.error("Error validating API key. Please try again later.");
    return false;
  }
};
