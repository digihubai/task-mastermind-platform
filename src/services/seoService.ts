
import { generateKeywords } from "./seo/keywordService";
import { generateTitles } from "./seo/titleService";
import { generateOutline } from "./seo/outlineService";
import { generateSEOContent } from "./seo/contentService";

/**
 * Generate mock SEO content based on topic, keywords, title and outline
 */
export const generateMockSEOContent = (topic, keywords, title, outline) => {
  const sections = outline.split("\n\n").filter((section) => section.trim() !== "");
  let content = `<h1>${title}</h1>\n\n`;
  
  sections.forEach((section) => {
    if (section.startsWith("##")) {
      const sectionTitle = section.split("\n")[0];
      content += `<h2>${sectionTitle.replace("##", "").trim()}</h2>\n\n`;
      
      const bulletPoints = section
        .split("\n")
        .slice(1)
        .filter((line) => line.trim().startsWith("-"));
        
      bulletPoints.forEach((point) => {
        const pointText = point.replace("- ", "").trim();
        content += `<p>${pointText} is an important aspect of ${topic}. When considering ${pointText}, it's essential to understand its role in the overall ${keywords[0] || topic} strategy. Experts recommend focusing on this area to maximize results.</p>\n\n`;
      });
    }
  });
  
  content += `<h2>Conclusion</h2>\n\n<p>In conclusion, mastering ${topic} requires attention to detail and a strategic approach. By following the guidelines outlined in this article, you can improve your results and achieve your goals in ${keywords[0] || topic}. Remember to stay updated on the latest trends and best practices to maintain a competitive edge.</p>`;
  
  return content;
};

/**
 * Generate content with images inserted at strategic positions
 */
export const generateContentWithImages = (topic, keywords, title, outline, images = []) => {
  let baseContent = generateMockSEOContent(topic, keywords, title, outline);
  
  if (images && images.length > 0) {
    const contentParts = baseContent.split('\n\n');
    const updatedContent = [];
    let imageIndex = 0;
    
    contentParts.forEach((part, index) => {
      updatedContent.push(part);
      
      // Insert image after headings and some paragraphs, but not too frequently
      if ((part.startsWith('<h2') || index % 3 === 0) && imageIndex < images.length) {
        const imageAlt = `${topic} - ${keywords[imageIndex % keywords.length] || 'image'}`;
        updatedContent.push(`<img src="${images[imageIndex]}" alt="${imageAlt}" />`);
        imageIndex++;
      }
    });
    
    return updatedContent.join('\n\n');
  }
  
  return baseContent;
};

// Export the core SEO content generation functions
export { generateKeywords, generateTitles, generateOutline, generateSEOContent };
