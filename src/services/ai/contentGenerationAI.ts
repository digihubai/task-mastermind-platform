
import { toast } from "sonner";

// Define response types
interface AIKeywordResponse {
  keywords: string[];
  relevance: number[];
}

interface AITitleResponse {
  titles: string[];
  scores: number[];
}

interface AIOutlineResponse {
  outline: string;
  sections: string[];
}

interface AIContentResponse {
  content: string;
  readabilityScore: number;
  wordCount: number;
}

interface AIImageSuggestion {
  prompt: string;
  description: string;
}

// API key management
let openaiApiKey = localStorage.getItem('openai_api_key') || '';

export const setOpenAIApiKey = (key: string) => {
  openaiApiKey = key;
  localStorage.setItem('openai_api_key', key);
  return validateAPIKey(key);
};

export const getOpenAIApiKey = () => {
  return openaiApiKey || localStorage.getItem('openai_api_key') || '';
};

export const clearOpenAIApiKey = () => {
  openaiApiKey = '';
  localStorage.removeItem('openai_api_key');
};

export const validateAPIKey = async (key: string): Promise<boolean> => {
  if (!key) return false;
  
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      toast.success("API key validated successfully");
      return true;
    } else {
      if (response.status === 401) {
        toast.error("Invalid API key");
      } else {
        toast.error(`API error: ${response.status}`);
      }
      return false;
    }
  } catch (error) {
    console.error("Error validating API key:", error);
    toast.error("Error validating API key. Please check your internet connection.");
    return false;
  }
};

// Generate keywords based on topic using AI
export const generateKeywordsAI = async (topic: string, count: number = 10): Promise<string[]> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("Please set your OpenAI API key in the admin settings");
    return mockKeywords(topic, count);
  }
  
  try {
    const prompt = `Generate ${count} SEO-optimized keywords and phrases related to "${topic}". 
    Focus on a mix of short-tail and long-tail keywords. Return only the keywords as a JSON array.`;
    
    console.log("Generating keywords for topic:", topic);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an SEO expert that generates keywords. Respond with a JSON array of strings only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse the response content which should be a JSON array
    let keywords: string[] = [];
    try {
      const content = data.choices[0].message.content;
      console.log("Raw keyword response:", content);
      
      // Extract the JSON array if it's wrapped in code blocks or other text
      const jsonMatch = content.match(/\[.*\]/s);
      if (jsonMatch) {
        keywords = JSON.parse(jsonMatch[0]);
      } else {
        // If not in JSON format, try to extract as a list
        keywords = content.split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.replace(/^\d+\.\s*/, '').trim()); // Remove numbering if present
      }
    } catch (e) {
      console.error("Error parsing keywords response:", e);
      throw new Error('Failed to parse keywords response');
    }
    
    return keywords.slice(0, count);
  } catch (error) {
    console.error("Error generating keywords:", error);
    toast.error("Failed to generate keywords, using sample data instead");
    return mockKeywords(topic, count);
  }
};

// Generate titles based on topic and keywords using AI
export const generateTitlesAI = async (topic: string, keywords: string[], count: number = 5): Promise<string[]> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("Please set your OpenAI API key in the admin settings");
    return mockTitles(topic, keywords, count);
  }
  
  try {
    const keywordsToUse = keywords.slice(0, 5).join(', ');
    const prompt = `Generate ${count} engaging and SEO-optimized titles for an article about "${topic}" 
    that incorporate these keywords: ${keywordsToUse}. 
    Each title should be less than 70 characters. Return only the titles as a JSON array.`;
    
    console.log("Generating titles with keywords:", keywordsToUse);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an SEO content expert that creates engaging titles. Respond with a JSON array of strings only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse the response content
    let titles: string[] = [];
    try {
      const content = data.choices[0].message.content;
      console.log("Raw title response:", content);
      
      // Extract the JSON array if it's wrapped in code blocks or other text
      const jsonMatch = content.match(/\[.*\]/s);
      if (jsonMatch) {
        titles = JSON.parse(jsonMatch[0]);
      } else {
        // If not in JSON format, try to extract as a list
        titles = content.split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.replace(/^\d+\.\s*/, '').trim()); // Remove numbering if present
      }
    } catch (e) {
      console.error("Error parsing titles response:", e);
      throw new Error('Failed to parse titles response');
    }
    
    return titles.slice(0, count);
  } catch (error) {
    console.error("Error generating titles:", error);
    toast.error("Failed to generate titles, using sample data instead");
    return mockTitles(topic, keywords, count);
  }
};

// Generate content outline based on topic and keywords using AI
export const generateOutlineAI = async (topic: string, keywords: string[], title: string): Promise<string> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("Please set your OpenAI API key in the admin settings");
    return mockOutline(topic, title);
  }
  
  try {
    const keywordsToUse = keywords.slice(0, 5).join(', ');
    const prompt = `Create a detailed content outline for an article titled "${title}" about "${topic}".
    Include main sections and subsections that cover these keywords: ${keywordsToUse}.
    Format the outline with markdown using # for main sections and ## for subsections.`;
    
    console.log("Generating outline for title:", title);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an SEO content strategist that creates detailed content outlines.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating outline:", error);
    toast.error("Failed to generate outline, using sample data instead");
    return mockOutline(topic, title);
  }
};

// Generate full content based on outline using AI
export const generateContentAI = async (title: string, outline: string, keywords: string[]): Promise<string> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("Please set your OpenAI API key in the admin settings");
    return mockContent(title, outline);
  }
  
  try {
    const keywordsToUse = keywords.slice(0, 5).join(', ');
    const prompt = `Write a comprehensive, engaging article with the title "${title}" following this outline:
    
    ${outline}
    
    Incorporate these keywords naturally: ${keywordsToUse}.
    Format the content with proper HTML tags for headings (<h1>, <h2>, etc.), paragraphs (<p>), and lists (<ul>, <li>).
    Include a compelling introduction and conclusion.`;
    
    console.log("Generating content for title:", title);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an SEO content writer that creates well-structured, engaging articles with proper HTML formatting.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating content:", error);
    toast.error("Failed to generate content, using sample data instead");
    return mockContent(title, outline);
  }
};

// Generate image suggestions based on content and keywords
export const generateImageSuggestionsAI = async (title: string, keywords: string[], count: number = 4): Promise<AIImageSuggestion[]> => {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    toast.error("Please set your OpenAI API key in the admin settings");
    return mockImageSuggestions(title, keywords, count);
  }
  
  try {
    const keywordsToUse = keywords.slice(0, 5).join(', ');
    const prompt = `Generate ${count} detailed image prompts for an article titled "${title}" about keywords: ${keywordsToUse}.
    For each image prompt, provide a short description of what the image should contain and how it relates to the content.
    Return a JSON array with each object having 'prompt' and 'description' fields.`;
    
    console.log("Generating image suggestions for:", title);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an image prompt specialist for content marketing. Return a JSON array with prompt and description fields.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse the response content
    let suggestions: AIImageSuggestion[] = [];
    try {
      const content = data.choices[0].message.content;
      console.log("Raw image suggestions:", content);
      
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[.*\]/s);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not extract JSON from response');
      }
    } catch (e) {
      console.error("Error parsing image suggestions response:", e);
      throw new Error('Failed to parse image suggestions response');
    }
    
    return suggestions.slice(0, count);
  } catch (error) {
    console.error("Error generating image suggestions:", error);
    toast.error("Failed to generate image suggestions, using sample data instead");
    return mockImageSuggestions(title, keywords, count);
  }
};

// Fallback mock data functions
const mockKeywords = (topic: string, count: number): string[] => {
  const baseKeywords = [
    `${topic} guide`,
    `${topic} tutorial`,
    `best ${topic} practices`,
    `${topic} for beginners`,
    `advanced ${topic} techniques`,
    `how to improve ${topic}`,
    `${topic} strategies`,
    `${topic} tips and tricks`,
    `${topic} examples`,
    `${topic} case studies`,
    `${topic} tools`,
    `${topic} software`,
    `${topic} comparison`,
    `${topic} vs traditional methods`,
    `future of ${topic}`
  ];
  
  return baseKeywords.slice(0, count);
};

const mockTitles = (topic: string, keywords: string[], count: number): string[] => {
  const baseTitles = [
    `Ultimate Guide to ${topic}: Everything You Need to Know`,
    `10 Essential ${topic} Strategies for 2023`,
    `How to Master ${topic} in Just 30 Days`,
    `${topic}: A Comprehensive Approach for Beginners`,
    `The Future of ${topic}: Trends and Predictions`,
    `Why ${topic} Matters More Than Ever in Today's World`,
    `${topic} 101: From Basics to Advanced Techniques`,
    `Unlock the Secrets of Successful ${topic}`,
    `The Complete ${topic} Handbook for Professionals`,
    `Transform Your Business with These ${topic} Best Practices`
  ];
  
  return baseTitles.slice(0, count);
};

const mockOutline = (topic: string, title: string): string => {
  return `# Introduction to ${topic}
- What is ${topic}
- Why ${topic} matters
- Brief history of ${topic}

# Understanding the Basics
- Core concepts of ${topic}
- Key terminology
- Common misconceptions

# Benefits of ${topic}
- Improved efficiency
- Cost savings
- Competitive advantages

# Implementing ${topic} in Your Business
- Step 1: Assessment
- Step 2: Planning
- Step 3: Execution
- Step 4: Monitoring and adjustment

# Common Challenges and Solutions
- Challenge 1: Resource constraints
- Challenge 2: Resistance to change
- Challenge 3: Technical limitations

# Case Studies
- Success story 1
- Success story 2

# Future Trends in ${topic}
- Emerging technologies
- Predicted developments
- How to stay ahead of the curve

# Conclusion
- Key takeaways
- Next steps
- Additional resources`;
};

const mockContent = (title: string, outline: string): string => {
  // Convert outline to HTML content
  const sections = outline.split('#').filter(section => section.trim().length > 0);
  let content = `<h1>${title}</h1>\n\n`;
  
  content += `<p>This comprehensive guide explores ${title} with advanced insights and actionable strategies. We'll cover everything you need to know to master this subject.</p>\n\n`;
  
  sections.forEach((section, index) => {
    const trimmedSection = section.trim();
    const lines = trimmedSection.split('\n').filter(line => line.trim().length > 0);
    
    if (lines.length > 0) {
      const heading = lines[0].trim();
      content += `<h2>${heading}</h2>\n\n`;
      
      // Add paragraphs for each bullet point
      const bulletPoints = lines.slice(1);
      bulletPoints.forEach(point => {
        const cleanPoint = point.replace(/^-\s*/, '').trim();
        if (cleanPoint) {
          content += `<p>${cleanPoint} is a crucial aspect to consider when dealing with ${title.toLowerCase()}. Understanding this will help you implement more effective strategies and achieve better results in your endeavors.</p>\n\n`;
        }
      });
      
      // Add a subsection if this isn't the last section
      if (index < sections.length - 1 && bulletPoints.length > 0) {
        content += `<h3>Key insights about ${bulletPoints[0].replace(/^-\s*/, '').trim()}</h3>\n\n`;
        content += `<p>When implementing these strategies, it's important to consider the specific context and requirements of your situation. Adapting these principles to your unique circumstances will yield the best results.</p>\n\n`;
        
        // Add a list for variety
        content += `<ul>\n`;
        for (let i = 0; i < Math.min(3, bulletPoints.length); i++) {
          content += `  <li>${bulletPoints[i].replace(/^-\s*/, '').trim()} - This can significantly improve your outcomes</li>\n`;
        }
        content += `</ul>\n\n`;
      }
    }
  });
  
  content += `<h2>Conclusion</h2>\n\n<p>By implementing the strategies outlined in this guide, you'll be well-positioned to leverage these insights for sustainable growth. Remember that success requires consistent effort, data-driven decision making, and a willingness to adapt to changing conditions.</p>\n\n`;
  
  return content;
};

const mockImageSuggestions = (title: string, keywords: string[], count: number): AIImageSuggestion[] => {
  const suggestions: AIImageSuggestion[] = [
    {
      prompt: `Professional working on ${keywords[0] || title}`,
      description: `A focused professional working with digital interfaces related to ${keywords[0] || title}`
    },
    {
      prompt: `Visualization of ${keywords[1] || title} concepts`,
      description: `Abstract visualization showing the key concepts and connections in ${keywords[1] || title}`
    },
    {
      prompt: `Team collaboration on ${keywords[2] || title}`,
      description: `Diverse team members collaborating on a project related to ${keywords[2] || title}`
    },
    {
      prompt: `Before and after implementing ${keywords[3] || title}`,
      description: `Split image showing the contrast between before and after implementing ${keywords[3] || title}`
    },
    {
      prompt: `Future trends in ${keywords[4] || title}`,
      description: `Futuristic visualization of emerging trends in ${keywords[4] || title}`
    }
  ];
  
  return suggestions.slice(0, count);
};
