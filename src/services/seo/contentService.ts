
import { generateContentAI } from '../ai/contentGenerationAI';
import { toast } from 'sonner';

/**
 * Generate SEO-optimized content based on the provided parameters
 */
export const generateSEOContent = async (
  title: string,
  keywords: string[],
  outline: string
): Promise<string> => {
  try {
    return await generateContentAI(title, outline, keywords);
  } catch (error) {
    console.error("Error generating SEO content:", error);
    toast.error("Failed to generate SEO content. Please check your API key settings.");
    throw error;
  }
};

/**
 * Process and enhance the generated content for better SEO
 */
export const enhanceSEOContent = (content: string): string => {
  // This function would enhance the content with better SEO structure
  // For now, just return the content
  return content;
};

/**
 * Add internal links to the content
 */
export const addInternalLinks = (content: string, links: Array<{title: string, url: string}>): string => {
  let enhancedContent = content;
  
  links.forEach(link => {
    // Simple replacement - in a real implementation, this would be more sophisticated
    const regex = new RegExp(`\\b${link.title}\\b`, 'gi');
    enhancedContent = enhancedContent.replace(regex, `<a href="${link.url}">${link.title}</a>`);
  });
  
  return enhancedContent;
};

/**
 * Fix common HTML formatting issues in generated content
 */
export const fixContentFormatting = (content: string): string => {
  let fixedContent = content;
  
  // Fix missing spacing after headings
  fixedContent = fixedContent.replace(/<\/h([1-6])>(?!\s|<)/g, '</h$1>\n\n');
  
  // Fix missing spacing after paragraphs
  fixedContent = fixedContent.replace(/<\/p>(?!\s|<)/g, '</p>\n\n');
  
  // Fix missing spacing after lists
  fixedContent = fixedContent.replace(/<\/ul>(?!\s|<)/g, '</ul>\n\n');
  fixedContent = fixedContent.replace(/<\/ol>(?!\s|<)/g, '</ol>\n\n');
  
  // Fix missing spacing after blockquotes
  fixedContent = fixedContent.replace(/<\/blockquote>(?!\s|<)/g, '</blockquote>\n\n');
  
  return fixedContent;
};

export default {
  generateSEOContent,
  enhanceSEOContent,
  addInternalLinks,
  fixContentFormatting
};
