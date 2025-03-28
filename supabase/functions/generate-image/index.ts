
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
    const { prompt, topic, keywords } = await req.json();
    console.log("Generating image with prompt:", prompt);
    
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
    // In a real implementation, you would call an image generation API like DALL-E, Midjourney, or similar
    const placeholderImages = [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562907550-096d3bf9b25c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop",
    ];
    
    // Randomize which image to return, but make it deterministic based on the prompt
    // so the same prompt always gets the same image
    const promptSum = prompt.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const imageIndex = promptSum % placeholderImages.length;
    
    // Add a cache-busting query parameter to prevent browser caching
    const cacheBuster = Date.now();
    const imageUrl = `${placeholderImages[imageIndex]}?t=${cacheBuster}`;
    
    console.log("Generated image URL:", imageUrl);
    
    return new Response(
      JSON.stringify({ 
        imageUrl,
        prompt,
        aiPrompt: `Professional high-quality image representing: ${prompt}. Topic: ${topic}, Keywords: ${keywords?.join(", ")}`
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
