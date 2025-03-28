
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { prompt, topic, keywords, count = 4, size = 'square' } = await req.json();
    console.log("Generating images with prompt:", prompt);
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required field", 
          details: "Image prompt is required" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY is not set. Using fallback image generation method.");
      return generateFallbackImages(prompt, topic, keywords, count, corsHeaders);
    }

    // Enhanced prompt for better AI image generation
    const enhancedPrompt = `Professional high-quality image: ${prompt}. ${topic ? `Topic: ${topic}.` : ''} ${keywords?.length ? `Keywords: ${keywords.join(", ")}.` : ''}`;
    console.log("Using enhanced prompt for AI image generation:", enhancedPrompt);

    // Determine the size parameter based on the requested size
    let imageSize;
    switch (size) {
      case 'landscape':
        imageSize = "1024x768";
        break;
      case 'portrait':
        imageSize = "768x1024";
        break;
      case 'widescreen':
        imageSize = "1792x1024";
        break;
      case 'square':
      default:
        imageSize = "1024x1024";
    }

    // Generate images using OpenAI DALL-E
    const actualCount = Math.min(count, 4); // OpenAI limits the number of images per request
    const apiResponses = [];
    
    // We need to make multiple API calls if the user wants more than one image
    for (let i = 0; i < actualCount; i++) {
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: imageSize,
            quality: "standard"
          })
        });

        if (!openaiResponse.ok) {
          const errorData = await openaiResponse.json();
          console.error("OpenAI API error:", errorData);
          throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const responseData = await openaiResponse.json();
        console.log("OpenAI image generated successfully");
        apiResponses.push(responseData.data[0].url);
      } catch (imageError) {
        console.error(`Error generating image ${i+1}:`, imageError);
        // If an individual image fails, we'll add a placeholder instead of failing the whole request
        apiResponses.push(`https://source.unsplash.com/random/${imageSize.replace('x', '/')}?${encodeURIComponent(prompt)}&sig=${Date.now() + i}`);
      }
    }
    
    console.log("Generated image URLs:", apiResponses);
    
    return new Response(
      JSON.stringify({ 
        imageUrls: apiResponses,
        prompt,
        aiPrompt: enhancedPrompt
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in generate-image function:", error);
    
    // Fallback to placeholder images if there's an error
    const { prompt, topic, keywords, count = 4 } = await req.json().catch(() => ({}));
    return generateFallbackImages(prompt || "digital marketing", topic, keywords, count, corsHeaders);
  }
});

// Fallback function to generate placeholder images when the AI service is unavailable
async function generateFallbackImages(prompt, topic, keywords, count, corsHeaders) {
  console.log("Using fallback image generation method for prompt:", prompt);
  
  const placeholderImages = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562907550-096d3bf9b25c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop",
  ];
  
  // Generate the requested number of images (up to 6)
  const actualCount = Math.min(count, 6);
  const imageUrls = [];
  
  for (let i = 0; i < actualCount; i++) {
    // Use a different image for each request, make it deterministic based on prompt and index
    const promptSum = prompt.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const imageIndex = (promptSum + i) % placeholderImages.length;
    
    // Add a cache-busting query parameter to prevent browser caching
    const cacheBuster = Date.now() + i;
    const imageUrl = `${placeholderImages[imageIndex]}?t=${cacheBuster}`;
    
    imageUrls.push(imageUrl);
  }
  
  console.log("Generated fallback image URLs:", imageUrls);
  
  return new Response(
    JSON.stringify({ 
      imageUrls,
      prompt,
      aiPrompt: `Professional high-quality images representing: ${prompt}. Topic: ${topic}, Keywords: ${keywords?.join(", ")}`
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
