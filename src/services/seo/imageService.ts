
/**
 * This service handles image generation and search for SEO content
 * In a production environment, this would connect to actual image APIs
 */

// For fetching stock photos from various services
export const searchStockPhotos = async (
  query: string,
  source: 'unsplash' | 'pexels' | 'pixabay' = 'unsplash',
  count: number = 4
) => {
  console.log(`Searching for ${count} ${source} photos with query: ${query}`);
  
  // This is a mock implementation
  // In production, this would call actual APIs with proper authentication
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate mock results that would come from the API
  const images = [];
  
  // Sanitize the query to make it URL-friendly
  const sanitizedQuery = query.replace(/\s+/g, '+').trim();
  
  for (let i = 0; i < count; i++) {
    // Using Unsplash source API as a placeholder
    // In production you would use the actual API endpoints with auth
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
};

// For generating AI images
export const generateAIImages = async (
  prompt: string,
  count: number = 4,
  size: 'square' | 'landscape' | 'portrait' | 'widescreen' = 'square'
) => {
  console.log(`Generating ${count} AI images with prompt: ${prompt}`);
  
  try {
    // This is a mock implementation
    // In production, this would call an AI image generation API like DALL-E, Midjourney, etc.
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Determine dimensions based on size
    let dimensions = '800x800'; // square default
    if (size === 'landscape') dimensions = '1280x720';
    if (size === 'portrait') dimensions = '768x1024';
    if (size === 'widescreen') dimensions = '1920x840';
    
    // Generate mock results that would come from the API
    const images = [];
    
    // Sanitize the prompt to make it URL-friendly
    const sanitizedPrompt = prompt.trim().replace(/\s+/g, '+');
    const searchTerms = sanitizedPrompt || 'business+professional+marketing';
    
    for (let i = 0; i < count; i++) {
      // Using Unsplash source API as a placeholder
      // In production you would use actual AI generation APIs
      // Adding a random parameter to force different images
      const randomParam = `${Date.now()}-${Math.random()}-${i}`;
      images.push(`https://source.unsplash.com/random/${dimensions}?${searchTerms}&sig=${randomParam}`);
    }
    
    return images;
  } catch (error) {
    console.error("Error generating AI images:", error);
    throw new Error("Failed to generate AI images. Please try again.");
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
