
import { getOpenAIApiKey } from './apiKeyManagement';
import { callOpenAI } from './apiUtils';
import { OpenAIResponse } from './types';

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
    
    const data = await callOpenAI<OpenAIResponse<string>>('chat/completions', {
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
    }, 'gpt-3.5-turbo');
    
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
