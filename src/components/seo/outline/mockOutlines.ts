
export const generateMockOutlines = (title: string) => {
  const outlines = [
    // First outline format
    `# ${title}\n\n- Introduction to the Topic\n- Historical Context\n- Key Terms Explained\n- Current Trends and Issues\n- Major Players Involved\n- Impacts on Society\n- Challenges and Controversies\n- Future Outlook\n- Conclusion\n- Call to Action`,
    
    // Second outline format
    `# ${title}\n\n- Defining the Core Concept\n- Cultural Significance\n- Economic Implications\n- Social Dynamics\n- Policy Framework\n- Critical Perspectives\n- Emerging Research\n- Global Perspectives\n- Practical Applications\n- Summary of Findings`,
    
    // Third outline format
    `# ${title}\n\n- Overview of the Importance\n- Case Studies\n- Expert Opinions\n- Comparative Analysis\n- Statistical Insights\n- Public Perception\n- Legal Considerations\n- Technological Influences\n- Recommendations\n- Final Thoughts`
  ];
  
  return outlines;
};
