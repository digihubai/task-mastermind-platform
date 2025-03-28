
export const generateMockOutlines = (title: string, topic: string = "", keywords: string[] = []) => {
  // Format keywords for better readability in the outline
  const keywordList = keywords.length > 0 
    ? keywords.map(k => `- ${k.charAt(0).toUpperCase() + k.slice(1)}`).join('\n') 
    : '- No keywords selected';
  
  // Extract the main subject from the title or use the topic
  const mainSubject = topic || title.split(' ').slice(0, 3).join(' ');
  const firstKeyword = keywords[0] || mainSubject;
  const secondKeyword = keywords.length > 1 ? keywords[1] : mainSubject;
  
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  
  const outlines = [
    // First outline format - Problem/Solution with relevant keywords
    `# ${title}\n\n- Introduction to ${mainSubject} and Its Importance\n- Common Challenges with Implementing ${firstKeyword}\n- Key Benefits of Using ${firstKeyword} for Business Growth\n- How ${secondKeyword} Enhances Customer Experience\n- Step-by-Step Implementation Process\n- Case Study: Companies Achieving 35%+ Conversion Rate Increase\n- Measuring ROI and Performance Metrics\n- Best Practices for Optimizing ${mainSubject}\n- Common Pitfalls to Avoid When Deploying ${firstKeyword}\n- Future Trends in ${mainSubject} for ${nextYear}\n- Conclusion: Taking Your ${mainSubject} Strategy to the Next Level`,
    
    // Second outline format - Guide/How-To with specific implementations
    `# ${title}\n\n- Understanding ${mainSubject} in ${currentYear}\n- The Evolution of ${firstKeyword} Technology\n- Essential Components of an Effective ${secondKeyword} System\n- Step-by-Step Implementation Guide with Code Examples\n- Integration Strategies with CRM and Marketing Platforms\n- Advanced ${firstKeyword} Features That Drive Conversions\n- Data Privacy and Compliance Considerations\n- Measuring Success: KPIs for ${mainSubject} Performance\n- User Experience Design for Optimal ${firstKeyword} Engagement\n- Case Studies: How Industry Leaders Use ${secondKeyword}\n- Future-Proofing Your ${mainSubject} Investment`,
    
    // Third outline format - Research/Analysis with data focus
    `# ${title}\n\n- The Current State of ${mainSubject} Technology\n- Research Methodology: Analyzing ${firstKeyword} Performance\n- Key Findings: What Makes ${secondKeyword} Convert at 35%+\n- User Behavior Analysis When Interacting with ${firstKeyword}\n- Competitive Analysis of Top ${mainSubject} Solutions\n- Technical Architecture of High-Performing ${secondKeyword} Systems\n- ROI Analysis: Cost vs. Revenue Impact\n- Implementation Timeline and Resource Requirements\n- Data Security and Compliance Framework\n- Strategic Recommendations Based on Industry Benchmarks\n- Conclusion: Implementing These Findings in Your Business`
  ];
  
  return outlines;
};
