
import { getOpenAIApiKey } from './apiKeyManagement';
import { callOpenAI } from './apiUtils';
import { OpenAIResponse } from './types';

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

    const data = await callOpenAI<OpenAIResponse<string>>('chat/completions', {
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
    }, 'gpt-4o-mini');

    const generatedContent = data.choices[0].message.content;

    // Log usage for tracking purposes
    console.log("Content generation successful. Tokens used:", data.usage?.total_tokens || "unknown");
    
    return generatedContent;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

// Helper functions for content manipulation
export const processGeneratedContent = (content: string): string => {
  return content
    .replace(/<\/h([1-6])>\s*<p>/g, '</h$1>\n\n<p>') // Add space after headings
    .replace(/<\/p>\s*<h([1-6])>/g, '</p>\n\n<h$1>') // Add space before headings
    .replace(/<\/ul>\s*<p>/g, '</ul>\n\n<p>') // Add space after lists
    .replace(/<\/ol>\s*<p>/g, '</ol>\n\n<p>') // Add space after ordered lists
    .replace(/<\/blockquote>\s*<p>/g, '</blockquote>\n\n<p>') // Add space after blockquotes
    .replace(/<\/figure>\s*<p>/g, '</figure>\n\n<p>'); // Add space after figures
};
