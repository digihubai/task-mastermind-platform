
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // For now, we'll use placeholder images until we can connect to an AI image generation service
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
    
    console.log("Generated image URLs:", imageUrls);
    
    return new Response(
      JSON.stringify({ 
        imageUrls,
        prompt,
        aiPrompt: `Professional high-quality images representing: ${prompt}. Topic: ${topic}, Keywords: ${keywords?.join(", ")}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in generate-image function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
