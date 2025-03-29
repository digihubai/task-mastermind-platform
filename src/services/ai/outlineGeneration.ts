
import { getOpenAIApiKey } from './apiKeyManagement';
import { callOpenAI } from './apiUtils';
import { OpenAIResponse } from './types';

// Generate outline based on title, topic and keywords
export const generateOutlineAI = async (
  topic: string,
  keywords: string[],
  title: string
): Promise<string> => {
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
    
    const data = await callOpenAI<OpenAIResponse<string>>('chat/completions', {
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
    }, 'gpt-3.5-turbo');
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating content outline:", error);
    throw error;
  }
};
