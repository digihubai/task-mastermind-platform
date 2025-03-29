
import { getOpenAIApiKey } from './apiKeyManagement';
import { callOpenAI } from './apiUtils';
import { OpenAIResponse } from './types';

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
    
    const data = await callOpenAI<OpenAIResponse<string>>('chat/completions', {
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
    }, 'gpt-3.5-turbo');
    
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
