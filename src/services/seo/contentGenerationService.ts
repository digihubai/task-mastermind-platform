
import { toast } from "sonner";
import { generateContent } from "@/services/seo";
import { fetchInternalLinks } from "@/services/seo";

// Define the parameters expected by the content generation function
export interface ContentGenerationParams {
  topic: string;
  language: string;
  contentType: string;
  wordCount: string;
  headingStructure: string;
  includeTOC: boolean;
  includeFAQ: boolean;
  includeCTA: boolean;
  customSections?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  keywordDensity: string;
  metaDescription?: string;
  voice: string;
  expertiseLevel: string;
  brandPersonality: string;
  semanticEnrichment: string;
  lsiKeywords: boolean;
  serpTargeting: string;
  uniquenessLevel: string;
  searchIntent: string;
  includeImagePlacement?: boolean;
  includeVideoSuggestions?: boolean;
  includeInfographics?: boolean;
  analyzeCompetitors?: boolean;
  includeContentGaps?: boolean;
  includeUSPs?: boolean;
}

// Define the structure of the generated content
export interface GeneratedContent {
  title: string;
  metaDescription: string;
  content: string;
  keywords: {
    primary: string;
    secondary: string[];
  };
  wordCount: number;
  readabilityScore: number;
  suggestedImages?: string[];
  suggestedVideos?: string[];
  suggestedInfographics?: string[];
}

/**
 * Generate SEO content based on the provided parameters
 */
export const generateSEOContent = async (params: ContentGenerationParams): Promise<GeneratedContent> => {
  try {
    console.log("Generating SEO content with parameters:", params);
    
    // Step 1: Generate keywords if secondary keywords should be auto-generated
    let secondaryKeywords = params.secondaryKeywords;
    if (secondaryKeywords.length === 0) {
      console.log("Auto-generating secondary keywords for:", params.primaryKeyword);
      const keywords = await import('@/services/seo/keywordService')
        .then(module => module.generateKeywords(params.topic, 5));
      
      secondaryKeywords = keywords.filter(k => k !== params.primaryKeyword);
      console.log("Generated secondary keywords:", secondaryKeywords);
    }
    
    // Step 2: Use our existing content generation service
    const contentPrompt = constructSEOPrompt(params, secondaryKeywords);
    const content = await generateContent(
      params.topic,
      [params.primaryKeyword, ...secondaryKeywords],
      `${params.topic}: Complete Guide to ${params.primaryKeyword}`,
      contentPrompt
    );
    
    console.log("Generated content (first 100 chars):", content.substring(0, 100));
    
    // Step 3: Count words and calculate readability
    const wordCount = countWords(content);
    const readabilityScore = calculateReadability(content);
    
    // Step 4: Generate meta description if not provided
    const metaDescription = params.metaDescription || 
      `Learn everything about ${params.primaryKeyword} in our comprehensive ${params.contentType.toLowerCase()}. Discover ${secondaryKeywords.slice(0, 3).join(', ')} and more.`;
    
    // Step 5: Get related images if requested
    let suggestedImages: string[] = [];
    if (params.includeImagePlacement) {
      console.log("Fetching suggested images for:", params.primaryKeyword);
      suggestedImages = await import('@/services/seo/imageService')
        .then(module => module.searchStockPhotos(params.primaryKeyword, 'unsplash', 3));
    }
    
    // Return the structured content
    return {
      title: `${params.topic}: Complete Guide to ${params.primaryKeyword}`,
      metaDescription,
      content,
      keywords: {
        primary: params.primaryKeyword,
        secondary: secondaryKeywords
      },
      wordCount,
      readabilityScore,
      suggestedImages
    };
  } catch (error) {
    console.error("Error generating SEO content:", error);
    toast.error("Failed to generate SEO content. Please try again.");
    throw error;
  }
};

/**
 * Construct a detailed prompt for the AI model based on the parameters
 */
const constructSEOPrompt = (params: ContentGenerationParams, secondaryKeywords: string[]) => {
  return `Create ${params.headingStructure} structured ${params.contentType} about ${params.topic} focusing on ${params.primaryKeyword}.
  
Secondary keywords to include: ${secondaryKeywords.join(', ')}
Target word count: ${params.wordCount}
Tone: ${params.voice}
Expertise level: ${params.expertiseLevel}
Brand personality: ${params.brandPersonality}

${params.includeTOC ? 'Include a table of contents at the beginning.' : ''}
${params.includeFAQ ? 'Include a FAQ section with at least 4 common questions and detailed answers.' : ''}
${params.includeCTA ? 'Include a call to action at the end.' : ''}
${params.customSections ? `Also include these custom sections: ${params.customSections}` : ''}

Content should have ${params.keywordDensity} keyword density, with ${params.primaryKeyword} appearing naturally throughout the text.
Use ${params.semanticEnrichment} semantic content enrichment.
${params.lsiKeywords ? 'Include LSI keywords related to the topic.' : ''}
Optimize for ${params.serpTargeting} as a SERP feature.
Content uniqueness level should be ${params.uniquenessLevel}.
Focus on ${params.searchIntent} search intent.

Create comprehensive, original content that follows current SEO best practices while maintaining natural readability and providing genuine value to the reader.`;
};

/**
 * Count words in a string of text
 */
const countWords = (text: string): number => {
  return text.split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Calculate a basic readability score (0-100) for the text
 * Higher score means more readable
 */
const calculateReadability = (text: string): number => {
  // Simple readability calculation based on sentence and word length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(word => word.length > 0);
  
  if (sentences.length === 0 || words.length === 0) return 50;
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgWordLength = words.join('').length / words.length;
  
  // Lower avg words per sentence and word length are more readable
  // This is a simplified version of readability algorithms
  const readabilityScore = 100 - (avgWordsPerSentence * 1.5) - (avgWordLength * 3);
  
  // Ensure the score is between 0 and 100
  return Math.max(0, Math.min(100, readabilityScore));
};

// Helper function to download content in HTML format
export const downloadContentAsHTML = (content: GeneratedContent): void => {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${content.title}</title>
  <meta name="description" content="${content.metaDescription}">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    h2 { color: #444; margin-top: 25px; }
    h3 { color: #555; }
    p { margin-bottom: 15px; }
    ul, ol { margin-bottom: 20px; }
  </style>
</head>
<body>
  ${content.content}
</body>
</html>
  `;
  
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `seo-content-${new Date().toISOString().slice(0, 10)}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Helper function to download content in Markdown format
export const downloadContentAsMarkdown = (content: GeneratedContent): void => {
  // Simple HTML to Markdown conversion
  let markdownContent = content.content
    .replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
    .replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
    .replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
    .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    .replace(/<ul>(.*?)<\/ul>/sg, (match, p1) => {
      return p1.replace(/<li>(.*?)<\/li>/g, '- $1\n');
    })
    .replace(/<ol>(.*?)<\/ol>/sg, (match, p1) => {
      let counter = 0;
      return p1.replace(/<li>(.*?)<\/li>/g, () => {
        counter++;
        return `${counter}. $1\n`;
      });
    })
    .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');
    
  const blob = new Blob([markdownContent], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `seo-content-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Function to copy content to clipboard
export const copyContentToClipboard = (content: string): void => {
  navigator.clipboard.writeText(content)
    .then(() => toast.success("Content copied to clipboard"))
    .catch(err => {
      console.error("Failed to copy content:", err);
      toast.error("Failed to copy content to clipboard");
    });
};
