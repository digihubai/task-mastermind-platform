
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

// Generate content based on title, outline, and keywords
export const generateContentAI = async (
  title: string,
  outline: string,
  keywords: string[]
): Promise<string> => {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    throw new Error("OpenAI API key is not configured");
  }

  try {
    console.log("Generating content with OpenAI...");
    console.log("Title:", title);
    console.log("Keywords:", keywords);

    // Prepare the prompt for content generation
    const prompt = `
      Write a comprehensive SEO-optimized article on "${title}".
      
      Use the following outline:
      ${outline}
      
      Incorporate these keywords naturally: ${keywords.join(", ")}.
      
      Guidelines:
      - Write in a professional, engaging tone
      - Make content easily scannable with appropriate headings and subheadings
      - Use HTML formatting (<h2>, <h3>, <p>, <ul>, etc.) for proper structure
      - Include a compelling introduction and conclusion
      - Aim for around 1000-1500 words of detailed, valuable content
      - Ensure content is original and provides genuine value to readers
      - Format the content in clean HTML for web publishing
    `;

    // Make request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using GPT-4o mini for good balance of cost/quality
        messages: [
          {
            role: "system",
            content: "You are a skilled SEO content writer. Your task is to create high-quality, original content optimized for search engines while maintaining readability and value for human readers."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API request failed: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Log usage for tracking purposes
    console.log("Content generation successful. Tokens used:", data.usage?.total_tokens || "unknown");
    
    return generatedContent;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

// Generate keyword suggestions based on a topic
export const generateKeywordsAI = async (topic: string, count: number = 10): Promise<string[]> => {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    throw new Error("OpenAI API key is not configured");
  }
  
  try {
    const prompt = `
      Generate ${count} SEO-optimized keyword suggestions for the topic: "${topic}".
      
      Include:
      - Primary keywords
      - Long-tail variations
      - Question-based keywords
      
      Format the result as a simple list of keywords without any additional text.
    `;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an SEO expert specializing in keyword research. Generate relevant keywords that would drive traffic."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API request failed: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    const rawKeywords = data.choices[0].message.content;
    
    // Parse the keywords from the response
    const keywordList = rawKeywords
      .split("\n")
      .map(k => k.trim())
      .filter(k => k && !k.startsWith("-") && !k.match(/^\d+\./))
      .map(k => k.replace(/^[-*•]/, "").trim());
      
    return keywordList;
  } catch (error) {
    console.error("Error generating keyword suggestions:", error);
    throw error;
  }
};

// Generate titles based on topic and keywords
export const generateTitlesAI = async (
  topic: string, 
  keywords: string[], 
  count: number = 5
): Promise<string[]> => {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    throw new Error("OpenAI API key is not configured");
  }
  
  try {
    const prompt = `
      Generate ${count} catchy, SEO-optimized title suggestions for an article about: "${topic}"
      
      Important keywords to include where appropriate: ${keywords.join(", ")}
      
      Guidelines:
      - Titles should be 50-60 characters long
      - Include numbers when appropriate
      - Use power words that attract attention
      - Make titles clear and benefit-driven
      
      Format the result as a simple list of titles without any additional text.
    `;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a copywriter specializing in creating compelling SEO headlines that drive clicks."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API request failed: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    const rawTitles = data.choices[0].message.content;
    
    // Parse the titles from the response
    const titleList = rawTitles
      .split("\n")
      .map(t => t.trim())
      .filter(t => t && !t.startsWith("-") && !t.match(/^\d+\./))
      .map(t => t.replace(/^[-*•\d+\.]+/, "").trim());
      
    return titleList;
  } catch (error) {
    console.error("Error generating title suggestions:", error);
    throw error;
  }
};

// Generate outline based on title, topic and keywords
export const generateOutlineAI = async (
  topic: string,
  keywords: string[],
  title: string
): Promise<any> => {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    throw new Error("OpenAI API key is not configured");
  }
  
  try {
    const prompt = `
      Create a detailed outline for an SEO article titled: "${title}"
      
      Topic: ${topic}
      Important keywords to include: ${keywords.join(", ")}
      
      The outline should include:
      - Introduction
      - 4-6 main sections with subsections
      - Conclusion
      
      Format the outline with proper HTML heading tags (<h2>, <h3>) and use <ul> for bullet points.
    `;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert content strategist. Create organized, logical outlines for SEO content."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API request failed: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    const outlineContent = data.choices[0].message.content;
    
    // Parse the outline into a structured format
    const sections = outlineContent
      .split(/\n+/)
      .filter(line => line.trim().length > 0)
      .map(line => line.trim());
    
    return {
      raw: outlineContent,
      sections: sections
    };
  } catch (error) {
    console.error("Error generating content outline:", error);
    throw error;
  }
};

export default {
  getOpenAIApiKey,
  setOpenAIApiKey,
  clearOpenAIApiKey,
  isValidOpenAIApiKey,
  testOpenAIApiKey,
  validateAPIKey,
  generateContentAI,
  generateKeywordsAI,
  generateTitlesAI,
  generateOutlineAI,
};
