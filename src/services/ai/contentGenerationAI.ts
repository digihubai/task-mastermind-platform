
import { toast } from "sonner";
import { 
  generateMockSEOContent,
  generateContentWithImages 
} from "@/services/seoService";

// Constants for LocalStorage
const OPENAI_API_KEY_STORAGE = "openai_api_key";

// Helper to get API key from LocalStorage
export const getOpenAIApiKey = (): string | null => {
  return localStorage.getItem(OPENAI_API_KEY_STORAGE);
};

// Helper to set API key in LocalStorage
export const setOpenAIApiKey = (key: string): void => {
  localStorage.setItem(OPENAI_API_KEY_STORAGE, key);
};

// Helper to validate API key by making a test request to OpenAI
export const validateAPIKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    
    if (response.ok && data.data) {
      setOpenAIApiKey(apiKey);
      toast.success("API Key Validated", {
        description: "Your OpenAI API key has been validated and saved.",
      });
      return true;
    } else {
      toast.error("Invalid API Key", {
        description: data.error?.message || "Failed to validate your API key. Please check and try again.",
      });
      return false;
    }
  } catch (error) {
    console.error("Error validating API key:", error);
    toast.error("Validation Error", {
      description: "An error occurred while validating your API key. Please try again.",
    });
    return false;
  }
};

// Function to generate keywords using AI
export const generateKeywordsAI = async (topic: string, count: number = 10): Promise<string[]> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("API Key Required", {
      description: "Please configure your OpenAI API key in Settings > SEO Integrations",
    });
    return [];
  }
  
  try {
    console.log("Generating keywords for topic:", topic);
    
    // In production, this would call OpenAI API
    // For now, we'll simulate with dummy data
    const keywords = [
      topic,
      `best ${topic}`,
      `${topic} guide`,
      `${topic} tutorial`,
      `${topic} tips`,
      `how to ${topic}`,
      `${topic} strategies`,
      `${topic} examples`,
      `${topic} tools`,
      `${topic} benefits`
    ];
    
    return keywords.slice(0, count);
  } catch (error) {
    console.error("Error generating keywords:", error);
    toast.error("Failed to generate keywords");
    return [];
  }
};

// Function to generate titles using AI
export const generateTitlesAI = async (topic: string, keywords: string[]): Promise<string[]> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("API Key Required", {
      description: "Please configure your OpenAI API key in Settings > SEO Integrations",
    });
    return [];
  }
  
  try {
    console.log("Generating titles for topic:", topic, "with keywords:", keywords);
    
    // In production, this would call OpenAI API
    // For now, we'll simulate with dummy data
    const primaryKeyword = keywords[0] || topic;
    
    const titles = [
      `The Ultimate Guide to ${primaryKeyword}`,
      `10 Proven ${primaryKeyword} Strategies for 2023`,
      `How to Master ${primaryKeyword}: A Step-by-Step Guide`,
      `${primaryKeyword}: Everything You Need to Know`,
      `Why ${primaryKeyword} Matters for Your Business`
    ];
    
    return titles;
  } catch (error) {
    console.error("Error generating titles:", error);
    toast.error("Failed to generate titles");
    return [];
  }
};

// Function to generate outline using AI
export const generateOutlineAI = async (topic: string, keywords: string[], title: string): Promise<string> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("API Key Required", {
      description: "Please configure your OpenAI API key in Settings > SEO Integrations",
    });
    return "";
  }
  
  try {
    console.log("Generating outline for topic:", topic, "with title:", title);
    
    // In production, this would call OpenAI API
    // For now, we'll simulate with dummy data
    const primaryKeyword = keywords[0] || topic;
    
    return `# ${title}

## Introduction to ${primaryKeyword}
- What is ${primaryKeyword}
- Why ${primaryKeyword} is important

## Key Benefits of ${primaryKeyword}
- Benefit 1
- Benefit 2
- Benefit 3

## How to Implement ${primaryKeyword} Successfully
- Step 1
- Step 2
- Step 3

## Common ${primaryKeyword} Challenges and Solutions
- Challenge 1 and solution
- Challenge 2 and solution

## Best Practices for ${primaryKeyword}
- Best practice 1
- Best practice 2
- Best practice 3

## Conclusion: Taking Your ${primaryKeyword} Strategy to the Next Level
- Key takeaways
- Next steps
`;
  } catch (error) {
    console.error("Error generating outline:", error);
    toast.error("Failed to generate outline");
    return "";
  }
};

// Function to generate content using AI
export const generateContentAI = async (
  topic: string, 
  keywords: string[], 
  title: string, 
  outline: string,
  images: string[] = []
): Promise<string> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("API Key Required", {
      description: "Please configure your OpenAI API key in Settings > SEO Integrations",
    });
    return "";
  }
  
  try {
    console.log("Generating content for topic:", topic, "with title:", title);
    
    // In a real implementation, we would call OpenAI API
    // For now, use our mock function that can insert images
    return generateContentWithImages(topic, keywords, title, outline, images);
    
  } catch (error) {
    console.error("Error generating content:", error);
    toast.error("Failed to generate content");
    return "";
  }
};

// For handling real OpenAI API calls - this is just a placeholder that would be used in production
const callOpenAIApi = async (prompt: string, model: string = "gpt-4o-mini"): Promise<string> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    throw new Error("No API key configured");
  }
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "You are an expert SEO content writer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || "Error calling OpenAI API");
  }
  
  return data.choices[0].message.content;
};
