
import { generateOutlineAI } from '../ai/contentGenerationAI';

/**
 * Generate outline based on a topic, keywords, and title
 */
export const generateOutline = async (
  topic: string,
  keywords: string[],
  title: string
): Promise<string> => {
  try {
    return await generateOutlineAI(topic, keywords, title);
  } catch (error) {
    console.error("Error generating outline:", error);
    throw error;
  }
};

/**
 * Format outline sections for better readability
 */
export const formatOutline = (outline: string): string => {
  // Clean up the outline by ensuring proper spacing and formatting
  return outline
    .replace(/#{2,}([^\n]+)/g, '## $1') // Ensure space after ## markers
    .replace(/- ([^\n]+)/g, '- $1')     // Ensure space after bullet points
    .replace(/\n{3,}/g, '\n\n');        // Remove excessive line breaks
};

/**
 * Parse outline string into structured sections
 */
export const parseOutlineSections = (outline: string): { title: string; bullets: string[] }[] => {
  const sections = outline.split(/#{2,}\s+/).filter(Boolean);
  
  return sections.map(section => {
    const lines = section.split('\n').filter(Boolean);
    const title = lines[0].trim();
    const bullets = lines
      .slice(1)
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim());
      
    return { title, bullets };
  });
};

export default {
  generateOutline,
  formatOutline,
  parseOutlineSections
};
