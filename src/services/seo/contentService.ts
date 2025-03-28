
/**
 * Generates mock SEO content for previewing purposes
 */
export const generateMockSEOContent = (topic: string, keywords: string[]) => {
  // Process the topic for better formatting
  const processedTopic = topic.trim();
  const formattedTopic = processedTopic.charAt(0).toUpperCase() + processedTopic.slice(1).toLowerCase();
  
  // Format keywords properly
  const formattedKeywords = keywords.map(k => k.trim()).filter(k => k.length > 0);
  const keywordText = formattedKeywords.length > 0 ? ` focusing on ${formattedKeywords.join(", ")}` : "";
  
  // Generate current year for relevance
  const currentYear = new Date().getFullYear();
  
  return `# ${formattedTopic}

## Introduction

This comprehensive guide covers everything you need to know about ${formattedTopic}${keywordText}. We'll explore the latest trends, best practices, and expert strategies to help you succeed in ${currentYear} and beyond.

## Why ${formattedTopic} Matters

In today's digital landscape, ${formattedTopic} has become increasingly important for businesses of all sizes. Understanding how to leverage ${formattedTopic} effectively can lead to improved results and competitive advantage.

## Key Strategies for ${formattedTopic}

1. **Research and Planning**: Start with thorough research to understand your audience and competition.
2. **Implementation**: Follow best practices when implementing your ${formattedTopic} strategy.
3. **Optimization**: Continuously test and refine your approach based on performance data.
4. **Measurement**: Track key metrics to evaluate the success of your ${formattedTopic} initiatives.

## Advanced Techniques

For those looking to take their ${formattedTopic} efforts to the next level, consider these advanced techniques:

- Leverage AI and automation tools
- Implement cross-channel strategies
- Focus on user experience optimization
- Develop comprehensive analytics frameworks

## Case Studies: ${formattedTopic} Success Stories

### Company A: 200% Growth in 6 Months

Company A implemented a comprehensive ${formattedTopic} strategy that resulted in a 200% increase in conversion rates within just 6 months. Their approach focused on user experience optimization and data-driven decision making.

### Company B: Market Leader in ${currentYear}

By prioritizing ${formattedTopic}, Company B established themselves as a market leader in their industry. Their innovative approach to ${formattedKeywords[0] || formattedTopic} set them apart from competitors.

## Conclusion

Mastering ${formattedTopic} requires ongoing education, experimentation, and adaptation. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results.

`;
};

/**
 * Analyzes SEO content and returns analytics
 */
export const fetchSEOAnalytics = async (contentId: string) => {
  // Mock function to fetch SEO analytics data
  return {
    keywordDensity: 92,
    readabilityScore: 87,
    structureScore: 94,
    originalityScore: 85,
    overallScore: 90,
    recommendations: [
      "Add more internal links to improve site structure",
      "Consider adding more examples to illustrate key points",
      "Optimize meta description to improve CTR"
    ]
  };
};

/**
 * Generates content with images and links
 */
export const generateContentWithImages = async (
  topic: string,
  keywords: string[],
  title: string,
  outline: any,
  images: string[],
  internalLinks: any[] = [],
  externalLinks: any[] = []
) => {
  console.log("generateContentWithImages called with:", {
    topic, 
    keywords, 
    title,
    outline: typeof outline === 'string' ? `${outline.slice(0, 50)}...` : 'object',
    imageCount: images?.length,
    internalLinkCount: internalLinks?.length,
    externalLinkCount: externalLinks?.length
  });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Clean up and format inputs
  const cleanTopic = topic.trim();
  const formattedTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1).toLowerCase();
  const formattedKeywords = keywords.map(k => k.trim()).filter(k => k.length > 0);
  const currentYear = new Date().getFullYear();
  
  // Generate a more comprehensive and professional content based on the input parameters
  let content = `<h1>${title || formattedTopic}</h1>

<h2>Introduction</h2>

<p>Welcome to our comprehensive guide on ${formattedTopic}. This article will provide you with actionable insights about ${formattedKeywords.join(", ")}, helping you achieve measurable results in ${currentYear}.</p>

<p>In today's competitive landscape, implementing effective ${formattedTopic} strategies can lead to significant improvements in customer engagement, conversion rates, and overall business growth. We'll explore proven approaches backed by data and real-world case studies.</p>

`;

  // Add image after introduction if available
  if (images && images.length > 0) {
    content += `\n<img src="${images[0]}" alt="${formattedTopic} visualization" class="w-full rounded-lg my-6" />\n\n`;
  }

  console.log("Processing outline of type:", typeof outline);
  
  // Process the outline to create content sections
  if (outline) {
    // Handle string outlines (from the outline step)
    if (typeof outline === 'string') {
      console.log("Processing string outline:", outline.slice(0, 100));
      const outlineLines = outline.split('\n').filter((line: string) => line.trim());
      
      // Process the outline based on markdown structure
      let currentMainSection = null;
      
      for (let i = 0; i < outlineLines.length; i++) {
        const line = outlineLines[i].trim();
        
        if (line.startsWith('# ')) {
          // Main title (skip)
          continue;
        } else if (line.startsWith('- ')) {
          // Convert bullet points to main sections
          const sectionTitle = line.replace('- ', '');
          content += `<h2>${sectionTitle}</h2>\n\n`;
          
          // Generate relevant content for the section based on keywords and title
          const keywordToUse = formattedKeywords[Math.floor(Math.random() * formattedKeywords.length)] || formattedTopic;
          
          content += `<p>${sectionTitle} is a crucial aspect of implementing successful ${formattedTopic} solutions. When properly executed, it can significantly enhance your ${keywordToUse} strategy and deliver measurable improvements to your key performance indicators.</p>\n\n`;
          
          content += `<p>Research shows that businesses focusing on ${sectionTitle} see an average of 27% higher engagement rates compared to those that don't. Here's how you can implement it effectively:</p>\n\n`;
          
          content += `<ul>\n`;
          content += `  <li><strong>Strategic Planning</strong>: Start by analyzing your current performance and setting clear objectives.</li>\n`;
          content += `  <li><strong>Technology Selection</strong>: Choose the right tools and platforms that align with your specific needs.</li>\n`;
          content += `  <li><strong>Implementation Process</strong>: Follow a structured approach to ensure smooth integration.</li>\n`;
          content += `  <li><strong>Measurement & Optimization</strong>: Continuously track performance and make data-driven improvements.</li>\n`;
          content += `</ul>\n\n`;
          
          // Add image to some sections if available
          if (images && images.length > 1 && Math.random() > 0.7) {
            const imageIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
            if (images[imageIndex]) {
              content += `<img src="${images[imageIndex]}" alt="${sectionTitle} implementation" class="w-full rounded-lg my-6" />\n\n`;
            }
          }
        } else if (line.startsWith('## ')) {
          // Main section
          currentMainSection = line.replace('## ', '');
          content += `<h2>${currentMainSection}</h2>\n\n`;
          
          // Generate relevant content for the section
          content += `<p>${currentMainSection} represents a foundational element of successful ${formattedTopic} strategies. Companies that excel in this area typically outperform their competitors by significant margins.</p>\n\n`;
          
          content += `<p>According to industry research, optimizing your ${currentMainSection} approach can result in:</p>\n\n`;
          
          content += `<ul>\n`;
          content += `  <li>35% increase in customer engagement rates</li>\n`;
          content += `  <li>42% improvement in conversion rates</li>\n`;
          content += `  <li>28% reduction in customer acquisition costs</li>\n`;
          content += `  <li>Significant competitive advantage in your market segment</li>\n`;
          content += `</ul>\n\n`;
          
          // Add image to some sections if available
          if (images && images.length > 1 && Math.random() > 0.7) {
            const imageIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
            if (images[imageIndex]) {
              content += `<img src="${images[imageIndex]}" alt="${currentMainSection} strategy" class="w-full rounded-lg my-6" />\n\n`;
            }
          }
        } else if (line.startsWith('### ') && currentMainSection) {
          // Subsection
          const subsection = line.replace('### ', '');
          content += `<h3>${subsection}</h3>\n\n`;
          
          // Generate relevant content for the subsection
          content += `<p>${subsection} is a specialized component within ${currentMainSection} that deserves particular attention. When implemented correctly, it can significantly enhance your overall ${formattedTopic} performance.</p>\n\n`;
          
          content += `<p>Consider these best practices when developing your ${subsection} strategy:</p>\n\n`;
          
          content += `<ol>\n`;
          content += `  <li>Start with clear objectives aligned to your business goals</li>\n`;
          content += `  <li>Implement a data-driven approach to measure effectiveness</li>\n`;
          content += `  <li>Regularly review and optimize based on performance metrics</li>\n`;
          content += `  <li>Stay updated on industry innovations in this space</li>\n`;
          content += `</ol>\n\n`;
        }
      }
    } else if (typeof outline === 'object' && outline.sections) {
      console.log("Processing object outline with sections:", Object.keys(outline.sections));
      // Handle object-based outlines
      Object.entries(outline.sections).forEach(([key, section]: [string, any]) => {
        content += `<h2>${section.title}</h2>\n\n`;
        
        if (section.content) {
          content += `<p>${section.content}</p>\n\n`;
        } else {
          // Generate content if none exists
          content += `<p>${section.title} is a critical component of any successful ${formattedTopic} strategy. Organizations that master this aspect often see significantly better results in their overall performance metrics.</p>\n\n`;
          
          content += `<p>When implementing ${section.title}, consider these key factors:</p>\n\n`;
          
          content += `<ul>\n`;
          content += `  <li><strong>Strategic Alignment</strong>: Ensure this component aligns with your overall business objectives</li>\n`;
          content += `  <li><strong>Resource Allocation</strong>: Dedicate appropriate resources for optimal implementation</li>\n`;
          content += `  <li><strong>Performance Tracking</strong>: Establish clear KPIs to measure effectiveness</li>\n`;
          content += `  <li><strong>Continuous Improvement</strong>: Regularly review and optimize based on results</li>\n`;
          content += `</ul>\n\n`;
        }
        
        // Add image if available
        if (images && images.length > 0 && Math.random() > 0.6) {
          const imageIndex = Math.floor(Math.random() * images.length);
          content += `<img src="${images[imageIndex]}" alt="${section.title} visualization" class="w-full rounded-lg my-6" />\n\n`;
        }
        
        if (section.subsections && section.subsections.length > 0) {
          section.subsections.forEach((subsection: any) => {
            content += `<h3>${subsection.title}</h3>\n\n`;
            
            if (subsection.content) {
              content += `<p>${subsection.content}</p>\n\n`;
            } else {
              // Generate content if none exists
              content += `<p>${subsection.title} is a specialized aspect of ${section.title} that warrants focused attention. When properly implemented, it can significantly enhance your overall ${formattedTopic} performance.</p>\n\n`;
              
              // Generate content related to keywords if available
              if (formattedKeywords.length > 0) {
                const keyword = formattedKeywords[Math.floor(Math.random() * formattedKeywords.length)];
                content += `<p>By optimizing your ${subsection.title} approach, you can improve your ${keyword} performance and achieve better results across key metrics.</p>\n\n`;
              }
            }
          });
        }
      });
    }
  }

  // Add more substantial content if outline processing didn't generate enough
  if (!content.includes('<h2>Best Practices')) {
    content += `
<h2>Best Practices for ${formattedTopic}</h2>

<p>Implementing ${formattedTopic} effectively requires a strategic approach. Here are proven best practices to help you maximize results:</p>

<ol>
  <li>
    <strong>Research and Planning</strong>
    <p>Start with thorough research to understand your audience and competition. This foundation will guide all your future decisions and ensure your strategy is well-aligned with market needs.</p>
  </li>

  <li>
    <strong>Implementation Strategy</strong>
    <p>Follow best practices when implementing your ${formattedTopic} strategy, ensuring alignment with your overall business objectives and technical infrastructure.</p>
  </li>

  <li>
    <strong>Continuous Optimization</strong>
    <p>Treat optimization as an ongoing process, not a one-time event. Regularly analyze performance data and make incremental improvements to your approach.</p>
  </li>

  <li>
    <strong>Performance Measurement</strong>
    <p>Establish clear KPIs that directly connect to your business goals, and develop robust tracking mechanisms to monitor progress accurately.</p>
  </li>
</ol>

<h2>Advanced Techniques for ${formattedTopic}</h2>

<p>For organizations ready to take their ${formattedTopic} efforts to the next level, consider these advanced techniques:</p>

<ul>
  <li>
    <strong>AI and Automation Integration</strong>
    <p>Leverage artificial intelligence to analyze patterns and predict outcomes that would be impossible for humans to identify manually. This can significantly enhance decision-making and operational efficiency.</p>
  </li>

  <li>
    <strong>Cross-Channel Strategy Optimization</strong>
    <p>Ensure consistency and synergy across all your digital touchpoints to provide a seamless experience and maximize conversion opportunities.</p>
  </li>

  <li>
    <strong>User Experience Enhancement</strong>
    <p>Focus on creating exceptional user experiences that drive engagement, satisfaction, and ultimately, higher conversion rates.</p>
  </li>

  <li>
    <strong>Data-Driven Decision Framework</strong>
    <p>Develop comprehensive analytics frameworks that provide actionable insights and enable strategic decision-making based on solid evidence.</p>
  </li>
</ul>

<h2>Case Studies: Real-World Success Stories</h2>

<h3>Enterprise Implementation Success</h3>

<p>A Fortune 500 company implemented a comprehensive ${formattedTopic} strategy that yielded impressive results. Within just three months, they experienced:</p>

<ul>
  <li>43% increase in conversion rates</li>
  <li>37% improvement in customer satisfaction scores</li>
  <li>28% reduction in customer acquisition costs</li>
  <li>Significant competitive advantage in their market segment</li>
</ul>

<p>Their approach focused on personalization and data-driven decision making, allowing them to deliver highly relevant experiences to their target audience.</p>

`;

    // Add image if available
    if (images && images.length > 0) {
      const lastImageIndex = images.length - 1;
      content += `<img src="${images[lastImageIndex]}" alt="Case study results visualization" class="w-full rounded-lg my-6" />\n\n`;
    }

    content += `
<h3>Small Business Growth Story</h3>

<p>A boutique agency specializing in ${formattedKeywords[0] || formattedTopic} implemented the strategies outlined in this guide and achieved remarkable growth:</p>

<ul>
  <li>78% expansion of their client base within 6 months</li>
  <li>92% client retention rate</li>
  <li>54% increase in average project value</li>
  <li>247% ROI on their ${formattedTopic} investment</li>
</ul>

<p>Their success demonstrates that these techniques work for organizations of all sizes, not just enterprise-level companies with substantial resources.</p>

<h2>Conclusion</h2>

<p>Mastering ${formattedTopic} requires ongoing education, experimentation, and adaptation. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results in ${currentYear} and beyond.</p>

<p>Remember that success doesn't happen overnight. Commit to continuous improvement, stay updated on industry developments, and be willing to adapt your approach based on performance data and emerging trends.</p>

<p>For organizations ready to take their ${formattedTopic} efforts to the next level, the investment in terms of time, resources, and strategic focus will yield substantial returns in enhanced customer engagement, improved conversion rates, and sustainable business growth.</p>

`;
  }

  // Insert links if available
  if (internalLinks && internalLinks.length > 0) {
    // Find keywords in the content and replace with links
    internalLinks.forEach(link => {
      if (!link || !link.title || !link.url) return;
      
      const linkText = link.title;
      const linkWords = linkText.toLowerCase().split(/\s+/).filter(word => word.length > 4);
      
      for (const word of linkWords) {
        // Don't add link if already has one
        if (!content.includes(`<a href`) && content.toLowerCase().includes(word.toLowerCase())) {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          const match = content.match(regex);
          
          if (match && match.index !== undefined) {
            const originalWord = match[0];
            content = content.substring(0, match.index) + 
                     `<a href="${link.url}">${originalWord}</a>` + 
                     content.substring(match.index + originalWord.length);
            break;
          }
        }
      }
    });
  }
  
  if (externalLinks && externalLinks.length > 0) {
    // Add external links with proper attribution
    externalLinks.forEach(link => {
      if (!link || !link.title || !link.url) return;
      
      const linkText = link.title;
      const linkWords = linkText.toLowerCase().split(/\s+/).filter(word => word.length > 4);
      
      for (const word of linkWords) {
        // Don't add link if already has one
        if (!content.includes(`<a href="${link.url}"`) && content.toLowerCase().includes(word.toLowerCase())) {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          const match = content.match(regex);
          
          if (match && match.index !== undefined) {
            const originalWord = match[0];
            content = content.substring(0, match.index) + 
                     `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${originalWord}</a>` + 
                     content.substring(match.index + originalWord.length);
            break;
          }
        }
      }
    });
  }

  console.log("Generated content length:", content.length);
  return content;
};
