
export const generateMockOutlines = (title: string, topic: string = "", keywords: string[] = []) => {
  // Format keywords for better readability in the outline
  const keywordList = keywords.length > 0 
    ? keywords.map(k => `- ${k.charAt(0).toUpperCase() + k.slice(1)}`).join('\n') 
    : '- No keywords selected';
  
  // Extract the main subject from the title or use the topic
  const mainSubject = topic || title.split(' ').slice(0, 3).join(' ');
  
  const outlines = [
    // First outline format - Problem/Solution
    `# ${title}\n\n- Introduction to ${mainSubject}\n- The Problem with Traditional ${mainSubject}\n- Key Benefits of ${keywords[0] || mainSubject}\n- How ${keywords.length > 1 ? keywords[1] : mainSubject} Works\n- Implementation Strategies\n- Case Studies and Success Stories\n- ROI and Performance Metrics\n- Best Practices for ${mainSubject}\n- Common Pitfalls to Avoid\n- Conclusion and Next Steps`,
    
    // Second outline format - Guide/How-To
    `# ${title}\n\n- Understanding ${mainSubject} in ${new Date().getFullYear()}\n- Essential Components of ${keywords[0] || mainSubject}\n- Step-by-Step Implementation Guide\n- Measuring Success and Key Metrics\n- Integration with Existing Systems\n- ${keywords.length > 1 ? keywords[1] : mainSubject} Best Practices\n- Future Trends in ${mainSubject}\n- Expert Insights and Recommendations\n- Tools and Resources\n- Conclusion`,
    
    // Third outline format - Research/Analysis
    `# ${title}\n\n- Current State of ${mainSubject}\n- Research Methodology\n- Key Findings on ${keywords[0] || mainSubject}\n- Comparative Analysis\n- Industry Benchmarks\n- User Experience Considerations\n- ${keywords.length > 1 ? keywords[1] : mainSubject} Impact Analysis\n- Strategic Recommendations\n- Implementation Timeline\n- Conclusion and Action Items`
  ];
  
  return outlines;
};
