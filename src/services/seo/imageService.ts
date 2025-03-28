
/**
 * This service handles image generation and search for SEO content
 */

import { toast } from "sonner";

// For fetching stock photos from various services
export const searchStockPhotos = async (
  query: string,
  source: 'unsplash' | 'pexels' | 'pixabay' = 'unsplash',
  count: number = 4
) => {
  console.log(`Searching for ${count} ${source} photos with query: ${query}`);
  
  try {
    // This is a mock implementation
    // In production, this would call actual APIs with proper authentication
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate results that would come from the API
    const images = [];
    
    // Sanitize the query to make it URL-friendly
    const sanitizedQuery = query.replace(/\s+/g, '+').trim();
    
    for (let i = 0; i < count; i++) {
      // Generate a unique image for each request using parameters
      const randomParam = `${Date.now()}-${Math.random()}-${i}`;
      
      // Different dimensions for variety
      const dimensions = i % 2 === 0 ? '800x600' : '900x600';
      
      if (sanitizedQuery) {
        images.push(`https://source.unsplash.com/random/${dimensions}?${sanitizedQuery}&sig=${randomParam}`);
      } else {
        // Fallback to general images if no query
        images.push(`https://source.unsplash.com/random/${dimensions}?digital+marketing&sig=${randomParam}`);
      }
    }
    
    return images;
  } catch (error) {
    console.error("Error searching stock photos:", error);
    toast.error("Failed to search for stock photos");
    throw error;
  }
};

// For generating AI images using our Supabase edge function
export const generateAIImages = async (
  prompt: string,
  count: number = 4,
  size: 'square' | 'landscape' | 'portrait' | 'widescreen' = 'square',
  topic?: string,
  keywords?: string[]
) => {
  console.log(`Generating ${count} AI images with prompt: ${prompt}`);
  
  if (!prompt || prompt.trim().length < 3) {
    toast.error("Please provide a more descriptive prompt for image generation");
    return [];
  }
  
  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        prompt, 
        count,
        size,
        topic,
        keywords
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate images");
    }
    
    const data = await response.json();
    
    if (!data.imageUrls || !Array.isArray(data.imageUrls) || data.imageUrls.length === 0) {
      // Fallback to stock photos if the AI generation fails
      console.log("AI image generation didn't return valid images, falling back to stock photos");
      return searchStockPhotos(prompt, 'unsplash', count);
    }
    
    return data.imageUrls;
  } catch (error) {
    console.error("Error generating AI images:", error);
    toast.error("Failed to generate AI images. Falling back to stock photos.");
    
    // Fallback to stock photos if there's an error
    return searchStockPhotos(prompt, 'unsplash', count);
  }
};

// Helper function to get a related image for content
export const getRelatedImage = async (topic: string) => {
  try {
    // Sanitize the topic and provide a fallback
    const sanitizedTopic = topic.trim().replace(/\s+/g, '+') || 'business';
    return searchStockPhotos(sanitizedTopic, 'unsplash', 1).then(images => images[0]);
  } catch (error) {
    console.error("Error fetching related image:", error);
    // Return a fallback image URL if there's an error
    return `https://source.unsplash.com/random/800x600?marketing`;
  }
};

// New function to validate and fix image URLs
export const ensureValidImageURL = (url: string) => {
  if (!url) return null;
  
  try {
    // Check if URL is valid
    new URL(url);
    return url;
  } catch (e) {
    console.error("Invalid image URL:", url);
    // Return a fallback image
    return `https://source.unsplash.com/random/800x600?placeholder`;
  }
};

// Batch validate multiple image URLs
export const validateImageURLs = (urls: string[]) => {
  if (!urls || !Array.isArray(urls)) return [];
  return urls.map(url => ensureValidImageURL(url)).filter(Boolean) as string[];
};
