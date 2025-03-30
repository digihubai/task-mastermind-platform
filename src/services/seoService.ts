
import { generateKeywords } from "./seo/keywordService";
import { generateTitles } from "./seo/titleService";
import { generateOutline } from "./seo/outlineService";
import { generateSEOContent } from "./seo/contentService";

export const generateMockSEOContent = (topic: string, keywords: string[], title: string, outline: string): string => {
  const sections = outline.split("\n\n").filter(section => section.trim() !== "");
  
  let content = `# ${title}\n\n`;
  
  sections.forEach(section => {
    if (section.startsWith("##")) {
      const sectionTitle = section.split("\n")[0];
      content += `${sectionTitle}\n\n`;
      
      const bulletPoints = section.split("\n").slice(1).filter(line => line.trim().startsWith("-"));
      
      bulletPoints.forEach(point => {
        const pointText = point.replace("- ", "").trim();
        content += `${pointText} is an important aspect of ${topic}. When considering ${pointText}, it's essential to understand its role in the overall ${keywords[0] || topic} strategy. Experts recommend focusing on this area to maximize results.\n\n`;
      });
    }
  });
  
  content += `## Conclusion\n\nIn conclusion, mastering ${topic} requires attention to detail and a strategic approach. By following the guidelines outlined in this article, you can improve your results and achieve your goals in ${keywords[0] || topic}. Remember to stay updated on the latest trends and best practices to maintain a competitive edge.`;
  
  return content;
};

export const generateContentWithImages = (
  topic: string, 
  keywords: string[], 
  title: string, 
  outline: string,
  images: string[] = []
): string => {
  let baseContent = generateMockSEOContent(topic, keywords, title, outline);
  
  if (images && images.length > 0) {
    const contentParts = baseContent.split('\n\n');
    const updatedContent: string[] = [];
    let imageIndex = 0;
    
    contentParts.forEach((part, index) => {
      updatedContent.push(part);
      
      // Insert image after headings and some paragraphs, but not too frequently
      if ((part.startsWith('##') || index % 3 === 0) && imageIndex < images.length) {
        const imageAlt = `${topic} - ${keywords[imageIndex % keywords.length] || 'image'}`;
        updatedContent.push(`![${imageAlt}](${images[imageIndex]})`);
        imageIndex++;
      }
    });
    
    return updatedContent.join('\n\n');
  }
  
  return baseContent;
};

// Export the core SEO content generation functions
export { 
  generateKeywords, 
  generateTitles, 
  generateOutline, 
  generateSEOContent
};
