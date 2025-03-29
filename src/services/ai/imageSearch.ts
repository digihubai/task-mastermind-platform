
import { LinkSuggestion } from './types';
import { toast } from "sonner";

// Search for relevant stock photos
export const searchStockPhotos = async (query: string): Promise<string[]> => {
  // This is a mock function - in a real implementation, you'd call Unsplash, Pexels, etc.
  try {
    // For now, just return some placeholder images
    const placeholderImages = [
      "https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1581291518275-97642f2he91c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    ];
    
    console.log("Searching stock photos for:", query);
    return placeholderImages;
  } catch (error) {
    console.error("Error searching stock photos:", error);
    throw error;
  }
};

// Helper function to integrate images and links into generated content
export const enhanceContentWithMedia = (
  content: string, 
  images: string[], 
  keywords: string[]
): string => {
  let enhancedContent = content;
  
  if (images && images.length > 0) {
    // Find suitable places to insert images (after h2 headings)
    const h2Sections = content.match(/<h2>.*?<\/h2>/g);
    
    if (h2Sections && h2Sections.length > 0) {
      // Insert images after some h2 headings
      for (let i = 0; i < Math.min(images.length, h2Sections.length); i++) {
        const imageHtml = `
<figure>
  <img src="${images[i]}" alt="${keywords[i] || 'related image'}" class="rounded-lg w-full my-6" />
  <figcaption class="text-center text-sm text-muted-foreground mt-2">${keywords[i] || 'Related image'}</figcaption>
</figure>`;
        
        // Insert after h2 + following paragraph
        const sectionRegex = new RegExp(`(${h2Sections[i]}.*?</p>)`, 's');
        if (sectionRegex.test(enhancedContent)) {
          enhancedContent = enhancedContent.replace(sectionRegex, `$1${imageHtml}`);
        }
      }
    }
  }
  
  return enhancedContent;
};

// Insert links into content
export const insertLinksIntoContent = (
  content: string, 
  links: Array<LinkSuggestion>, 
  isExternal: boolean
): string => {
  let updatedContent = content;
  
  links.forEach(link => {
    // Only try to insert each link once
    const linkText = link.title;
    const regexp = new RegExp(`\\b${linkText}\\b(?![^<]*>|[^<>]*<\\/a>)`, 'i');
    
    if (regexp.test(updatedContent)) {
      const replacement = isExternal 
        ? `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
        : `<a href="${link.url}">${linkText}</a>`;
      
      updatedContent = updatedContent.replace(regexp, replacement);
    }
  });
  
  return updatedContent;
};
