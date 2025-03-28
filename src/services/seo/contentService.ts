
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
  
  return `<h1>${formattedTopic}</h1>

<h2>Introduction</h2>

<p>This comprehensive guide covers everything you need to know about ${formattedTopic}${keywordText}. We'll explore the latest trends, best practices, and expert strategies to help you succeed in ${currentYear} and beyond.</p>

<p>In today's competitive digital landscape, understanding and implementing effective ${formattedTopic} strategies can be the difference between thriving and merely surviving. Our research-backed approach will give you actionable insights that you can implement immediately.</p>

<h2>Why ${formattedTopic} Matters in ${currentYear}</h2>

<p>In today's digital landscape, ${formattedTopic} has become increasingly important for businesses of all sizes. Understanding how to leverage ${formattedTopic} effectively can lead to improved results and competitive advantage.</p>

<p>Recent industry data shows that organizations focusing on ${formattedTopic} experience:</p>

<ul>
  <li>47% higher customer engagement rates</li>
  <li>36% increase in conversion rates</li>
  <li>28% reduction in customer acquisition costs</li>
  <li>Significant improvements in market positioning</li>
</ul>

<h2>Key Strategies for ${formattedTopic}</h2>

<ol>
  <li>
    <p><strong>Research and Planning</strong>: Start with thorough research to understand your audience and competition. This foundation will guide all your future decisions and ensure your strategy is aligned with market needs.</p>
  </li>
  <li>
    <p><strong>Implementation</strong>: Follow best practices when implementing your ${formattedTopic} strategy. This includes setting realistic timelines, allocating appropriate resources, and establishing clear metrics for success.</p>
  </li>
  <li>
    <p><strong>Optimization</strong>: Continuously test and refine your approach based on performance data. The most successful organizations view ${formattedTopic} as an ongoing process rather than a one-time initiative.</p>
  </li>
  <li>
    <p><strong>Measurement</strong>: Track key metrics to evaluate the success of your ${formattedTopic} initiatives. Establish clear KPIs that directly connect to your business objectives.</p>
  </li>
</ol>

<h2>Advanced Techniques for ${formattedTopic}</h2>

<p>For those looking to take their ${formattedTopic} efforts to the next level, consider these advanced techniques:</p>

<ul>
  <li>
    <p><strong>Leverage AI and automation tools</strong>: Artificial intelligence can analyze patterns and predict outcomes that would be impossible for humans to identify manually.</p>
  </li>
  <li>
    <p><strong>Implement cross-channel strategies</strong>: Ensure consistency while optimizing for the unique attributes of each platform.</p>
  </li>
  <li>
    <p><strong>Focus on user experience optimization</strong>: Create seamless, intuitive interactions that remove friction from the customer journey.</p>
  </li>
  <li>
    <p><strong>Develop comprehensive analytics frameworks</strong>: Move beyond basic metrics to understand the true impact of your ${formattedTopic} initiatives.</p>
  </li>
</ul>

<h2>Case Studies: ${formattedTopic} Success Stories</h2>

<h3>Company A: 200% Growth in 6 Months</h3>

<p>Company A implemented a comprehensive ${formattedTopic} strategy that resulted in a 200% increase in conversion rates within just 6 months. Their approach focused on user experience optimization and data-driven decision making.</p>

<p>Key elements of their strategy included:</p>

<ul>
  <li>Comprehensive audience research and segmentation</li>
  <li>Content personalization based on user behavior</li>
  <li>Continuous testing and optimization</li>
  <li>Integration with existing marketing systems</li>
</ul>

<h3>Company B: Market Leader in ${currentYear}</h3>

<p>By prioritizing ${formattedTopic}, Company B established themselves as a market leader in their industry. Their innovative approach to ${formattedKeywords[0] || formattedTopic} set them apart from competitors.</p>

<p>Their case study demonstrates that consistency and commitment to quality are essential for long-term success with ${formattedTopic}.</p>

<h2>Conclusion</h2>

<p>Mastering ${formattedTopic} requires ongoing education, experimentation, and adaptation. By following the strategies outlined in this guide, you'll be well-positioned to achieve your goals and drive meaningful results.</p>

<p>Remember that the most successful organizations view ${formattedTopic} as a journey rather than a destination. Continue to refine your approach based on performance data and emerging trends in the industry.</p>
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
          content += `  <li><strong>Start with clear objectives</strong> aligned to your business goals</li>\n`;
          content += `  <li><strong>Implement a data-driven approach</strong> to measure effectiveness</li>\n`;
          content += `  <li><strong>Regularly review and optimize</strong> based on performance metrics</li>\n`;
          content += `  <li><strong>Stay updated on industry innovations</strong> in this space</li>\n`;
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

  // Add conclusion section if not present
  if (!content.includes('<h2>Conclusion') && !content.includes('<h2>Summary')) {
    content += `
<h2>Conclusion: Taking Your ${formattedTopic} Strategy to the Next Level</h2>

<p>${formattedTopic} continues to evolve, but the fundamentals remain constant: create value for users, optimize for measurable results, and continuously improve your approach. By implementing the strategies outlined in this guide, you'll be well-positioned to achieve significant improvements in your key performance metrics.</p>

<p>Remember that success with ${formattedTopic} requires a commitment to ongoing optimization. The most effective organizations view this as a journey rather than a destination, constantly refining their approach based on performance data and emerging trends.</p>

<p>We recommend starting with a comprehensive audit of your current ${formattedTopic} efforts, identifying key areas for improvement, and developing a structured implementation plan with clear timelines and accountability. This systematic approach will help you maximize the impact of your ${formattedTopic} initiatives and achieve sustainable results.</p>
`;
  }

  // Insert links if available
  if (internalLinks && internalLinks.length > 0) {
    // Find keywords in the content and replace with links
    internalLinks.forEach((link: any) => {
      const linkText = link.title;
      const linkWords = linkText.toLowerCase().split(/\s+/).filter((word: string) => word.length > 4);
      
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
    externalLinks.forEach((link: any) => {
      const linkText = link.title;
      const linkWords = linkText.toLowerCase().split(/\s+/).filter((word: string) => word.length > 4);
      
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
